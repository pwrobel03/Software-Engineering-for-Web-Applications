import "dotenv/config";
import { createServer } from "./server.js";
import repository from "./data/repository/index.js";

const server = createServer();
const port = process.env.PORT || 3000;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startServer = async () => {
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            console.log(
                `Próba połączenia z bazą danych (${retries + 1}/${maxRetries})...`
            );

            // Najpierw sprawdzamy połączenie (authenticate), potem migrujemy (sync)
            await repository.sequelizeClient.authenticate();
            console.log("Połączenie z bazą nawiązane!");

            await repository.sequelizeClient.sync();
            console.log("Successfully migrated tables");

            // Skoro baza działa, uruchamiamy serwer
            server.listen(port, () => {
                console.log(`API is running on ${port}`);
            });

            return; // Sukces - kończymy funkcję startServer
        } catch (error) {
            retries++;
            if (retries === maxRetries) {
                console.error(
                    "CRITICAL: Nie udało się połączyć z bazą po wielu próbach. Zamykam aplikację."
                );
                process.exit(1);
            }

            // W JS error jest obiektem, nie musimy rzutować (error as Error)
            console.error("Błąd połączenia:", error.message || error);
            console.log("Czekam 5 sekund na bazę danych...");
            await wait(5000);
        }
    }
};

// Uruchomienie całej procedury
startServer();

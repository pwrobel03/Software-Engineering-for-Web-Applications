import axios from "axios";
// Adres serwisu książek (dla Dockera/localhost)
const BOOK_SERVICE_URL = "http://localhost:3001/api/books";

export const checkBookAvailability = async (bookId) => {
    try {
        await axios.get(`${BOOK_SERVICE_URL}/${bookId}`);
        return true;
    } catch (error) {
        // Jeśli dostaliśmy 404, to znaczy, że książki nie ma
        if (error.response && error.response.status === 404) {
            return false;
        }

        // Jeśli serwis leży (ECONNREFUSED) lub jest inny błąd serwera (500)
        console.error("Błąd komunikacji z serwisem książek:", error.message);
        // W takiej sytuacji bezpieczniej jest rzucić błąd niż pozwolić na zamówienie
        throw new Error("Book service is unavailable");
    }
};

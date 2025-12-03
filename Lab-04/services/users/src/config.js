import "dotenv/config";

// --- DEBUG START ---
console.log("==========================================");
console.log("DEBUG CONFIG.JS:"); // Zmieniłem nazwę w logu
console.log("ENV HOST:", process.env.DB_HOST);
console.log("ENV PORT:", process.env.DB_PORT);
console.log("ENV USER:", process.env.DB_USERNAME);
console.log(
    "CZY PLIK .ENV ZOSTAŁ WCZYTANY?:",
    process.env.DB_PORT ? "TAK" : "NIE"
);
console.log("==========================================");
// --- DEBUG END ---

const config = {
    db: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
};

export default config;

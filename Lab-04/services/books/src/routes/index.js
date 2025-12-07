import { authenticateToken } from "../middleware/auth.js";
import repository from "../repository/index.js"; // Pamiętaj o imporcie z index.js!

export const createBookRoutes = (app) => {
    // 1. Zwraca listę wszystkich książek
    app.get("/api/books", async (req, res) => {
        try {
            const books = await repository.getBooks();
            res.json(books);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // 2. Zwraca konkretną książkę
    app.get("/api/books/:bookId", async (req, res) => {
        try {
            const id = parseInt(req.params.bookId);
            const book = await repository.getBook(id);

            if (!book) {
                return res.status(404).json({ error: "Book not found" });
            }

            res.json(book);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // 3. Dodaje nową książkę
    app.post("/api/books", authenticateToken, async (req, res) => {
        try {
            const { title, author, year } = req.body;

            // Prosta walidacja
            if (!title || !author || !year) {
                return res.status(400).json({
                    error: "Missing required fields: title, author, year",
                });
            }

            const newBook = await repository.createBook({
                title,
                author,
                year,
            });
            res.status(201).json(newBook); // 201 Created
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // 4. Usuwa książkę
    app.delete("/api/books/:bookId", authenticateToken, async (req, res) => {
        try {
            const id = parseInt(req.params.bookId);
            const result = await repository.deleteBook(id);

            if (!result) {
                return res.status(404).json({ error: "Book not found" });
            }

            res.status(204).send(); // 204 No Content (sukces, brak treści)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
};

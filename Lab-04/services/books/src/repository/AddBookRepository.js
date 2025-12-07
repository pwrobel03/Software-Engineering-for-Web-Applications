import Book from "../models/Book.js";

export function AddBookRepository(Base) {
    return class extends Base {
        // Pobierz wszystkie książki
        async getBooks() {
            return Book.findAll();
        }

        // Pobierz jedną książkę
        async getBook(id) {
            return Book.findByPk(id);
        }

        // Dodaj książkę
        async createBook(bookData) {
            return Book.create(bookData);
        }

        // Usuń książkę
        async deleteBook(id) {
            return Book.destroy({
                where: { id },
            });
        }
    };
}

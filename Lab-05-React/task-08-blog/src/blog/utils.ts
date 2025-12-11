import type { NavigateFunction } from "react-router-dom";
import type { Article } from "./blog";

const STORAGE_KEY = "blogArticles";

// Dane startowe (TYLKO stała)
const initialArticles: Article[] = [
    {
        id: 1,
        tytul: "Wprowadzenie do Reacta",
        tresc: "React to biblioteka JS do budowania interfejsów.",
    },
    {
        id: 2,
        tytul: "Co to jest TypeScript?",
        tresc: "TS dodaje statyczne typowanie do JavaScriptu.",
    },
];

// 1. Funkcja inicjalizująca LocalStorage (wywołana tylko raz)
export const initializeArticles = (): void => {
    const articlesJson = localStorage.getItem(STORAGE_KEY);
    if (!articlesJson) {
        // Zapisujemy TYLKO, jeśli jest puste.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialArticles));
    }
};

// 2. Funkcja do CZYTANIA (czysta, bez side-effectów)
export const getArticles = (): Article[] => {
    initializeArticles(); // Upewniamy się, że dane są zainicjowane
    const articlesJson = localStorage.getItem(STORAGE_KEY);

    // Ponieważ wywołaliśmy initializeArticles(), articlesJson nie powinien być null,
    // ale dla bezpieczeństwa:
    if (!articlesJson) {
        return initialArticles;
    }

    try {
        return JSON.parse(articlesJson) as Article[];
    } catch (error) {
        console.error("Błąd podczas parsowania JSON z LocalStorage:", error);
        return initialArticles;
    }
};

// Funkcja pomocnicza do zapisywania nowego artykułu
export const saveArticle = (
    tytul: string,
    tresc: string,
    navigate: NavigateFunction
): void => {
    const articles = getArticles();
    // Generowanie unikalnego ID (max ID + 1)
    const newId =
        articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1;

    const newArticle: Article = {
        id: newId,
        tytul,
        tresc,
    };
    const updatedArticles = [...articles, newArticle];

    // Zapis do LocalStorage (konwersja obiektu na ciąg JSON)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
    navigate("/blog");
};

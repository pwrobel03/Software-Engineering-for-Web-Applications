import type { NavigateFunction } from "react-router-dom";

export interface Article {
    id: number;
    tytul: string;
    tresc: string;
}

const STORAGE_KEY = "blogArticles";

// Funkcja pomocnicza do odczytywania artykułów z LocalStorage
export const getArticles = (): Article[] => {
    const articlesJson = localStorage.getItem(STORAGE_KEY);
    if (!articlesJson) {
        // Zwracamy przykładowe dane, jeśli LocalStorage jest pusty
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialArticles));
        return initialArticles;
    }
    try {
        return JSON.parse(articlesJson) as Article[];
    } catch (error) {
        console.error("Błąd podczas parsowania JSON z LocalStorage:", error);
        return [];
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

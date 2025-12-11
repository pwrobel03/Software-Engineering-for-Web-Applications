# ⚛️ Zadania React/TypeScript (Kompleksowy Zbiór Ćwiczeń)

Ten projekt zawiera zbiór zadań realizacyjnych z technologii React i TypeScript, podzielonych na dwie niezależne aplikacje:

1. **`react-zadania`**: Ćwiczenia 1-7, skupiające się na podstawach Reacta, hookach i formularzach.
2. **`react-zadanie-8`**: Ćwiczenie 8, skupiające się na perzystencji stanu (`localStorage`) i routingu (`React Router`).

## 🛠️ Technologie i Wymagania

-   **Runtime:** Node.js (zalecana wersja LTS)
-   **Framework:** React v18+
-   **Narzędzie budowania:** Vite
-   **Język:** TypeScript
-   **Biblioteki:** `react-router-dom` (tylko w Zadaniu 8)

## 🚀 Uruchomienie Projektu

Projekt składa się z dwóch niezależnych aplikacji. Każda z nich musi zostać uruchomiona w osobnym terminalu.

### 1. Aplikacja I: Zadania 1-7 (Podstawy i Hooki)

**Lokalizacja:** `vite-project/`

```bash
# Przejdź do katalogu projektu vite-project zawierającego realizację zadań 1-7
cd vite-project

# Zainstaluj zależności
npm install

# Uruchom aplikację w trybie deweloperskim
npm run dev
```

Aplikacja będzie dostępna pod adresem, np. http://localhost:5173/.

### 2. Aplikacja II: Zadanie 8 (LocalStorage i Routing)

**Lokalizacja:** `task-08-blog/`

```bash
# Przejdź do katalogu projektu task-08-blog
cd task-08-oblog

# Zainstaluj zależności
npm install

# Uruchom aplikację w trybie deweloperskim
npm run dev
```

Aplikacja będzie dostępna pod adresem, np. http://localhost:5174/. (Jeżeli uruchomisz obie aplikację jednocześnie)

## 🧩 Opis Zadań i Implementacji

### Część I: Zadania 1-7 (Folder: vite-project)

Wszystkie komponenty testowane są w pliku src/App.tsx.

| Zadanie | Temat      | Kluczowe Koncepty                                                                                                                    | Lokalizacja Komponentów     |
| :-----: | :--------- | :----------------------------------------------------------------------------------------------------------------------------------- | :-------------------------- |
| **1.**  | Koszyk     | Mapowanie tablic, Propsy, Komponenty funkcyjne.                                                                                      | `src/components/koszyk`     |
| **2.**  | Liczniki   | `useState`, Funkcje jako propsy.                                                                                                     | `src/components/liczniki`   |
| **3.**  | Formularze | Kontrolowane komponenty, Walidacja na żywo, Logika przycisku `disabled`.                                                             | `src/components/formularze` |
| **4.**  | Inne       | Operator trójargumentowy (`? :`), Aktualizacja stanu obiektów za pomocą Spread Operatora (`...prev`).                                | `src/components/inne`       |
| **5.**  | Studenci   | Interfejsy TypeScript, Renderowanie tabeli, Zarządzanie stanem listy, Walidacja formularza.                                          | `src/components/studenci`   |
| **6.**  | Efekty     | `useEffect` (cykl życia: `[]`, obserwowanie stanu: `[dep]`), `setInterval`, `document.title`, Funkcja czyszcząca (cleanup function). | `src/components/efekty`     |
| **7.**  | Fetching   | Asynchroniczne pobieranie danych (`fetch`), Wyświetlanie list z API, Typowanie odpowiedzi (TypeScript Interfaces).                   | `src/components/produkty`   |

### Część II: Zadanie 8 (Folder: task-08-blog)

#### 8.1. Licznik z LocalStorage

Komponent LicznikLocalStorage wykorzystuje funkcję inicjalizującą useState oraz hook useEffect do zapewnienia perzystencji stanu licznika pomiędzy sesjami przeglądarki.

#### 8.2. Aplikacja Blog z Routingiem

Implementacja pełnej aplikacji blogowej z użyciem React Router v6+ do obsługi routingu oraz LocalStorage do trwałości danych artykułów.

Struktura danych: Artykuły (ID, Tytuł, Treść) są serializowane do JSON i zapisywane w localStorage.

| Ścieżka        | Opis                                 | Koncept                                           |
| :------------- | :----------------------------------- | :------------------------------------------------ |
| `/`            | Strona powitalna.                    | `Link` do `/blog`                                 |
| `/blog`        | Lista artykułów.                     | Mapowanie listy, `Link` do detali                 |
| `/article/:id` | Widok pełnego artykułu.              | `useParams` do pobrania `id`                      |
| `/dodaj`       | Formularz dodawania nowego artykułu. | Kontrolowane komponenty, `useNavigate` po zapisie |

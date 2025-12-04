# Bookstore Microservices System

Projekt zaliczeniowy realizujący architekturę mikroserwisów w Node.js (Express + Sequelize + MySQL).
System składa się z trzech niezależnych serwisów komunikujących się przez REST API.

### Struktura

-   **services/books** (Port 3001) - Zarządzanie książkami.
-   **services/orders** (Port 3002) - Zarządzanie zamówieniami (integruje się z Books).
-   **services/users** (Port 3003) - Autentykacja i użytkownicy (JWT).

### Wymagania

-   Node.js (v18+)
-   Docker & Docker Compose

### Kluczowe założenia projektowe:

1.  **Komunikacja Synchroniczna (HTTP):**
    Serwis Zamówień (`orders`) nie posiada bezpośredniego dostępu do tabeli książek. Aby zweryfikować dostępność towaru, wykonuje zapytanie HTTP (przy użyciu biblioteki `axios`) do Serwisu Książek (`books`). Jeśli Serwis Książek zwróci błąd 404 lub nie odpowie, zamówienie nie zostanie przetworzone.

2.  **Bezpieczeństwo (Stateless Auth):**
    -   Serwis Użytkowników (`users`) pełni rolę dostawcy tożsamości. Weryfikuje hasła (hashowane przez `bcrypt`) i wydaje tokeny JWT (podpisane algorytmem HS256).
    -   Serwisy `books` i `orders` posiadają własne Middleware autoryzacyjne, które weryfikują poprawność tokena przy każdym żądaniu modyfikującym dane. Serwisy współdzielą ten sam sekret (`JWT_SECRET`), co pozwala na weryfikację tokenów bez konieczności odpytywania serwisu użytkowników za każdym razem.

### Szczegółowy opis serwisów:

#### 1. Serwis Książek (Books Service)

Odpowiada za katalog produktów.

-   **Publiczne endpointy:** Pobieranie listy książek i szczegółów książki.
-   **Chronione endpointy:** Dodawanie i usuwanie książek (wymaga JWT).
-   **Model danych:** Przechowuje tytuł, autora i rok wydania.

#### 2. Serwis Zamówień (Orders Service)

Najbardziej złożony serwis, integrujący system.

-   Przed utworzeniem zamówienia sprawdza dostępność książki w `Books Service`.
-   Wymaga autoryzacji dla wszystkich operacji.
-   **Model danych:** Przechowuje ID użytkownika, ID książki oraz ilość. Nie posiada relacji kluczy obcych (Foreign Key) do innych tabel, co zapewnia niezależność danych.

#### 3. Serwis Użytkowników (Users Service)

Odpowiada za zarządzanie tożsamością.

-   Obsługuje rejestrację (z walidacją unikalności emaila).
-   Obsługuje logowanie (zwraca token Bearer).

## Instrukcja uruchomienia

#### Krok 1: Baza danych

Uruchom kontener z bazą danych MySQL (wspólna dla wszystkich serwisów):

```bash
bash
docker-compose up -d
```

#### Krok 2: Instalacja zależnosci

Dla każdego serwisu należy zainstalować zależności, w tym celu:

```bash
cd services/books && npm install # uruchomienie serwisu books
cd ../orders && npm install # uruchomienie serwisu orders
cd ../users && npm install # uruchomienie serwisu users
```

#### Krok 3: Uruchomienie serwisów

Do prawdiłowej pracy wymagane jest jednoczesne działanie wszystkich 3 serwisów, w tym celu w 3 osobnych oknach terminala uruchamiamy wybrane serwisy

```bash
cd services/books
npm run dev
```

```bash
cd services/orders
npm run dev
```

```bash
cd services/users
npm run dev
```

## Testowanie API

### W głównym katalogu znajduje się plik api-integral-test.http. Można go użyć z rozszerzeniem "REST Client" w VS Code do testowania endpointów.

1. Wykonaj request "Rejestracja" i "Logowanie" w sekcji Users.
2. Skopiuj otrzymany token JWT.
3. Podmień zmienną @token na górze pliku api-integral-test.http.
4. Testuj pozostałe endpointy.

### Scenariusze testowe w pliku .http:

** Plik testowy został przygotowany tak, aby sprawdzić pełną ścieżkę krytyczną (Happy Path) oraz obsługę błędów:**

Cykl Życia Użytkownika:

-   Rejestracja nowego konta.
-   Logowanie i uzyskanie tokena (niezbędnego do dalszych kroków).
-   Zarządzanie Katalogiem (Serwis Books):
-   Dodanie nowej książki (sprawdzenie czy middleware przepuszcza z tokenem).
-   Pobranie listy książek (sprawdzenie czy endpoint publiczny działa).

Proces Zakupowy (Integracja):

-   Złożenie zamówienia na istniejącą książkę (powinno zwrócić 201 Created).
-   Próba zamówienia książki, która nie istnieje (powinno zwrócić 404 z komunikatem o braku książki w zewnętrznym serwisie).
-   Pobranie historii zamówień dla konkretnego użytkownika.

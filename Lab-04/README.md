# Instrukcja wykonania (Commit 12 - Finalny)

## Krok 1: Stwórz plik `README.md`

Utwórz ten plik w **głównym katalogu projektu** (obok folderu `services` i pliku `docker-compose.yaml`). Wklej tam poniższą zawartość:

````markdown
# Bookstore Microservices System

Projekt zaliczeniowy realizujący architekturę mikroserwisów w Node.js (Express + Sequelize + MySQL).
System składa się z trzech niezależnych serwisów komunikujących się przez REST API.

## Struktura

-   **services/books** (Port 3001) - Zarządzanie książkami.
-   **services/orders** (Port 3002) - Zarządzanie zamówieniami (integruje się z Books).
-   **services/users** (Port 3003) - Autentykacja i użytkownicy (JWT).

## Wymagania

-   Node.js (v18+)
-   Docker & Docker Compose

## Instrukcja uruchomienia

### 1. Baza danych

Uruchom kontener z bazą danych MySQL (wspólna dla wszystkich serwisów):

```bash
bash
docker-compose up -d
```
````

### 2. Instalacja zaleznosci

Dla kazdego serwisu nalezy zainstalować zaleznosci, w tym celu:

```bash
cd services/books && npm install
cd ../orders && npm install
cd ../users && npm install
```

```bash
cd services/orders && npm install
cd ../orders && npm install
cd ../users && npm install
```

```bash
cd services/users && npm install
cd ../orders && npm install
cd ../users && npm install
```

### 3. Uruchomienie serwisow

Do prawdiłowej pracy wymagane jest jednoczesne dzialanie wszytskich 3 serwisow, w tym celu w 3 osobnych oknach terminala uruchamiamy wybrane serwisy

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

### Testowanie API

W głównym katalogu znajduje się plik api.http. Można go użyć z rozszerzeniem "REST Client" w VS Code do testowania endpointów.

1. Wykonaj request "Rejestracja" i "Logowanie" w sekcji Users.
2. Skopiuj otrzymany token JWT.
3. Podmień zmienną @token na górze pliku api.http.
4. Testuj pozostałe endpointy.

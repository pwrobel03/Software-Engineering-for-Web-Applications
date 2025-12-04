# Bookstore Microservices System

Final project implementing a microservices architecture in Node.js (Express + Sequelize + MySQL).
The system consists of three independent services communicating via REST API.

## Structure

-   **services/books** (Port 3001) - Book management.
-   **services/orders** (Port 3002) - Order management (integrates with Books).
-   **services/users** (Port 3003) - Authentication and users (JWT).

## Requirements

-   Node.js (v18+)
-   Docker & Docker Compose

### Key Design Assumptions:

1.  **Synchronous Communication (HTTP):**
    The Order Service (`orders`) does not have direct access to the books table. To verify item availability, it executes an HTTP request (using the `axios` library) to the Book Service (`books`). If the Book Service returns a 404 error or does not respond, the order will not be processed.

2.  **Security (Stateless Auth):**
    -   The User Service (`users`) acts as the identity provider. It verifies passwords (hashed by `bcrypt`) and issues JWT tokens (signed with the HS256 algorithm).
    -   The `books` and `orders` services have their own authorization Middleware that verifies token validity for every request modifying data. The services share the same secret (`JWT_SECRET`), allowing token verification without querying the user service every time.

### Detailed Service Description:

#### 1. Book Service

Responsible for the product catalog.

-   **Public endpoints:** Retrieving the list of books and book details.
-   **Protected endpoints:** Adding and removing books (requires JWT).
-   **Data model:** Stores title, author, and publication year.

#### 2. Order Service

The most complex service, integrating the system.

-   Checks book availability in `Books Service` before creating an order.
-   Requires authorization for all operations.
-   **Data model:** Stores user ID, book ID, and quantity. Does not have Foreign Key relations to other tables, ensuring data independence.

#### 3. User Service

Responsible for identity management.

-   Handles registration (with email uniqueness validation).
-   Handles login (returns Bearer token).

## Setup Instructions

#### Step 1: Database

Start the MySQL database container (shared for all services):

```bash
bash
docker-compose up -d
```

#### Step 2: Dependency Installation

Dependencies must be installed for each service. To do this:

```bash
cd services/books && npm install # starting books service
cd ../orders && npm install # starting orders service
cd ../users && npm install # starting users service
```

#### Step 3: Starting Services

For proper operation, all 3 services are required to run simultaneously. To do this, start the selected services in 3 separate terminal windows.

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

## API Testing

### The api-integral-test.http file is located in the main directory. It can be used with the "REST Client" extension in VS Code to test endpoints.

1. Execute "Registration" and "Login" requests in the Users section.
2. Copy the received JWT token.
3. Replace the @token variable at the top of the api-integral-test.http file.
4. Test the remaining endpoints.

### Test scenarios in the .http file:

**The test file has been prepared to verify the full critical path (Happy Path) and error handling:**

User Life Cycle:

-   New account registration.
-   Login and token acquisition (necessary for further steps).
-   Catalog Management (Books Service):
-   Adding a new book (checking if middleware allows access with token).
-   Retrieving book list (checking if public endpoint works).

Purchasing Process (Integration):

-   Placing an order for an existing book (should return 201 Created).
-   Attempting to order a book that does not exist (should return 404 with a message about missing book in the external service).
-   Retrieving order history for a specific user.

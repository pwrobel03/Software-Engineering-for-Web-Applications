import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import repository from "../data/repository/index.js";
export const createUserRoutes = (app) => {
    app.post("/api/register", async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ error: "Email and password are required" });
            }

            const user = await repository.createUser({ email, password });

            // Zwracamy ID nowo utworzonego użytkownika
            res.status(201).json({ id: user.id });
        } catch (error) {
            console.error(error);
            // Obsługa błędu unikalności emaila (Sequelize UniqueConstraintError)
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(409).json({ error: "Email already exists" });
            }
            res.status(500).json({ error: "Registration failed" });
        }
    });

    app.post("/api/login", async (req, res) => {
        try {
            const { email, password } = req.body;

            // Szukamy użytkownika po emailu
            const user = await repository.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // Sprawdzamy hasło (porównujemy tekst jawny z hashem z bazy)
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // Generujemy token JWT
            // W tokenie zaszywamy ID użytkownika i email (payload)
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" } // Token ważny przez godzinę
            );

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Login failed" });
        }
    });

    app.get("/users", async (req, res) => {
        const users = await repository.getUsers();
        console.log("users");
        res.json({
            users,
        });
    });

    app.get("/users/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        const user = await repository.getUserById(id);
        res.json({
            user,
        });
    });

    app.post("/users", async (req, res) => {
        const userPayload = {
            name: req.body.name,
            email: req.body.email,
        };
        try {
            const user = await repository.createUser(userPayload);
            res.json({
                user,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: {
                    message:
                        error.message || "There was an error creating a user",
                },
            });
        }
    });

    app.put("/users/:id", async (req, res) => {
        const userPayload = {
            name: req.body.name,
            email: req.body.email,
        };
        try {
            const user = await repository.updateUser(
                parseInt(req.params.id),
                userPayload
            );
            res.json({
                user,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: {
                    message:
                        error.message || "There was an error updating the user",
                },
            });
        }
    });

    app.delete("/users/:id", async (req, res) => {
        const result = await repository.deleteUser(parseInt(req.params.id));
        res.json({
            user_deleted: result,
        });
    });
};

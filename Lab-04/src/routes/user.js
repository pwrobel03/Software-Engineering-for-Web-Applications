import repository from "../data/repository/index.js";
export const createUserRoutes = (app) => {
    app.get("/users", async (req, res) => {
        const users = await repository.getUsers();
        res.json({
            users,
        });
    });

    app.get("/users/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        const user = await repository.getUser(id);
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

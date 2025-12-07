// services/orders/src/routes/order.js
import repository from "../repository/index.js";
import { authenticateToken } from "../middleware/auth.js";
import { checkBookAvailability } from "../integration/bookClient.js";

export const createOrderRoutes = (app) => {
    app.get("/api/orders/:userId", authenticateToken, async (req, res) => {
        try {
            const userId = parseInt(req.params.userId);
            const orders = await repository.getOrdersByUserId(userId);
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Dodawanie zamówienia (Integracja z Books + Auth)
    app.post("/api/orders", authenticateToken, async (req, res) => {
        try {
            const { userId, bookId, quantity } = req.body;
            if (!userId || !bookId || !quantity) {
                return res
                    .status(400)
                    .json({ error: "Missing required fields" });
            }
            const bookExists = await checkBookAvailability(bookId);
            if (!bookExists) {
                return res.status(404).json({
                    error: "Book not found (verified via Book Service)",
                });
            }

            // Jeśli książka istnieje, tworzymy zamówienie
            const newOrder = await repository.createOrder({
                userId,
                bookId,
                quantity,
            });
            res.status(201).json(newOrder);
        } catch (error) {
            console.error("Order processing error:", error.message);
            if (error.message === "Book service is unavailable") {
                return res.status(503).json({
                    error: "Unable to verify book. Book service unavailable.",
                });
            }
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    app.delete("/api/orders/:orderId", authenticateToken, async (req, res) => {
        try {
            const id = parseInt(req.params.orderId);
            const result = await repository.deleteOrder(id);

            if (!result) {
                return res.status(404).json({ error: "Order not found" });
            }
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    app.patch("/api/orders/:orderId", authenticateToken, async (req, res) => {
        try {
            const id = parseInt(req.params.orderId);
            const updateData = req.body;

            const updatedOrder = await repository.updateOrder(id, updateData);

            if (!updatedOrder) {
                return res.status(404).json({ error: "Order not found" });
            }

            res.json(updatedOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
};

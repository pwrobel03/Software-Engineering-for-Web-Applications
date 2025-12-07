import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    // Nagłówek ma format: "Bearer <TOKEN>", więc bierzemy drugi element po spacji
    const token = authHeader && authHeader.split(" ")[1];

    // Jeśli nie ma tokena -> 401 Unauthorized
    if (!token) {
        return res.status(401).json({ error: "Access denied. Token missing." });
    }

    // Weryfikacja tokena
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // token nieprawdiłowy bądź wygasł -> 403 Forbidden
            return res.status(403).json({ error: "Invalid or expired token." });
        }

        req.user = user;
        next();
    });
};

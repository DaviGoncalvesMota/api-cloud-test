import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

export const authGuard = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Token não informado" });
    }

    try {
        const verifyToken = jwt.verify(token, jwtSecret);

        req.user = verifyToken;

        return next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
};

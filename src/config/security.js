import dotenv from "dotenv";
dotenv.config();

export default {
    security: {
        cors: {
            origin: process.env.CORS_ORIGIN || "3000",
        },
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 200,
        },
    },
}
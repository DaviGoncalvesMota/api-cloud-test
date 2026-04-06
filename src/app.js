import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import colaboradoresRoutes from "./routes/colaboradores.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";
import config from "./config/security.js";
import cookieParser from "cookie-parser"
import formRoutes from "./routes/formRoutes.js"
import authRoutes from "./routes/authRoutes.js"

const app = express();

app.use(cookieParser());

app.use(helmet());
app.use(cors({
    origin: config.security.cors.origin,
    credentials: true
}));

app.use(bodyParser.json());
app.use(logger);

app.use("/api/colaboradores", colaboradoresRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/form/", formRoutes)

app.use(errorHandler);

export default app;

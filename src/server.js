import app from "./app.js"
import config from "./config/port.js";

app.listen(config.server.port, () => console.log("Servidor rodando em http://localhost:3001"));

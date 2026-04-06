import app from "./app.js"
import config from "./config/port.js";

const PORT = process.env.PORT || config.server.port

app.listen(PORT, () => {
    console.log("Servidor rodandon na porta: ", PORT)
});

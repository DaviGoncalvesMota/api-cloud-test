import dotenv from "dotenv";
dotenv.config();

export default {
    files: {
        filepath: process.env.FILE_PATH || "./src/excel/COLABORADORES_OBJETIVO.xlsx"
    },
}
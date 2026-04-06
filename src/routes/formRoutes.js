import express from "express"
import FormController from "../controllers/form.controller.js"

const router = express.Router()

router.post("/gerar_formulario", FormController.generate)

export default router
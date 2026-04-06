import FormService from "../services/formService.js"

class FormController {
    async generate(req, res) {
        try {
            const file = await FormService.createForm(req.body)
            return res.download(file)
        } catch (error) {
            console.error("ERRO NO CONTROLLER:", error)
            return res.status(500).json({
              error: "Erro ao gerar documento!",
              detail: error.message
            })
          }
          
    }
}

export default new FormController()

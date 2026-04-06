import { Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";
import { authGuard } from "../middlewares/authGuard.js";
import * as controllerColaborador from "../controllers/colaboradores.controller.js"

const router = Router();

router.get("/", authGuard, ensureAuthenticated, controllerColaborador.listar);
router.get("/:id", authGuard, ensureAuthenticated, controllerColaborador.buscarPorId);
router.post("/", authGuard, ensureAuthenticated, controllerColaborador.adicionar);
router.put("/:id", authGuard, ensureAuthenticated, controllerColaborador.editar);
router.delete("/:id", authGuard, ensureAuthenticated, controllerColaborador.remover);
router.get("/filtrar/:name", authGuard, ensureAuthenticated, controllerColaborador.filtrar);
// -------------------------------------------------------------------------------------- //
router.get(
  "/dados-sensiveis",
  authGuard,
  ensureAuthenticated,
  (req, res) => {
    res.json({
      message: "Autenticado com sucesso!",
      userId: req.user.id,
    });
  }
);

export default router;

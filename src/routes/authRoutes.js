import { Router } from "express";
import { logar, logout, changePassword } from "../controllers/auth.controller.js"
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";
import { authGuard } from "../middlewares/authGuard.js";

const router = Router();

router.post("/login", logar);

router.get("/me", ensureAuthenticated, (req, res) => {
  res.json({
    logged: true,
    user: req.user
  });
});

router.patch("/changepassword", changePassword)

router.post("/logout", authGuard, ensureAuthenticated, logout)

export default router;

import * as authService from "../services/authService.js"

export const logar = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    });

    res.json({ message: `Logado com sucesso: ${token}` });
  } catch (error) {
    return res.status(401).json({
      message: error.message || "E-mail ou senha inválidos",
    })
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const result = await authService.updatePassword(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Erro na atualização de Senha",
    })
  }
};


export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    res.json({ message: "Usuário deslogado!" });
  } catch (error) {
    next(error);
  }
};

import * as serviceColaborador from "../services/colaboradores.service.js";

export const listar = async (req, res, next) => {
  try {
    const data = await serviceColaborador.listar();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const buscarPorId = async (req, res, next) => {
  try {
    const data = await serviceColaborador.buscarPorId(req.params.id);
    if (!data) return res.status(404).json({ error: "Colaborador não encontrado" });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const adicionar = async (req, res, next) => {
  try {
    await serviceColaborador.adicionar(req.body);
    res.json({ message: "Colaborador adicionado com sucesso" });
  } catch (err) {
    next(err);
  }
};

export const editar = async (req, res, next) => {
  try {
    await serviceColaborador.editar(req.params.id, req.body);
    res.json({ message: "Colaborador editado com sucesso" });
  } catch (err) {
    next(err);
  }
};

export const remover = async (req, res, next) => {
  try {
    await serviceColaborador.remover(req.params.id);
    res.json({ message: "Colaborador removido" });
  } catch (err) {
    next(err);
  }
};

export const filtrar = async (req, res, next) => {
  try {
    const data = await serviceColaborador.filtrar(req.params.name);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

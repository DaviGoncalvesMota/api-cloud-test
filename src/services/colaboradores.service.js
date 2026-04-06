import ExcelJS from "exceljs";
import fs from "fs";
import config from "../config/files.js";
import { headers } from "../headers.js"

const filePath = config.files.filepath
const SHEET_NAME = "COLABORADORES";

async function loadSheet() {
  if (!fs.existsSync(filePath)) {
    throw new Error("Arquivo Excel não encontrado");
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const sheet = workbook.getWorksheet(SHEET_NAME) || workbook.getWorksheet(1);
  if (!sheet) throw new Error("Planilha COLABORADORES não encontrada");

  return { workbook, sheet };
}

export async function listar() {
  const { sheet } = await loadSheet();
  const rows = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    const obj = {};
    row.eachCell((cell, colIndex) => {
      const key = headers[colIndex - 1];
      if (key) {
        obj[key] = cell.value;
      }
    });

    rows.push(obj);
  });


  return rows;
}

export async function buscarPorId(id) {
  const { sheet } = await loadSheet();

  for (let row of sheet._rows) {
    if (!row) continue;
    if (String(row.getCell(1).value) === String(id)) {
      const obj = {};
      row.eachCell((cell, colIndex) => {
        const key = headers[colIndex - 1];
        if (key) {
          obj[key] = cell.value;
        }
      });
      return obj;
    }
  }

  return null;
}

export async function adicionar(data) {
  const { workbook, sheet } = await loadSheet();

  const idColumnIndex = headers.indexOf("Id") + 1;

  if (idColumnIndex === 0) {
    throw new Error("Coluna 'id' não encontrada nos headers");
  }

  let lastId = -1;

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    const cellValue = row.getCell(idColumnIndex).value;

    if (typeof cellValue === "number") {
      lastId = Math.max(lastId, cellValue);
    }
  });

  const nextId = lastId + 1;

  const rowValues = headers.map((header) => {
    if (header === "Id") return nextId;
    return data[header] ?? "";
  });

  sheet.addRow(rowValues);
  await workbook.xlsx.writeFile(filePath);

  return {
    Id: nextId,
    message: "Colaborador adicionado com sucesso",
  };
}


export async function editar(id, novosDados) {
  const { workbook, sheet } = await loadSheet();

  let rowToEdit = null;

  sheet.eachRow((row) => {
    const cellValue = String(row.getCell(1).text || row.getCell(1).value);
    if (cellValue === String(id)) {
      rowToEdit = row;
    }
  });

  if (!rowToEdit) throw new Error("Colaborador não encontrado");

  for (const key of Object.keys(novosDados)) {
    const colIndex = headers.indexOf(key) + 1;

    if (colIndex > 0) {
      rowToEdit.getCell(colIndex).value = novosDados[key];
    }
  }

  await workbook.xlsx.writeFile(filePath);
}

export async function remover(id) {
  const { workbook, sheet } = await loadSheet();

  let index = null;

  sheet.eachRow((row, rowNumber) => {
    if (String(row.getCell(1).value) === String(id)) index = rowNumber;
  });

  if (!index) throw new Error("Colaborador não encontrado");

  sheet.spliceRows(index, 1);
  await workbook.xlsx.writeFile(filePath);
}

export async function filtrar(name) {
  const lista = await listar();

  const termo = name.toLowerCase();

  return lista.filter((c) =>
    c.Nome_Empregado?.toString().toLowerCase().includes(termo)
  );
}


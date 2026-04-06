import dotenv from "dotenv"
dotenv.config();

import jwt from "jsonwebtoken";
import { users } from "../config/users.js"
import fs from "fs"
import path from "path"
import { getEnv } from "../utils/dynamicEnv.js"

const envPath = path.resolve(process.cwd(), ".env");

export async function login({ username, password }) {
  const { PASSWORD_1, PASSWORD_2 } = getEnv()

  const user = users.find((u) => u.username === username)

  if (!user) {
    throw new Error("Email ou senha inválidos!")
  }

  const passwordValid =
    password === PASSWORD_1 || password === PASSWORD_2

  if (!passwordValid) {
    throw new Error("Email ou senha inválidos!")
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  )

  return token
}

export async function updatePassword({
  newPassword,
  confirmPassword,
  username,
} = {}) {
  if (!newPassword || !confirmPassword || !username) {
    throw new Error("Dados obrigatórios não enviados")
  }

  if (newPassword !== confirmPassword) {
    throw new Error("Senhas não são iguais")
  }

  const envFile = fs.readFileSync(envPath, "utf-8")
  const lines = envFile.split("\n")

  let userIndex = null

  lines.forEach((line) => {
    if (line.startsWith("USER_")) {
      const [key, value] = line.split("=")

      if (value && value.trim() === username.trim()) {
        userIndex = key.split("_")[1]
      }
    }
  })


  if (!userIndex) {
    throw new Error("Usuário não encontrado no .env")
  }

  let passwordUpdated = false

  const updatedEnv = lines.map((line) => {
    if (line.startsWith(`PASSWORD_${userIndex}=`)) {
      passwordUpdated = true
      return `PASSWORD_${userIndex}=${newPassword}`
    }
    return line
  })

  if (!passwordUpdated) {
    updatedEnv.push(`PASSWORD_${userIndex}=${newPassword}`)
  }

  fs.writeFileSync(envPath, updatedEnv.join("\n"))

  return {
    message: "Senha atualizada com sucesso",
  }
}

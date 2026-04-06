import fs from "fs"
import path from "path"

const envPath = path.resolve(process.cwd(), ".env")

export function getEnv() {
  const content = fs.readFileSync(envPath, "utf-8")

  return Object.fromEntries(
    content
      .split("\n")
      .filter(line => line && !line.startsWith("#"))
      .map(line => {
        const [key, ...rest] = line.split("=")
        return [key.trim(), rest.join("=").trim()]
      })
  )
}

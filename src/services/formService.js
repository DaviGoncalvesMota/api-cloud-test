import fs from "fs"
import path from "path"
import PizZip from "pizzip"
import Docxtemplater from "docxtemplater"
import { marcarOpcao } from "../utils/SelectOption.js"

class FormService {
  createForm(data) {
    return new Promise((resolve, reject) => {
      try {
        const templatePath = path.resolve(
          "src/word/FICHA_DE_ADMISSÃO_ESOCIAL.docx"
        )

        const outputPath = path.resolve(
          `src/word/Ficha_preenchida_${data.Nome_Empregado}.docx`
        )

        const content = fs.readFileSync(templatePath, "binary")
        const zip = new PizZip(content)

        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true
        })

        const corPele = data.Cor_Pele
        const tipoSalario = data.Tipo_Salario
        const naturezaEstagio = data.Natureza_Estagio
        const descontoVt = data.Desconto_Vt
        const irrf1 = data.Irrf1
        const irrf2 = data.Irrf2
        const irrf3 = data.Irrf3
        const irrf4 = data.Irrf4
        const irrf5 = data.Irrf5
        const sal_1 = data.Sal_1
        const sal_2 = data.Sal_2
        const sal_3 = data.Sal_3
        const sal_4 = data.Sal_4
        const sal_5 = data.Sal_5

        doc.render({
          Nome_Empregado: data.Nome_Empregado,
          Nome_Mae: data.Nome_Mãe ?? "",
          Nome_Pai: data.Nome_Pai ?? "",
          Sexo: data.Sexo ?? "",
          Nacionalidade: data.Nacionalidade ?? "",
          Estado_Civil: data.Estado_Civil ?? "",
          Formacao: data.Formacao ?? "",
          Data_de_Nascimento: data.Data_de_Nascimento ?? "",
          Local_de_Nascimento: data.Local_de_Nascimento ?? "",
          Uf_Empregado: data.Uf_Empregado ?? "",
          Endereco_Empregado: data.Endereco_Empregado ?? "",
          n_Empregado: data.n_Empregado ?? "",
          Complemento: data.Complemento ?? "",
          Bairro_Empregado: data.Bairro_Empregado ?? "",
          Cidade: data.Cidade ?? "",
          Cep_Empregado: data.Cep_Empregado ?? "",
          Telefone: data.Telefone ?? "",
          Celular: data.Celular ?? "",
          Email: data.Email ?? "",
          Branca: marcarOpcao(corPele, "Branca"),
          Negra: marcarOpcao(corPele, "Negra"),
          Amarela: marcarOpcao(corPele, "Amarela"),
          Parda: marcarOpcao(corPele, "Parda"),
          Indigena: marcarOpcao(corPele, "Indigena"),
          Dependente_Nome1: data.Dependente_Nome1 ?? "",
          Dependente_Nome2: data.Dependente_Nome2 ?? "",
          Dependente_Nome3: data.Dependente_Nome3 ?? "",
          Dependente_Nome4: data.Dependente_Nome4 ?? "",
          Dependente_Nome5: data.Dependente_Nome5 ?? "",
          Dependente_Cpf1: data.Dependente_Cpf1 ?? "",
          Dependente_Cpf2: data.Dependente_Cpf2 ?? "",
          Dependente_Cpf3: data.Dependente_Cpf3 ?? "",
          Dependente_Cpf4: data.Dependente_Cpf4 ?? "",
          Dependente_Cpf5: data.Dependente_Cpf5 ?? "",
          Dependente_Data1: data.Dependente_Data1 ?? "",
          Dependente_Data2: data.Dependente_Data2 ?? "",
          Dependente_Data3: data.Dependente_Data3 ?? "",
          Dependente_Data4: data.Dependente_Data4 ?? "",
          Dependente_Data5: data.Dependente_Data5 ?? "",
          Parentesco1: data.Parentesco1 ?? "",
          Parentesco2: data.Parentesco2 ?? "",
          Parentesco3: data.Parentesco3 ?? "",
          Parentesco4: data.Parentesco4 ?? "",
          Parentesco5: data.Parentesco5 ?? "",
          Ir_1s: marcarOpcao(irrf1, "Sim"),
          Ir_1n: marcarOpcao(irrf1, "Não"),
          Ir_2s: marcarOpcao(irrf2, "Sim"),
          Ir_2n: marcarOpcao(irrf2, "Não"),
          Ir_3s: marcarOpcao(irrf3, "Sim"),
          Ir_3n: marcarOpcao(irrf3, "Não"),
          Ir_4s: marcarOpcao(irrf4, "Sim"),
          Ir_4n: marcarOpcao(irrf4, "Não"),
          Ir_5s: marcarOpcao(irrf5, "Sim"),
          Ir_5n: marcarOpcao(irrf5, "Não"),
          Sal_1s: marcarOpcao(sal_1, "Sim"),
          Sal_1n: marcarOpcao(sal_1, "Não"),
          Sal_2s: marcarOpcao(sal_2, "Sim"),
          Sal_2n: marcarOpcao(sal_2, "Não"),
          Sal_3s: marcarOpcao(sal_3, "Sim"),
          Sal_3n: marcarOpcao(sal_3, "Não"),
          Sal_4s: marcarOpcao(sal_4, "Sim"),
          Sal_4n: marcarOpcao(sal_4, "Não"),
          Sal_5s: marcarOpcao(sal_5, "Sim"),
          Sal_5n: marcarOpcao(sal_5, "Não"),
          Cpf: data.Cpf ?? "",
          Ctps: data.Ctps ?? "",
          Serie: data.Serie ?? "",
          Emissao_Carteira: data.Emissao_Carteira ?? "",
          Pis: data.Pis ?? "",
          Data_de_Cadastro: data.Data_de_Cadastro ?? "",
          Rg: data.Rg ?? "",
          Data_de_Emissao_Rg: data.Data_de_Emissao_Rg ?? "",
          Orgao_Emissor: data.Orgao_Emissor ?? "",
          Uf_Rg: data.Uf_Rg ?? "",
          Titulo_Eleitor: data.Titulo_Eleitor ?? "",
          Data_de_Emissao_Titulo: data.Data_de_Emissao_Titulo ?? "",
          Zona_Eleitoral: data.Zona_Eleitoral ?? "",
          Secao: data.Secao ?? "",
          Reservista: data.Reservista ?? "",
          Categoria: data.Categoria ?? "",
          Cnh: data.Cnh ?? "",
          Data_Expedicao_Cnh: data.Data_Expedicao_Cnh ?? "",
          Validade_Cnh: data.Validade_Cnh ?? "",
          Categoria_Cnh: data.Categoria_Cnh ?? "",
          Estrangeiro: data.Estrangeiro ?? "",
          Data_de_Chegada: data.Data_de_Chegada ?? "",
          Numero_Carteira: data.Numero_Carteira ?? "",
          Validade_Rg: data.Validade_Rg ?? "",
          Visto: data.Visto ?? "",
          Validade_Ctps: data.Validade_Ctps ?? "",
          Data_de_Admissao: data.Data_de_Admissao ?? "",
          Cargo: data.Cargo ?? "",
          Salario: data.Salario ?? "",
          S_Mensal: marcarOpcao(tipoSalario, "Mensal"),
          S_Hora: marcarOpcao(tipoSalario, "Hora/Aula"),
          Inicio: data.Inicio ?? "",
          Saida: data.Saida ?? "",
          Inicio_s: data.Inicio_s ?? "",
          Saida_s: data.Saida_s ?? "",
          Int_Inicio: data.Int_Inicio ?? "",
          Int_Saida: data.Int_Saida ?? "",
          Int_Inicio_s: data.Int_Inicio_s ?? "",
          Int_Saida_s: data.Int_Saida_s ?? "",
          Horas_Semanais: data.Horas_Semanais ?? "",
          Horas_Mensais: data.Horas_Mensais ?? "",
          Segundo_Cargo: data.Segundo_Cargo ?? "",
          Carga_Horas_Semanais: data.Carga_Horas_Semanais ?? "",
          Carga_Horas_Mensais: data.Carga_Horas_Mensais ?? "",
          Aulas_Semana: data.Aulas_Semana ?? "",
          Materia: data.Materia ?? "",
          Valor_Infantil: data.Valor_Infantil ?? "",
          Valor_Fund1: data.Valor_Fund1 ?? "",
          Valor_Fund2: data.Valor_Fund2 ?? "",
          Valor_Medio: data.Valor_Medio ?? "",
          Vinculo: data.Vinculo ?? "",
          Nome_Empresa: data.Nome_Empresa ?? "",
          Desc_Vt_S: marcarOpcao(descontoVt, "Sim"),
          Desc_Vt_N: marcarOpcao(descontoVt, "Não"),
          Onibus: data.Onibus ?? "",
          Metro: data.Metro ?? "",
          Integracao: data.Integracao ?? "",
          Trem: data.Trem ?? "",
          Nome_Estagiario: data.Nome_Estagiario ?? "",
          Empresa: data.Empresa ?? "",
          Nome_Instituicao: data.Nome_Instituicao ?? "",
          Cnpj_Instituicao: data.Cnpj_Instituicao ?? "",
          Endereco_Instituicao: data.Endereco_Instituicao ?? "",
          n_Instituicao: data.N_Instituicao ?? "",
          Bairro_Instituicao: data.Bairro_Instituicao ?? "",
          Uf_Instituicao: data.Uf_Instituicao ?? "",
          Cep_Instituicao: data.Cep_Instituicao ?? "",
          Nat_Est_S: marcarOpcao(naturezaEstagio, "Sim"),
          Nat_Est_N: marcarOpcao(naturezaEstagio, "Não"),
          Curso: data.Curso ?? "",
          Serie_Curso: data.Serie_Curso ?? "",
          Periodo: data.Periodo ?? "",
          Ra: data.Ra ?? "",
          Area_Estagiario: data.Area_Estagiario ?? "",
          Duracao: data.Duracao ?? "",
          Nome_Agente: data.Nome_Agente ?? "",
          Cnpj_Agente: data.Cnpj_Agente ?? "",
          Endereco_Agente: data.Endereco_Agente ?? "",
          n_Agente: data.n_Agente ?? "",
          Bairro_Agente: data.Bairro_Agente ?? "",
          Uf_Agente: data.Uf_Agente ?? "",
          Cep_Agente: data.Cep_Agente ?? "",
          apolice: data.apolice ?? "",
          companhia: data.companhia ?? "",
          Nome_Coordenador: data.Nome_Coordenador ?? "",
          Cargo_Coordenador: data.Cargo_Coordenador ?? "",
          Cpf_Coordenador: data.Cpf_Coordenador ?? ""
        })

        const buffer = doc.getZip().generate({ type: "nodeBuffer" })
        fs.writeFileSync(outputPath, buffer)

        resolve(outputPath)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default new FormService()

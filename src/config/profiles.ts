import type { FormStudentHolderValues } from "../components/form-filler/form-filler.interfaces";
import StoredList from "../utils/store";

export const profiles = new StoredList<FormStudentHolderValues>([
    {
        fullName: "Exemplo Teste",
        firstName: "Exemplo",
        lastName: "Teste",
        documentNumber: "___.___.___-__",
        dateOfBirth: "01/01/1990",
        CIE: "Seu CIE",
        validityDate: "31/03/2026",
        institutionName: "Sua Instutuição",
        city: "Sua Cidade",
        state: "PR",
        course: "Seu Curso",
        confirmData: true
    },
    {
        fullName: "Leonardo Andretta Gilinski",
        firstName: "Leonardo",
        lastName: "Andretta Gilinski",
        documentNumber: "11521349908",
        dateOfBirth: "16/08/1999",
        CIE: "67DKH7D3",
        validityDate: "31/03/2026",
        institutionName: "IFRS",
        city: "Porto Alegre",
        state: "RS",
        course: "Organizador de Eventos",
        confirmData: true
    },
    {
        fullName: "Júlia Akemi Taniguchi",
        firstName: "Júlia",
        lastName: "Akemi Taniguchi",
        documentNumber: "09660499930",
        dateOfBirth: "05/11/2000",
        CIE: "0CR52S",
        validityDate: "31/03/2026",
        institutionName: "Pontifícia Universidade Católica do Paraná",
        city: "Curitiba",
        state: "PR",
        course: "Psicologia Clínica e Psicanálise",
        confirmData: true
    }
]);


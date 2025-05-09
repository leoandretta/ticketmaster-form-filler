export type FormStudentHolderValues = {
    fullName: string;
    firstName: string;
    lastName: string;
    documentNumber: string;
    dateOfBirth: string;
    CIE: string;
    validityDate: string;
    institutionName: string;
    city: string;
    state: string;
    course: string;
    confirmData: boolean
}

export const profiles: FormStudentHolderValues[] = [
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
    }
]
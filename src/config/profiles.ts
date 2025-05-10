import type { ProfileHolderFormValues, ProfileHolderType } from "../components/profile-create/types";
import StoredList from "../utils/store";

export const profileTypes: ProfileHolderType[] = [
    { label: "Estudante", value: "Student" },
    { label: "Pessoa com Deficiência", value: "DisabledPerson" },
    { label: "Jovens pertencentes a famílias de Baixa Renda", value: "LowIncomeYouth" },
    { label: "Profissionais das Redes Públicas, Estaduais e Municipais de Ensino", value: "Teachers" },
    { label: "Aposentados", value: "Retirees" },
]

export const profiles = new StoredList<ProfileHolderFormValues>();


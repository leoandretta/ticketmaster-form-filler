
export type CreateProfileFormProps = {
    visible: boolean;
    onSuccess: () => void;
    onCancel: () => void;
}

export type ProfileFormHandle = {
    submit: () => void;
}

export type ProfileFormProps = {
    onSubmit: (values: ProfileHolderFormValues) => void;
}

export type ProfileHolderType = {
    label: string;
    value: string;
}

export type ProfileHolderFormValues = {
    firstName: string;
    lastName: string;
    documentNumber: string;
    dateOfBirth: string;
    confirmData: boolean;
} & ( StudentFormValues | DisabledPersonFormValues | LowIncomeYouthFormValues | TeacherFormValues | RetireesFormValues)

type StudentFormValues = {
    type: "Student";
    CIE: string;
    validityDate: string;
    institutionName: string;
    city: string;
    state: string;
    course: string;
}

type DisabledPersonFormValues = {
    type: "DisabledPerson";
    bpc: string;
}

type LowIncomeYouthFormValues = {
    type: "LowIncomeYouth";
    youthIdentityCard: string;
    expirationDate: string;
}

type TeacherFormValues = {
    type: "Teacher";
    employeeNumber: string;
    expirationDate: string;
}

type RetireesFormValues = {
    type: "Retirees";
    INSS: string;
}
import { Grid, TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { ProfileFormHandle, ProfileFormProps, ProfileHolderFormValues } from "./types";
import { forwardRef, useImperativeHandle } from "react";

const TeacherCreationForm = forwardRef<ProfileFormHandle, ProfileFormProps>(({ onSubmit }, ref) => {
    const form = useForm<ProfileHolderFormValues>({
        initialValues: {
            type: "Teacher",
            firstName: "",
            lastName: "",
            documentNumber: "",
            dateOfBirth: "",
            employeeNumber: "",
            expirationDate: "",
            confirmData: false
        }
    })

    useImperativeHandle(ref, () =>({
        submit() {
            form.validate()
            if(form.isValid()) onSubmit(form.values)
        },
    }))

    return (
        <form>
            <Grid>
                <Grid.Col span={5}>
                    <TextInput required label="Nome" key={form.key('firstName')} {...form.getInputProps('firstName')} />
                </Grid.Col>
                <Grid.Col span={7}>
                    <TextInput required label="Sobrenomes" key={form.key('lastName')} {...form.getInputProps('lastName')} />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Select label="Tipo" data={['CPF']} value="CPF" />
                </Grid.Col>
                <Grid.Col span={9}>
                    <TextInput required label="CPF" key={form.key('documentNumber')} {...form.getInputProps('documentNumber')} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput required label="Data de Nascimento" key={form.key('dateOfBirth')} {...form.getInputProps('dateOfBirth')} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput required label="No da Carteira Funcional" key={form.key('employeeNumber')} {...form.getInputProps('employeeNumber')} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput required label="Data de validade da Carteira" key={form.key('expirationDate')} {...form.getInputProps('expirationDate')} />
                </Grid.Col>
            </Grid>
        </form>
    );
});

export default TeacherCreationForm;
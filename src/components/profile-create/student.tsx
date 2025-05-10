import { Grid, TextInput, Select, Autocomplete, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { states } from "../../config/states";
import type { ProfileFormHandle, ProfileFormProps, ProfileHolderFormValues } from "./types";
import { forwardRef, useImperativeHandle } from "react";

const StudentCreationForm = forwardRef<ProfileFormHandle, ProfileFormProps>(({ onSubmit }, ref) => {
    const form = useForm<ProfileHolderFormValues>({
        initialValues: {
            type: "Student",
            firstName: "",
            lastName: "",
            documentNumber: "",
            dateOfBirth: "",
            CIE: "",
            validityDate: "",
            institutionName: "",
            city: "",
            state: "",
            course: "",
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
            <Text fw="bold" fz="h4">Cadastro de Perfil</Text>
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
                    <TextInput required label="CIE" key={form.key('CIE')} {...form.getInputProps('CIE')} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput required label="Data da expiração " key={form.key('validityDate')} {...form.getInputProps('validityDate')} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput required label="Nome da instuição" key={form.key('institutionName')} {...form.getInputProps('institutionName')} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput required label="Cidade" key={form.key('city')} {...form.getInputProps('city')} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Autocomplete required label="UF" key={form.key('state')} {...form.getInputProps('state')} data={states} />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TextInput required label="Curso" key={form.key('course')} {...form.getInputProps('course')} />
                </Grid.Col>
            </Grid>
        </form>
    );
});

export default StudentCreationForm;
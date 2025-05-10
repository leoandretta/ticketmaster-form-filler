import { Grid, TextInput, Select, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { ProfileFormHandle, ProfileFormProps, ProfileHolderFormValues } from "./types";
import { forwardRef, useImperativeHandle } from "react";

const DisabledPersonCreationForm = forwardRef<ProfileFormHandle, ProfileFormProps>(({ onSubmit }, ref) => {
    const form = useForm<ProfileHolderFormValues>({
        initialValues: {
            type: "DisabledPerson",
            firstName: "",
            lastName: "",
            documentNumber: "",
            dateOfBirth: "",
            bpc: "",
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
                    <TextInput required label="CID, Nr INSS ou Nr Cartao BPC" key={form.key('bpc')} {...form.getInputProps('bpc')} />
                </Grid.Col>
            </Grid>
        </form>
    );
})

export default DisabledPersonCreationForm;
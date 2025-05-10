import { ActionIcon, Button, Container, Group, Paper, Text, TextInput, Tooltip } from "@mantine/core";
import classes from "./index.module.css"
import Icon from "@mdi/react";
import { mdiAccountArrowUp,  mdiDelete, mdiPlus } from "@mdi/js";
import { useState } from "react";
// import { useForm } from "@mantine/form";
// import type { FormStudentHolderValues } from "./types";
import { profiles } from "../../config/profiles";
// import { states } from "../../config/states";
import { useStore } from "zustand";
import ProfileCreate from "../profile-create";
import type { ProfileHolderFormValues } from "../profile-create/types";

const FormFiller = () => {
    const [createNew, setCreateNew] = useState(false);
    const fillOutForm = async (profile: ProfileHolderFormValues) => {
        if(!profile) return alert("Perfil não identificado");

        const [tab] = await chrome.tabs.query({ active: true });
        chrome.scripting.executeScript<ProfileHolderFormValues[],void>({
            target: { tabId: tab.id! },
            args: [profile],
            func: async (data) => {
                const holderForms = document.getElementById("holder_forms");
                if(!holderForms) return alert("Formulário não identificado!");
                
                const holderEl = Array.from(holderForms.children).find(el => el.querySelector(`.holder-active`))
                if(!holderEl) return alert("Formulário não está ativo!");
                
                const holderType = holderEl.querySelector(`.holder-options`);
                if(!holderType) return alert("Opções de meia não disponíveis!");

                const studentDiv = Array.from(holderType.children).find(el => el.getAttribute("data-type") == data.type);
                if(!studentDiv) return alert("Opção de meia de estudante não disponível");
                
                const studentOption = studentDiv.children[0]
                if(!studentOption) return alert("Opção de meia de estudante inválida.");
                
                studentOption.dispatchEvent(new Event('click', { bubbles: true }))

                await new Promise((res) => setTimeout(res, 50));
            
                const simulateTyping = async (input: HTMLInputElement, value: string) => {
                    input.focus();
                    input.value = ''
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    
                    for await (const char of value) {
                        const keyDown = new KeyboardEvent('keydown', {
                            key: char,
                            bubbles: true,
                            cancelable: true,
                          });
                          input.dispatchEvent(keyDown);
                      
                          const keyPress = new KeyboardEvent('keypress', {
                            key: char,
                            bubbles: true,
                            cancelable: true,
                          });
                          input.dispatchEvent(keyPress);
                      
                          // Insert the character at the caret position manually
                          const currentValue = input.value;
                          const selectionStart = input.selectionStart || 0;
                          const selectionEnd = input.selectionEnd || 0;
                          const newValue = currentValue.slice(0, selectionStart) + char + currentValue.slice(selectionEnd);
                      
                          input.value = newValue;
                      
                          input.setSelectionRange(selectionStart + 1, selectionStart + 1);
                      
                          input.dispatchEvent(new InputEvent('input', { bubbles: true }));
                          input.dispatchEvent(
                            new KeyboardEvent('keyup', {
                              key: char,
                              bubbles: true,
                              cancelable: true,
                            })
                          );
                      
                        await new Promise((r) => setTimeout(r, 10));
                    }
                    
                    input.blur();
                }
                
                const keys = Object.keys(data);
                
                for await (const key of keys)
                {
                    const value = data[key as keyof ProfileHolderFormValues]
                    const input = holderEl.querySelector(`[name="${key}"]`) as HTMLInputElement | null; 
                    if(input) {
                        if (input.getAttribute('im-insert') === 'true') {
                            await simulateTyping(input, value.toString());
                        } else if(input.type == 'text'){
                            input.value = value.toString();
                            input.dispatchEvent(new Event('input', { bubbles: true }));
                        } else if(input.type == 'checkbox'){
                            input.checked = true;
                            input.dispatchEvent(new Event('change', { bubbles: true }));
                        } else {
                            input.value = value.toString();
                            input.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }
                }

                const btnSave = holderEl.querySelector("#saveHolder");
                if(btnSave) {
                    btnSave.dispatchEvent(new Event('click', { bubbles: true }));
                }
            },
        });
        window.close()

    }
    
    const ProfilesHandle = ({ visible }: { visible: boolean }) => {
        const items = useStore(profiles.getStore(), (s) => s.items)
        if(!visible) return;
        return (
            <>
                <Button color="teal" variant="light" fullWidth onClick={onClickCreate}>
                    <Icon path={mdiPlus} />
                    Criar novo perfil
                </Button>
                {
                    items.map((p, index) => (
                        <Group key={`profile-${index}`} mt={20} justify="space-between">
                            <TextInput w="300px" readOnly value={`${p.firstName} ${p.lastName}`} />
                            <Group justify="end">
                                <Tooltip label="Deletar Perfil" position="bottom">
                                    {/* <ActionIcon variant="light" color="red" onClick={() => removeProfile(index)}> */}
                                    <ActionIcon variant="light" color="red" onClick={() => profiles.remove(index)}>
                                        <Icon path={mdiDelete} />
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip label="Preencher formulário" position="bottom">
                                    <ActionIcon variant="light" color="indigo" onClick={() => fillOutForm(p)}>
                                        <Icon path={mdiAccountArrowUp} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </Group>
                    ))
                }
            </>
        )
            
    }

    // const ProfileCreationForm = ({ visible }: { visible: boolean }) => {
    //     const form = useForm<FormStudentHolderValues>({
    //         initialValues: {
    //             firstName: "",
    //             lastName: "",
    //             documentNumber: "",
    //             dateOfBirth: "",
    //             CIE: "",
    //             validityDate: "",
    //             institutionName: "",
    //             city: "",
    //             state: "",
    //             course: "",
    //             confirmData: false
    //         }
    //     })

    //     const onSubmit = (values: FormStudentHolderValues) => {
    //         profiles.add(values);
    //         setCreateNew(false);
    //     }
        
    //     if(!visible) return;
    //     return (
    //         <form onSubmit={form.onSubmit(onSubmit)}>
    //             <Text fw="bold" fz="h4">Cadastro de Perfil</Text>
    //             <Grid>
    //                 <Grid.Col span={5}>
    //                     <TextInput required label="Nome" key={form.key('firstName')} {...form.getInputProps('firstName')} />
    //                 </Grid.Col>
    //                 <Grid.Col span={7}>
    //                     <TextInput required label="Sobrenomes" key={form.key('lastName')} {...form.getInputProps('lastName')} />
    //                 </Grid.Col>
    //                 <Grid.Col span={3}>
    //                     <Select label="Tipo" data={['CPF']} value="CPF" />
    //                 </Grid.Col>
    //                 <Grid.Col span={9}>
    //                     <TextInput required label="CPF" key={form.key('documentNumber')} {...form.getInputProps('documentNumber')} />
    //                 </Grid.Col>
    //                 <Grid.Col span={6}>
    //                     <TextInput required label="Data de Nascimento" key={form.key('dateOfBirth')} {...form.getInputProps('dateOfBirth')} />
    //                 </Grid.Col>
    //                 <Grid.Col span={6}>
    //                     <TextInput required label="CIE" key={form.key('CIE')} {...form.getInputProps('CIE')} />
    //                 </Grid.Col>
    //                 <Grid.Col span={6}>
    //                     <TextInput required label="Data da expiração " key={form.key('validityDate')} {...form.getInputProps('validityDate')} />
    //                 </Grid.Col>
    //                 <Grid.Col span={6}>
    //                     <TextInput required label="Nome da instuição" key={form.key('institutionName')} {...form.getInputProps('institutionName')} />
    //                 </Grid.Col>
    //                 <Grid.Col span={6}>
    //                     <TextInput required label="Cidade" key={form.key('city')} {...form.getInputProps('city')} />
    //                 </Grid.Col>
    //                 <Grid.Col span={6}>
    //                     <Autocomplete required label="UF" key={form.key('state')} {...form.getInputProps('state')} data={states} />
    //                 </Grid.Col>
    //                 <Grid.Col span={12}>
    //                     <TextInput required label="Curso" key={form.key('course')} {...form.getInputProps('course')} />
    //                 </Grid.Col>
    //             </Grid>

                
    //             <SimpleGrid mt={20} cols={2} spacing={10}>
    //                 <Button color="red" variant="light" onClick={() => setCreateNew(false)}>
    //                     <Icon path={mdiClose} />
    //                     Cancelar
    //                 </Button>
    //                 <Button color="teal" variant="light" type="submit">
    //                     <Icon path={mdiCheck} />
    //                     Salvar
    //                 </Button>
    //             </SimpleGrid>
    //         </form>
    //     );
    // }

    const onClickCreate = () => {
        setCreateNew(true);
    }

    return (
        <Container fluid className={classes.wrapper}>
            <Text size="var(--mantine-h2-font-size)" ta="center">
                Ticketmaster <br />
                Form Filler
            </Text>
            <Paper w="400px">
                {/* <ProfileCreationForm visible={createNew == true} /> */}
                <ProfileCreate visible={createNew == true} onCancel={() => setCreateNew(false)} onSuccess={() => setCreateNew(false)}/>
                <ProfilesHandle visible={createNew == false} />
            </Paper>
            
        </Container>
    );
}

export {
    FormFiller
}
import { ActionIcon, Container, Group, Text, TextInput, Tooltip } from "@mantine/core";
import { profiles, type FormStudentHolderValues } from "../../config/profiles";
import classes from "./form-filler.module.css"
import Icon from "@mdi/react";
import { mdiAccountArrowUp } from "@mdi/js";

const FormFiller = () => {
    

    const fillOutForm = async (profile: FormStudentHolderValues) => {
        if(!profile) return alert("Perfil não identificado");

        const [tab] = await chrome.tabs.query({ active: true });
        chrome.scripting.executeScript<FormStudentHolderValues[],void>({
            target: { tabId: tab.id! },
            args: [profile],
            func: async (data) => {
                const holderForms = document.getElementById("holder_forms");
                if(!holderForms) return alert("Formulário não identificado!");
                
                const holderEl = Array.from(holderForms.children).find(el => el.querySelector(`.holder-active`))
                if(!holderEl) return alert("Formulário não está ativo!");
                
                const holderType = holderEl.querySelector(`.holder-options`);
                if(!holderType) return alert("Opções de meia não disponíveis!");

                const studentDiv = Array.from(holderType.children).find(el => el.getAttribute("data-type") == "Student");
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
                    const value = data[key as keyof FormStudentHolderValues]
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

    return (
        <Container fluid className={classes.wrapper}>
            <Text size="var(--mantine-h1-font-size)" ta="center">
                Ticketmaster <br />
                Form Filler
            </Text>
            {
                profiles.map(p => (
                    <Group justify="space-between">
                        <TextInput w="250px" readOnly value={p.fullName} />
                        <Tooltip label="Preencher formulário" position="bottom">
                            <ActionIcon variant="light" color="indigo" onClick={() => fillOutForm(p)}>
                                <Icon path={mdiAccountArrowUp} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                ))
            }

        </Container>
    );
}

export {
    FormFiller
}
import { Group, TextInput, Tooltip, ActionIcon } from "@mantine/core";
import { mdiDelete, mdiAccountArrowUp } from "@mdi/js";
import Icon from "@mdi/react";
import { useStore } from "zustand";
import { profiles } from "../../config/profiles";
import CreateProfileButton from "../button/create-profile";
import ResetProfilesButton from "../button/reset-profiles";
import type { ProfileHolderFormValues } from "../profile-create/types";

type ProfilesListProps = {
    visible: boolean,
    onClickCreate: () => void
}
const ProfilesList = ({ visible, onClickCreate }: ProfilesListProps) => {
    
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
    
    const items = useStore(profiles.getStore(), (s) => s.items)
    if(!visible) return;
    return (
        <>
            <CreateProfileButton onClick={onClickCreate} />
            <ResetProfilesButton />
            {
                items.map((p, index) => (
                    <Group key={`profile-${index}`} mt={20} justify="space-between">
                        <TextInput w="300px" readOnly value={`${p.firstName} ${p.lastName}`} />
                        <Group justify="end">
                            <Tooltip label="Deletar Perfil" position="bottom">
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

export default ProfilesList;
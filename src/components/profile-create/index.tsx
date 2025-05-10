import { Button, Select, SimpleGrid, Text } from "@mantine/core"
import { useRef, useState } from "react"
import { profiles, profileTypes } from "../../config/profiles"
import type { ProfileFormHandle, CreateProfileFormProps, ProfileHolderFormValues } from "./types"
import StudentCreationForm from "./student"
import DisabledPersonCreationForm from "./disabledPerson"
import LowIncomeYouthCreationForm from "./lowIncomeYouth"
import TeacherCreationForm from "./teacher"
import RetireeCreationForm from "./retiree"
import { mdiClose, mdiCheck } from "@mdi/js"
import Icon from "@mdi/react"



const ProfileCreate = ({ visible, onSuccess, onCancel}: CreateProfileFormProps) => {
    const [profileType, setProfileType] = useState<string | null>("Student")

    const formRef = useRef<ProfileFormHandle>(null)
    
    const onSubmit = (values: ProfileHolderFormValues) => {
        profiles.add(values);
        onSuccess();
    }
    
    if(!visible) return;
    return (
        <>
            <Text fw="bold" fz="h4">Cadastro de Perfil</Text>
            <Select
            	label="Tipo de meia entrada"
                required
            	data={profileTypes}
            	value={profileType}
            	onChange={setProfileType}
            />
            {
                profileType == "Student" ? <StudentCreationForm ref={formRef} onSubmit={onSubmit} /> :
                profileType == "DisabledPerson" ? <DisabledPersonCreationForm ref={formRef} onSubmit={onSubmit}  /> :
                profileType == "LowIncomeYouth" ? <LowIncomeYouthCreationForm ref={formRef} onSubmit={onSubmit} /> :
                profileType == "Teacher" ? <TeacherCreationForm ref={formRef} onSubmit={onSubmit} /> :
                profileType == "Retirees" && <RetireeCreationForm ref={formRef} onSubmit={onSubmit} />
            }
            <SimpleGrid mt={20} cols={2} spacing={10}>
                <Button color="red" variant="light" onClick={() => onCancel()}>
                    <Icon path={mdiClose} />
                    Cancelar
                </Button>
                <Button color="teal" variant="light" onClick={() => formRef.current?.submit()}>
                    <Icon path={mdiCheck} />
                    Salvar
                </Button>
            </SimpleGrid>
        </>
    )
}

export default ProfileCreate;
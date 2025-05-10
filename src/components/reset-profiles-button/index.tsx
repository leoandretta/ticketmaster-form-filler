import { Button, Group } from "@mantine/core"
import { mdiBackupRestore } from "@mdi/js"
import Icon from "@mdi/react"
import { profiles } from "../../config/profiles"

const ResetProfilesButton = () => {
    const onClick = () => {
        profiles.clear()
    }
    
    return (
        <Button c="cyan" variant="transparent" onClick={onClick}>
            <Group>
                <Icon path={mdiBackupRestore} size="20"/>
                Resetar perfis
            </Group>
        </Button>
    )
}

export default ResetProfilesButton;
import { Button, Group } from "@mantine/core";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";

type CreateProfileButtonProps = {
    onClick: () => void;
}

const CreateProfileButton = ({ onClick }: CreateProfileButtonProps) => (
    <Button color="teal" variant="light" fullWidth onClick={onClick}>
        <Group>
            <Icon path={mdiPlus} size="20"/>
            Criar novo perfil
        </Group>
    </Button>
)

export default CreateProfileButton;
import { Container, Paper, Text } from "@mantine/core";
import classes from "./index.module.css"
import { useState } from "react";
import ProfileCreate from "../profile-create";
import ProfilesList from "../profile-list/profile-list";

const FormFiller = () => {
    const [createNew, setCreateNew] = useState(false);
    
    return (
        <Container fluid className={classes.wrapper}>
            <Text fz="h4" fw="bolder" ta="center">
                TICKETMASTER <br />
                FORM FILLER
            </Text>
            <Paper w="400px">
                <ProfileCreate visible={createNew == true} onCancel={() => setCreateNew(false)} onSuccess={() => setCreateNew(false)}/>
                <ProfilesList visible={createNew == false} onClickCreate={() => setCreateNew(true)} />
            </Paper>
        </Container>
    );
}

export {
    FormFiller
}
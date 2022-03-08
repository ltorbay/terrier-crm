import * as React from 'react';
import {Container, Divider, List, ListItem, ListItemText, Typography,} from "@mui/material";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Prices() {
    return (
        <Container maxWidth="lg">
            <List>
                <ListItem alignItems="flex-start">
                    <ListItemText>
                        <ListItemText primary="Peak season" secondary="01/06 - 30/09"/>
                        <List>
                            <ListItem>
                                <ListItemText primary="Weekly rental" secondary="7 nights"/>
                                <Typography gutterBottom color="primary.dark" variant="h6" component="div">
                                    4000 €
                                </Typography>
                            </ListItem>
                        </List>
                    </ListItemText>
                </ListItem>
                <Divider/>
                <ListItem alignItems="flex-start">
                    <ListItemText>
                        <ListItemText primary="Off season" secondary="01/10 - 31/05"/>
                        <List>
                            <ListItem>
                                <ListItemText primary="Weekly rental" secondary="7 nights"/>
                                <Typography gutterBottom color="primary.dark" variant="h6" component="div">
                                    2000 €
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Weekend rental" secondary="2 nights"/>
                                <Typography gutterBottom color="primary.dark" variant="h6" component="div">
                                    1100 €
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Nightly rental" secondary="price per night with a minimum of 2 nights"/>
                                <Typography gutterBottom color="primary.dark" variant="h6" component="div">
                                    320 €
                                </Typography>
                            </ListItem>
                        </List>
                    </ListItemText>
                </ListItem>
            </List>
        </Container>
    );
}
import React from "react";
import {Box, Container, Typography} from "@mui/material";
import token from '../../services/auth/token';


function Home() {

    document.title = 'Page d\'accueil'
    if (token.getRoles() === "ROLE_ADMIN"){
        console.log(token.getEmail())
    }

    return <Container maxWidth="lg" id='home'>
        <Box>
            <Typography variant='h2'>Welcome</Typography>
            <Typography variant='h5'>REGLER LE SOUCIS DE FLASH BLANC LORS D'UN LOAD DE PAGE</Typography>
        </Box>
    </Container>
}


export default Home;
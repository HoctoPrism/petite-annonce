import {AppBar, Box, Button} from "@mui/material";
import {SwitchModeButton} from "../_theme/_switchModeButton";
import {useEffect} from "react";
import '../../../assets/css/component/_partials/_navbar.scss';
import auth from "../../../services/auth/token"
import {LogginButton} from "../../../services/auth/logginButton";

export function Navbar() {

    useEffect(() => {
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar className='header' id="navbar">
                <Box sx={{m: 5, flexGrow: 1}} component="div">{document.title}</Box>
                <Box className="navbar">
                    {auth.loggedAndAdmin() ? (
                        <Box>
                            <Button color="primary" sx={{ color: 'primary.contrastText' }} href='/'>Accueil</Button>
                            <Button color="primary" sx={{ color: 'primary.contrastText' }} href='package'>Package</Button>
                            <Button color="primary" sx={{ color: 'primary.contrastText' }} href='image'>Image</Button>
                            <Button color="primary" sx={{ color: 'primary.contrastText' }} href='brand'>Marques</Button>
                            <Button color="primary" sx={{ color: 'primary.contrastText' }} href='denomination'>Appellations</Button>
                            <Button color="primary" sx={{ color: 'primary.contrastText' }} href='category'>Categories</Button>
                            <Button color="primary" sx={{ color: 'primary.contrastText' }} href='annonce'>Annonces</Button>
                            <Button color="primary" sx={{ color: 'primary.contrastText' }} href='address'>Adresses</Button>
                            <Button color="primary" sx={{ color: 'primary.contrastText' }} href='user'>Users</Button>
                        </Box>
                    ) : null }
                    <LogginButton/>
                    <SwitchModeButton/>
                </Box>
            </AppBar>
        </Box>
    )
}
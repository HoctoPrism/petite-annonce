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
                            <Button color="secondary" href='/'>Accueil</Button>
                            <Button color="secondary" href='package'>Package</Button>
                            <Button color="secondary" href='image'>Image</Button>
                            <Button color="secondary" href='brand'>Marques</Button>
                            <Button color="secondary" href='denomination'>Appellations</Button>
                            <Button color="secondary" href='category'>Categories</Button>
                            <Button color="secondary" href='annonce'>Annonces</Button>
                            <Button color="secondary" href='address'>Adresses</Button>
                            <Button color="secondary" href='user'>Users</Button>
                        </Box>
                    ) : null }
                    <LogginButton/>
                    <SwitchModeButton/>
                </Box>
            </AppBar>
        </Box>
    )
}
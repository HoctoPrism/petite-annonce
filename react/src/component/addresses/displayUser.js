import {Box, Button, List, ListItem, Modal, Typography} from "@mui/material";
import {Event} from "@mui/icons-material";
import {useState} from "react";

function AddressUser(props) {

    const [annonce, setShowUser] = useState(false);

    return(<Box >
          <Button color='secondary' variant='contained' sx={{mx: 2}} onClick={() => { setShowUser(true) }}> Voir </Button>
          <Modal
            id="modal-crud-container"
            hideBackdrop
            open={annonce}
            onClose={() => setShowUser(false)}
            aria-labelledby="display-user-title"
            aria-describedby="child-modal-description"
            >
            <Box className="modal-crud modal-crud-user" sx={{bgcolor: 'background.default'}}>
                <List dense={true} sx={{ minWidth: 350 }}>
                    <ListItem key={1} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Nom</Box>
                        <Box>
                            <Box component='span'> {props.display.user.lastname} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={2} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Prénom</Box>
                        <Box>
                            <Box component='span'> {props.display.user.firstname} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={3} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Username</Box>
                        <Box>
                            <Box component='span'> {props.display.user.username} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={4} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Email</Box>
                        <Box>
                            <Box component='span'> {props.display.user.email} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={5} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Roles</Box>
                        <Box>
                            <Box component='span'> {props.display.user.roles} </Box>
                        </Box>
                    </ListItem>
                </List>
                <Box className="action-button">
                    <Button variant="contained" onClick={() => setShowUser(false)}>Fermer</Button>
                </Box>

            </Box>
        </Modal>
     </Box>
    )
}
export default AddressUser;
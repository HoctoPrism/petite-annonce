import {Box, Button, List, ListItem, Modal, Typography} from "@mui/material";
import {Event} from "@mui/icons-material";
import {useState} from "react";

function ImageAnnonce(props) {

    const [annonce, setShowAnnonce] = useState(false);

    return(<Box >
          <Button color='secondary' variant='contained' sx={{mx: 2}} onClick={() => { setShowAnnonce(true) }}> Voir </Button>
          <Modal
            id="modal-crud-container"
            hideBackdrop
            open={annonce}
            onClose={() => setShowAnnonce(false)}
            aria-labelledby="display-annonce-title"
            aria-describedby="child-modal-description"
            >
            <Box className="modal-crud modal-crud-annonce" sx={{bgcolor: 'background.default'}}>
                <List dense={true} sx={{ minWidth: 350 }}>
                    <ListItem key={1} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Nom</Box>
                        <Box>
                            <Box component='span'> {props.display.annonce.name_annonce} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={2} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Description</Box>
                        <Box>
                            <Box component='span'> {props.display.annonce.description} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={3} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Prix</Box>
                        <Box>
                            <Box component='span'> {props.display.annonce.price} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={4} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Contenance</Box>
                        <Box>
                            <Box component='span'> {props.display.annonce.contenance} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={5} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Volume</Box>
                        <Box>
                            <Box component='span'> {props.display.annonce.volume} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={6} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Package</Box>
                        <Box>
                            <Box component='span'> {props.display.annonce.package_id} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={7} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Marque</Box>
                        <Box>
                            <Box component='span'> {props.display.annonce.brand_id} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={8} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Catégorie</Box>
                        <Box>
                            <Box component='span'> {props.display.annonce.category_id} </Box>
                        </Box>
                    </ListItem>
                    <ListItem key={9} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Box>Utilisateur</Box>
                        <Box>
                            <Box component='span'> {props.display.annonce.user_id} </Box>
                        </Box>
                    </ListItem>
                </List>
                <Box className="action-button">
                    <Button variant="contained" onClick={() => setShowAnnonce(false)}>Fermer</Button>
                </Box>

            </Box>
        </Modal>
     </Box>
    )
}
export default ImageAnnonce;
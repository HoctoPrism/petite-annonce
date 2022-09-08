import {
    Box,
    Button,
    FormControl,
    Modal,
    Snackbar,
    TextField,
    Typography,
    Alert,
    Input,
    InputLabel, Select, MenuItem
} from "@mui/material";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import Grid from "@mui/material/Grid";

function NewImage(props) {

    const [id, setID] = useState("");
    const [url, setUrl] = useState("");
    const [newImage, setShowNew] = useState(false);
    const [annonce_id, setAnnonceId] = useState(undefined);
    const [annonces, setAnnonces] = useState({});
    // Handle Toast event
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {url: ''}});

    useEffect( () => {
    }, [])

    let newImageForm = async () => {
        try {
            let formData = new FormData();
            formData.append("url", url);
            formData.append("annonce_id", "1");

            let res = await axios.post('http://127.0.0.1:8000/api/images/', formData, {
                    "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
                  });
            if (res.status === 200) {
                let tab = {};
                await Object.assign(tab, res.data.data);
                let data = update(props.newValue.data, {$push: [{id : tab.id, url: tab.url, annonce: tab.annonce.id}]})
                props.handleDataChange(data);
                setUrl("");
                setToastMessage({message: "Image ajouté ! Vous pouvez en ajouter un autre", severity: "success"});
                setShowToast(true);
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (<Box>
        <Button variant="contained" onClick={ async () => {
            await axios.get("http://127.0.0.1:8000/api/annonces/").then((actualData) => { setAnnonces(actualData.data.data) });
            setShowNew(true)
        }}>Ajouter</Button>
        <Modal
            id="modal-image-container"
            hideBackdrop
            open={newImage}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-image-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-image" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-image-title">Nouveau image</Typography>
                <form onSubmit={handleSubmit(newImageForm)}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sx={{ display: 'flex',flexDirection: 'column'}}>
                            <Controller
                              name="url"
                              control={control}
                              defaultValue=""
                              render={() => (
                                  <Input
                                   type='file'
                                   {...register('url')}
                                   onChange={(e) => setUrl(e.target.files[0]) }
                                   sx={{mt: 5, height: 50}}
                                />
                              )}
                            />
                            {errors.url ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.url?.message}</Alert>
                            ) : ''}

                            <Controller
                              name="annonce"
                              control={control}
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="annonce-select">Annonce</InputLabel>
                                      <Select
                                        labelId="annonce-select"
                                        id="annonce-select"
                                        label="Adresse"
                                        onChange={(e) => setAnnonceId(e.target.value)}
                                        sx={{height: 50}}
                                        variant="outlined"
                                      >
                                      {annonces.map((annonce) => {
                                          return(
                                              <MenuItem key={annonce.id} value={annonce.id}>{annonce.name_annonce}</MenuItem>
                                          )
                                      })}
                                      </Select>
                                  </FormControl>
                              )}
                            />
                            <Box className="action-button">
                                <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                                <Button variant="outlined" onClick={() => setShowNew(false)}>Fermer</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>

            </Box>
        </Modal>

        <Snackbar
            open={toast}
            autoHideDuration={3000}
            onClose={() => setShowToast(false)}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={() => setShowToast(false)} severity={toastMessage.severity} sx={{width: '100%'}}>
                {toastMessage.message}
            </Alert>
        </Snackbar>
    </Box>

    )
}

export default NewImage;
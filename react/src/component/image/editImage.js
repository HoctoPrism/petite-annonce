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
import {Edit} from "@mui/icons-material";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function EditImage(props) {
    const [id, setID] = useState("");
    const [url, setUrl] = useState("");
    const [oneImage, setOneImage] = useState("");
    const [editImage, setShowEdit] = useState(false);
    const [currentImage, setCurrentImage] = useState(props.updateValue.image);
    const [annonce_id, setAnnonceId] = useState(undefined);
    const [annonces, setAnnonces] = useState({});
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {url: props.updateValue.url, annonce_id: props.updateValue.annonce} });

    useEffect( () => {
        getAlls()
    }, [])

    let getAlls = async () => {
        await axios.get("http://127.0.0.1:8000/api/annonces/").then((actualData) => { setAnnonces(actualData.data.data) });
    }

    let editImageForm = async () => {
        try {

            let formData = new FormData();
            formData.append("url", url ? url : props.updateValue.url);
            formData.append("annonce_id",  annonce_id ? `${annonce_id}` : `${props.updateValue.annonce.id}`);
            formData.append("_method", 'PATCH');

            let res = await axios.post("http://127.0.0.1:8000/api/images/" + oneImage.id, formData, {
                "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            })
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneImage.id);
                let tab = {};
                console.log(res.data.data)
                await Object.assign(tab, res.data.data);
                let data = update(props.updateValue.data, {[foundIndex]: {$set: tab}})
                props.handleDataChange(data, 'edit');
                setShowEdit(false)
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
                setShowToast(true)
            }

        } catch (err) {
            console.log(err);
        }
    }

    return(<Box >
          <Button color='info' variant='contained' sx={{mx: 2}}
            onClick={() => {
                setShowEdit(true)
                setOneImage({id: props.updateValue.id, url: props.updateValue.url, annonce_id: props.updateValue.annonce})
                setCurrentImage(props.updateValue.url);
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-image-container"
            hideBackdrop
            open={editImage}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-image-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-image" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-image-title">Editer un image</Typography>
                <form onSubmit={handleSubmit(editImageForm)}>
                    <FormControl>
                        <Controller
                          name="url"
                          control={control}
                          render={() => (
                              <Box sx={{ display: 'flex'}}>
                                  <Box component="img" src={`http://127.0.0.1:8000/storage/uploads/${currentImage}`} alt={currentImage} sx={{ width: "80px", mr: 3 }}/>
                                  <Input
                                   type='file'
                                   {...register('url')}
                                   onChange={(e) => setUrl(e.target.files[0])}
                                   sx={{mt: 5, height: 50}}
                                  />
                              </Box>
                          )}
                        />
                        {errors.image ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.image?.message}</Alert>
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
                                    defaultValue={props.updateValue.annonce.id}
                                    label="Annonce"
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
                            <Button variant="outlined" onClick={() => setShowEdit(false)}>Fermer</Button>
                        </Box>
                    </FormControl>
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
export default EditImage;
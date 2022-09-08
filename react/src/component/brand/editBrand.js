import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";



function EditBrand(props) {
    const [id, setID] = useState("");
    const [name_brand, setName] = useState("");
    const [oneBrand, setOneBrand] = useState("");
    const [editBrand, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {name_brand: props.updateValue.name_brand} });

    let editBrandForm = async () => {
        try {
            let updatedBrand = {
                id: id ? id : parseInt(oneBrand.id),
                name_brand: name_brand ? name_brand : oneBrand.name_brand,
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/brands/ "+oneBrand.id, {name_brand}, {
                "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            });
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneBrand.id);
                let data = update(props.updateValue.data, {[foundIndex]: {$set: updatedBrand}})
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
                setOneBrand({id: props.updateValue.id, name_brand: props.updateValue.name_brand})
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-brand-container"
            hideBackdrop
            open={editBrand}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-brand-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-brand" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-brand-title">Editer une marque</Typography>
                <form onSubmit={handleSubmit(editBrandForm)}>
                    <FormControl>
                          <Controller
                              name="name_brand"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'name_brand',
                                       {
                                           required: 'Ce champ est requis',
                                           minLength: {value: 5, message: 'Longueur minimale de 5 caractères'}
                                       }
                                   )}
                                   onChange={(e) => setName(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Nom"
                                   variant="standard"
                                   defaultValue={name_brand}
                                />
                              )}
                            />
                            {errors.name_brand ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name_brand?.message}</Alert>
                            ) : ''}
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
export default EditBrand;
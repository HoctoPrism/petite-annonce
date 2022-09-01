import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function EditPackage(props) {
    const [id, setID] = useState("");
    const [name_package, setNamePackage] = useState("");
    const [onePackage, setOnePackage] = useState("");
    const [editPackage, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {name_package: props.updateValue.name_package} });

    let editPackageForm = async () => {
        try {
            let updatedPark = {
                id: id ? id : parseInt(onePackage.id),
                name_package: name_package ? name_package : onePackage.name_package,
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/packages/" + onePackage.id, {name_package}, {
                    "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            })
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === onePackage.id);
                let data = update(props.updateValue.data, {[foundIndex]: {$set: updatedPark}})
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
                setOnePackage({id: props.updateValue.id, name_package: props.updateValue.name_package})
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-package-container"
            hideBackdrop
            open={editPackage}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-package-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-package" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-package-title">Editer un package</Typography>
                <form onSubmit={handleSubmit(editPackageForm)}>
                    <FormControl>
                          <Controller
                              name="name_package"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'name_package',
                                       {
                                           required: 'Ce champ est requis'
                                       }
                                   )}
                                   onChange={(e) => setNamePackage(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Nom"
                                   variant="standard"
                                   defaultValue={name_package}
                                />
                              )}
                            />
                            {errors.name_package ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name_package?.message}</Alert>
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
export default EditPackage;
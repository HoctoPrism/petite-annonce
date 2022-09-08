import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert, Input} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function NewPackage(props) {

    const [id, setID] = useState("");
    const [name_package, setNamePackage] = useState("");
    const [newPackage, setShowNew] = useState(false);
    // Handle Toast event
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {name_package: ''}});

    let newPackageForm = async () => {
        try {
            let res = await axios.post('http://127.0.0.1:8000/api/packages/', {name_package}, {
                    "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
                  });
            if (res.status === 200) {
                let tab = {};
                await Object.assign(tab, res.data.data);
                let data = update(props.newValue.data, {$push: [{id : tab.id, name_package: tab.name_package}]})
                props.handleDataChange(data);
                setNamePackage("");
                setToastMessage({message: "Package ajouté ! Vous pouvez en ajouter un autre", severity: "success"});
                setShowToast(true);
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (<Box>
        <Button variant="contained" onClick={() => setShowNew(true)}>Ajouter</Button>
        <Modal
            id="modal-package-container"
            hideBackdrop
            open={newPackage}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-package-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-package" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-package-title">Nouveau package</Typography>
                <form onSubmit={handleSubmit(newPackageForm)}>
                    <FormControl>
                        <Controller
                          name="name_package"
                          control={control}
                          defaultValue=""
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
                               value={name_package}
                            />
                          )}
                        />
                        {errors.name_package ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name_package?.message}</Alert>
                        ) : ''}
                        <Box className="action-button">
                            <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                            <Button variant="outlined" onClick={() => setShowNew(false)}>Fermer</Button>
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

export default NewPackage;
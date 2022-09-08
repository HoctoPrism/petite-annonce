import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function EditAddress(props) {
    const [id, setID] = useState("");
    const [address, setAddress] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [oneAddress, setOneAddress] = useState("");
    const [editAddress, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ 
        defaultValues: {
            address: props.updateValue.address,
            postal_code: props.updateValue.postal_code,
            country: props.updateValue.country,
            city: props.updateValue.city,
            phone: props.updateValue.phone,
            user: props.updateValue.user,
        } });

    let editAddressForm = async () => {
        try {
            let updatedAddress = {
                id: id ? id : parseInt(props.updateValue.id),
                address: address ? address : props.updateValue.address,
                postal_code: postal_code ? postal_code : props.updateValue.postal_code,
                country: country ? country :  props.updateValue.country,
                city: city ? city : props.updateValue.city,
                phone: phone ? phone : props.updateValue.phone,
                user_id: props.updateValue.user.id,                
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/addresses/" + oneAddress.id, updatedAddress, {
                "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
        });
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneAddress.id);
                let tab = {};
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
                setOneAddress({id: props.updateValue.id, address: props.updateValue.address, user: props.updateValue.user})
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-address-container"
            hideBackdrop
            open={editAddress}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-address-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-address" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-address-title">Modifier une adresse</Typography>
                <form onSubmit={handleSubmit(editAddressForm)}>
                    <FormControl>
                          <Controller
                              name="address"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'address',
                                       {
                                           required: 'Ce champ est requis',
                                           minLength: {value: 5, message: 'Longueur minimale de 5 caractères'}
                                       }
                                   )}
                                   onChange={(e) => setAddress(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Nom"
                                   variant="standard"
                                   defaultValue={address}
                                />
                              )}
                            />
                            {errors.address ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.address?.message}</Alert>
                            ) : ''}


                            <Controller
                              name="postal_code"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'postal_code',
                                       {
                                           required: 'Ce champ est requis',
                                       }
                                   )}
                                   onChange={(e) => setPostalCode(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Code postal"
                                   variant="standard"
                                   defaultValue={postal_code}
                                />
                              )}
                            />
                            {errors.postal_code ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.postal_code?.message}</Alert>
                            ) : ''}

                            <Controller
                              name="country"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'country',
                                       {
                                           required: 'Ce champ est requis',
                                       }
                                   )}
                                   onChange={(e) => setCountry(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Pays"
                                   variant="standard"
                                   defaultValue={country}
                                />
                              )}
                            />
                            {errors.country ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.country?.message}</Alert>
                            ) : ''}

                            <Controller
                              name="city"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'city',
                                       {
                                           required: 'Ce champ est requis',
                                       }
                                   )}
                                   onChange={(e) => setCity(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Ville"
                                   variant="standard"
                                   defaultValue={city}
                                />
                              )}
                            />
                            {errors.city ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.city?.message}</Alert>
                            ) : ''}


                            <Controller
                              name="phone"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'phone',
                                       {
                                           required: 'Ce champ est requis',
                                       }
                                   )}
                                   onChange={(e) => setPhone(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Téléphone"
                                   variant="standard"
                                   defaultValue={phone}
                                />
                              )}
                            />
                            {errors.phone ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.phone?.message}</Alert>
                            ) : ''}



                        <Box className="action-button">
                            <Button type="submit" sx={{m: 3}} variant="contained">Valider</Button>
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
export default EditAddress;
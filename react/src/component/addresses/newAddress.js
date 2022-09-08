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
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import update from "immutability-helper";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

function NewAddress(props) {
  const [id, setID] = useState("");
  const [user_id, setUserId] = useState("");
  const [users, setUsers] = useState("");
  const [address, setAddress] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [newAddress, setShowNew] = useState(false);
  // Handle Toast event
  const [toast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({});
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {
     address: "",
     postal_code: "",
     country: "",
     city: "",
     phone: ""
    } });


    useEffect( () => {
    }, [])

    let getAlls = async () => {
        await axios.get('http://127.0.0.1:8000/api/users',{
            "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            })
            .then((actualData) => { setUsers(actualData.data.data) });
    }

  let newAddressForm = async () => {
    try {
      let res = await axios.post('http://127.0.0.1:8000/api/addresses/', 
      {user_id, address, postal_code, country, city, phone}, {
        "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
        });
      if (res.status === 200) {
        let tab = {};
        await Object.assign(tab, res.data.data);
        let data = update(props.newValue.data, {
          $push: [{ id: tab.id, 
                    user: tab.user,
                    address: tab.address,
                    postal_code: tab.postal_code,
                    country: tab.country,
                    city: tab.city,
                    phone: tab.phone }],
                       
        });
        console.log(data);
        props.handleDataChange(data);
        setUserId("");
        setAddress("");
        setPostalCode("");
        setCountry("");
        setCity("");
        setPhone("");
        setToastMessage({
          message: "Adresse ajouté ! Vous pouvez en ajouter une autre",
          severity: "success",
        });
        setShowToast(true);
      } else {
        setToastMessage({
          message: "Une erreur est survenue",
          severity: "error",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={ async () => {
        await getAlls()
        setShowNew(true)
      }}
>
        Ajouter
      </Button>
      <Modal
        id="modal-address-container"
        hideBackdrop
        open={newAddress}
        onClose={() => setShowNew(false)}
        aria-labelledby="new-address-title"
        aria-describedby="child-modal-description"
      >
        <Box className="modal-address" sx={{ bgcolor: "background.default" }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mb: 4 }}
            id="new-address-title"
          >
            Adresse de user
          </Typography>
          <form onSubmit={handleSubmit(newAddressForm)}>
            <FormControl>
              <Controller
                name="user"
                control={control}
                render={() => (
                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                    <InputLabel id="user-select">User</InputLabel>
                    <Select
                      labelId="user-select"
                      id="user-select"
                      label="User"
                      onChange={(e) => setUserId(e.target.value)}
                      sx={{ height: 50 }}
                      variant="outlined"
                    >
                      {users.map((user) => {
                        return (
                          <MenuItem key={user.id} value={user.id}>
                            {user.email}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
              />

              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={() => (
                  <TextField
                    {...register("address", {
                      required: "Ce champ est requis",
                    })}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: 400, height: 50 }}
                    label="Adresse"
                    variant="standard"
                    value={address}
                  />
                )}
              />
              {errors.address ? (
                <Alert sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.address?.message}
                </Alert>
              ) : (
                ""
              )}

              <Controller
                name="postal_code"
                control={control}
                defaultValue=""
                render={() => (
                  <TextField
                    {...register("postal_code", {
                      required: "Ce champ est requis",
                    })}
                    onChange={(e) => setPostalCode(e.target.value)}
                    style={{ width: 400, height: 50 }}
                    label="Code postal"
                    variant="standard"
                    value={postal_code}
                  />
                )}
              />
              {errors.postal_code ? (
                <Alert sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.postal_code?.message}
                </Alert>
              ) : (
                ""
              )}

              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={() => (
                  <TextField
                    {...register("country", {
                      required: "Ce champ est requis",
                    })}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{ width: 400, height: 50 }}
                    label="Pays"
                    variant="standard"
                    value={country}
                  />
                )}
              />
              {errors.country ? (
                <Alert sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.country?.message}
                </Alert>
              ) : (
                ""
              )}

              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={() => (
                  <TextField
                    {...register("city", {
                      required: "Ce champ est requis",
                    })}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: 400, height: 50 }}
                    label="Ville"
                    variant="standard"
                    value={city}
                  />
                )}
              />
              {errors.city ? (
                <Alert sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.city?.message}
                </Alert>
              ) : (
                ""
              )}

              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={() => (
                  <TextField
                    {...register("phone", {
                      required: "Ce champ est requis",
                    })}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: 400, height: 50 }}
                    label="Téléphone"
                    variant="standard"
                    value={phone}
                  />
                )}
              />
              {errors.phone ? (
                <Alert sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.phone?.message}
                </Alert>
              ) : (
                ""
              )}

              <Box className="action-button">
                <Button type="submit" sx={{ m: 3 }} variant="contained">
                  Envoyer
                </Button>
                <Button variant="outlined" onClick={() => setShowNew(false)}>
                  Fermer
                </Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Modal>

      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity={toastMessage.severity}
          sx={{ width: "100%" }}
        >
          {toastMessage.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default NewAddress;

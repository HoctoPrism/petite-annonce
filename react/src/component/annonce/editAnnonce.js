import {
    Box,
    Button,
    FormControl,
    Modal,
    Snackbar,
    TextField,
    Typography,
    Alert,
    InputLabel,
    Select, MenuItem
} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function EditAnnonce(props) {
    const [id, setID] = useState("");
    const [name_annonce, setNameAnnonce] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [contenance, setContenance] = useState("");
    const [volume, setVolume] = useState("");

    // One of ...
    const [package_id, setPackage] = useState(undefined);
    const [brand_id, setBrand] = useState(undefined);
    const [category_id, setCategory] = useState(undefined);
    const [user_id, setUser] = useState(undefined);
    // List All
    const [brands, setBrands] = useState({});
    const [categories, setCategories] = useState({});
    const [packages, setPackages] = useState({});
    const [users, setUsers] = useState({});

    const [oneAnnonce, setOneAnnonce] = useState("");
    const [editAnnonce, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
        name_annonce: props.updateValue.name_annonce,
        description: props.updateValue.description,
        price: props.updateValue.price,
        volume: props.updateValue.volume,
        contenance: props.updateValue.contenance,
        package_id: props.updateValue.package_id,
        brand: props.updateValue.brand,
        category: props.updateValue.category,
        user: props.updateValue.user
    } });

    useEffect( () => {
    }, [])

    let editAnnonceForm = async () => {
        try {
            let updatedPark = {
                id: id ? id : parseInt(props.updateValue.id),
                name_annonce: name_annonce ? name_annonce : props.updateValue.name_annonce,
                description: description ? description : props.updateValue.description,
                price: price ? price : props.updateValue.price,
                contenance: contenance ? contenance : props.updateValue.contenance,
                volume: volume ? volume : props.updateValue.volume,
                package_id: package_id ? package_id : props.updateValue.package_id.id,
                brand_id: brand_id ? brand_id : props.updateValue.brand.id,
                category_id: category_id ? category_id : props.updateValue.category.id,
                user_id: user_id ? user_id : props.updateValue.user.id,
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/annonces/" + oneAnnonce.id, updatedPark, {
                    "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            })
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneAnnonce.id);
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
          <Button color='secondary' variant='contained' sx={{mx: 2}}
            onClick={ async () => {
                await axios.get("http://127.0.0.1:8000/api/packages").then((actualData) => { setPackages(actualData.data.data) });
                await axios.get("http://127.0.0.1:8000/api/categories").then((actualData) => { setCategories(actualData.data.data) });
                await axios.get("http://127.0.0.1:8000/api/brands").then((actualData) => { setBrands(actualData.data.data) });
                await axios.get("http://127.0.0.1:8000/api/users", {
                    "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
                }).then((actualData) => { setUsers(actualData.data.data) });
                setShowEdit(true)
                setOneAnnonce({id: props.updateValue.id, name_annonce: props.updateValue.name_annonce})
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-annonce-container"
            hideBackdrop
            open={editAnnonce}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-annonce-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-annonce" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-annonce-title">Editer un annonce</Typography>
                <form onSubmit={handleSubmit(editAnnonceForm)}>
                    <FormControl>
                          <Controller
                              name="name_annonce"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'name_annonce',
                                       {
                                           required: 'Ce champ est requis'
                                       }
                                   )}
                                   onChange={(e) => setNameAnnonce(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Nom"
                                   variant="standard"
                                   defaultValue={name_annonce}
                                />
                              )}
                            />
                            {errors.name_annonce ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name_annonce?.message}</Alert>
                            ) : ''}
                        <Controller
                          name="description"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <TextField
                               {...register(
                                   'description',
                                   {
                                       required: 'Ce champ est requis'
                                   }
                               )}
                               onChange={(e) => setDescription(e.target.value)}
                               style={{width: 400, height: 50}}
                               label="Description"
                               variant="standard"
                               defaultValue={description}
                            />
                          )}
                        />
                        {errors.description ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.description?.message}</Alert>
                        ) : ''}
                        <Controller
                          name="price"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <TextField
                               {...register(
                                   'price',
                                   {
                                       required: 'Ce champ est requis'
                                   }
                               )}
                               onChange={(e) => setPrice(e.target.value)}
                               style={{width: 400, height: 50}}
                               label="Prix"
                               variant="standard"
                               defaultValue={price}
                               type='number'
                            />
                          )}
                        />
                        {errors.price ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.price?.message}</Alert>
                        ) : ''}
                        <Controller
                          name="contenance"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <TextField
                               {...register(
                                   'contenance',
                                   {
                                       required: 'Ce champ est requis'
                                   }
                               )}
                               onChange={(e) => setContenance(e.target.value)}
                               style={{width: 400, height: 50}}
                               label="Contenance"
                               variant="standard"
                               defaultValue={contenance}
                            />
                          )}
                        />
                        {errors.contenance ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.contenance?.message}</Alert>
                        ) : ''}
                        <Controller
                          name="volume"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <TextField
                               {...register(
                                   'volume',
                                   {
                                       required: 'Ce champ est requis'
                                   }
                               )}
                               onChange={(e) => setVolume(e.target.value)}
                               style={{width: 400, height: 50}}
                               label="Volume"
                               variant="standard"
                               defaultValue={volume}
                               type='number'
                               inputProps={{step: '0.01' }}
                            />
                          )}
                        />
                        {errors.volume ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.volume?.message}</Alert>
                        ) : ''}
                        <Controller
                              name="package_id"
                              control={control}
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="package-select">Package</InputLabel>
                                      <Select
                                        labelId="package-select"
                                        id="package-select"
                                        label="Package"
                                        onChange={(e) => setPackage(e.target.value)}
                                        sx={{height: 50}}
                                        defaultValue={props.updateValue.package_id.id}
                                        variant="outlined"
                                      >
                                      {packages.map((package_id) => {
                                          return(
                                              <MenuItem key={package_id.id} value={package_id.id}>{package_id.name_package}</MenuItem>
                                          )
                                      })}
                                      </Select>
                                  </FormControl>
                              )}
                        />
                        <Controller
                              name="brand_id"
                              control={control}
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="brand_id-select">Brand</InputLabel>
                                      <Select
                                        labelId="brand_id-select"
                                        id="brand_id-select"
                                        label="Adresse"
                                        onChange={(e) => setBrand(e.target.value)}
                                        sx={{height: 50}}
                                        variant="outlined"
                                        defaultValue={props.updateValue.brand.id}
                                      >
                                      {brands.map((brand_id) => {
                                          return(
                                              <MenuItem key={brand_id.id} value={brand_id.id}>{brand_id.name_brand}</MenuItem>
                                          )
                                      })}
                                      </Select>
                                  </FormControl>
                              )}
                        />
                        <Controller
                              name="category_id"
                              control={control}
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="category_id-select">Annonce</InputLabel>
                                      <Select
                                        labelId="category_id-select"
                                        id="category_id-select"
                                        label="Adresse"
                                        onChange={(e) => setCategory(e.target.value)}
                                        sx={{height: 50}}
                                        variant="outlined"
                                        defaultValue={props.updateValue.category.id}
                                      >
                                      {categories.map((category_id) => {
                                          return(
                                              <MenuItem key={category_id.id} value={category_id.id}>{category_id.name_category}</MenuItem>
                                          )
                                      })}
                                      </Select>
                                  </FormControl>
                              )}
                        />
                        <Controller
                              name="user_id"
                              control={control}
                              render={() => (
                                  <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                      <InputLabel id="user_id-select">Utilisateur</InputLabel>
                                      <Select
                                        labelId="user_id-select"
                                        id="user_id-select"
                                        label="Utilisateur"
                                        onChange={(e) => setUser(e.target.value)}
                                        sx={{height: 50}}
                                        variant="outlined"
                                        defaultValue={props.updateValue.user.id}
                                      >
                                      {users.map((user_id) => {
                                          return(
                                              <MenuItem key={user_id.id} value={user_id.id}>{user_id.email}</MenuItem>
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
export default EditAnnonce;
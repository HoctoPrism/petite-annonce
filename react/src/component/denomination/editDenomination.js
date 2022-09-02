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

function EditDenomination(props) {
    const [id, setID] = useState("");
    const [name_denomination, setName] = useState("");
    const [category_id, setCategory] = useState(undefined);
    const [oneDenomination, setOneDenomination] = useState("");
    const [editDenomination, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const [categories, setCategories] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues:
            {name_denomination: props.updateValue.name_denomination,
                category_id: props.updateValue.category
            }});

    useEffect( () => {
        getCategories();
    }, [])

    let getCategories = async () => {
        await axios.get("http://127.0.0.1:8000/api/categories/").then((actualData) => { setCategories(actualData.data.data) });
    }

    let editDenominationForm = async () => {
        try {
            let res = await axios.patch("http://127.0.0.1:8000/api/denominations/"+ oneDenomination.id, {name_denomination , category_id}, {
                "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            });

            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneDenomination.id);
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
                setOneDenomination({id: props.updateValue.id, name_denomination: props.updateValue.name_denomination , category: props.updateValue.category})
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-denomination-container"
            hideBackdrop
            open={editDenomination}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-denomination-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-denomination" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-type-title">Editer une appelation</Typography>
                <form onSubmit={handleSubmit(editDenominationForm)}>
                    <FormControl>
                          <Controller
                              name="name_denomination"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'name_denomination',
                                       {
                                           required: 'Ce champ est requis',
                                       }
                                   )}
                                   onChange={(e) => setName(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Nom"
                                   variant="standard"
                                   defaultValue={name_denomination}
                                />
                              )}
                            />
                            {errors.name_denomination ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name_denomination?.message}</Alert>
                            ) : ''}
                        <Controller
                            name="category_id"
                            control={control}
                            render={() => (
                                <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                    <InputLabel id="category-select">Categorie</InputLabel>
                                    <Select
                                        labelId="category-select"
                                        id="category-select"
                                        defaultValue={props.updateValue.category.id}
                                        label="Category"
                                        onChange={(e) => setCategory(e.target.value)}
                                        sx={{height: 50}}
                                        variant="outlined"
                                    >
                                        {categories.map((category) => {
                                            return(
                                                <MenuItem key={category.id} value={category.id}>{category.name_category}</MenuItem>
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
export default EditDenomination;
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
    Select, InputLabel
} from "@mui/material";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function NewDenomination(props) {

    const [id, setID] = useState("");
    const [name_denomination, setName] = useState("");
    const [newDenomination, setShowNew] = useState(false);
    const [category_id, setCategory] = useState({})
    const [categories, setCategories] = useState({})
    // Handle Toast event
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues:
            {denomination_name: '',
             category: {}
            }});

    useEffect( () => {
    }, [])

    let reset = () => {
        setName('');
        setCategory('');
    }


    let newDenominationForm = async () => {
        try {
            let res = await axios.post('http://127.0.0.1:8000/api/denominations/', {name_denomination , category_id}, {
                "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            });
            if (res.status === 200) {
                let tab = {};
                await Object.assign(tab, res.data.data);
                let data = update(props.newValue.data, {$push: [{id : tab.id, name_denomination: tab.name_denomination , category : tab.category }]})
                props.handleDataChange(data);
                reset();
                setToastMessage({message: "Appelation ajouté ! Vous pouvez en ajouter une autre", severity: "success"});
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
            await axios.get("http://127.0.0.1:8000/api/categories/").then((actualData) => { setCategories(actualData.data.data) });
            setShowNew(true)
        }}>Ajouter</Button>
        <Modal
            id="modal-denomination-container"
            hideBackdrop
            open={newDenomination}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-denomination-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-denomination" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-type-title">Nouvelle appelation</Typography>
                <form onSubmit={handleSubmit(newDenominationForm)}>
                    <FormControl>
                        <Controller
                          name="name_denomination"
                          control={control}
                          defaultValue=""
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
                               value={name_denomination}
                            />
                          )}
                        />
                        {errors.name ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name_denomination?.message}</Alert>
                        ) : ''}
                        <Controller
                            name="category"
                            control={control}
                            render={() => (
                                <FormControl sx={{ m: 1, mt: 5, minWidth: 120 }} size="small">
                                    <InputLabel id="category-select">Categorie</InputLabel>
                                    <Select
                                        labelId="category-select"
                                        id="category-select"
                                        label="Categorie"
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

export default NewDenomination;
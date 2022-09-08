import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";



function EditCategory(props) {
    const [id, setID] = useState("");
    const [name_category, setName] = useState("");
    const [oneCategory, setOneCategory] = useState("");
    const [editCategory, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {name_category: props.updateValue.name_category} });

    let editCategoryForm = async () => {
        try {
            let updatedCategory = {
                id: id ? id : parseInt(oneCategory.id),
                name_category: oneCategory.name_category ? name_category : oneCategory.name_category,
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/categories/ "+oneCategory.id, {name_category}, {
                "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            });
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneCategory.id);
                let data = update(props.updateValue.data, {[foundIndex]: {$set: updatedCategory}})
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
            onClick={() => {
                setShowEdit(true)
                setOneCategory({id: props.updateValue.id, name_category: props.updateValue.name_category})
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-category-container"
            hideBackdrop
            open={editCategory}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-category-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-category" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-category-title">Editer une categorie</Typography>
                <form onSubmit={handleSubmit(editCategoryForm)}>
                    <FormControl>
                          <Controller
                              name="name_category"
                              control={control}
                              render={() => (
                                  <TextField
                                   {...register(
                                       'name_category',
                                       {
                                           required: 'Ce champ est requis',
                                       }
                                   )}
                                   onChange={(e) => setName(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Nom"
                                   variant="standard"
                                   defaultValue={name_category}
                                />
                              )}
                            />
                            {errors.name_category ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name_category?.message}</Alert>
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
export default EditCategory;
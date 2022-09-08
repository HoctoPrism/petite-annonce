import {
    Box,
    Container,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Carousel from 'react-material-ui-carousel'



function OneAnnonce() {

    const param = useParams();
    const [oneAnnonce, setAnnonce] = useState(false);
    const [images , setImages] = useState([]); // array of
    const [loading, setLoading] = useState(true);
    const [ error , setError ]= useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/annonces/${param.id}`).then((annonce) => {
            setLoading(true)
            setAnnonce(annonce.data);
             getImages()
            setError(null);
        }).catch((err) => {
            setError(err.message);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    let getImages = async () => {
            await axios.get("http://127.0.0.1:8000/api/images").then((actualData) => {
                let array = [] ;
                actualData.data.data.map((data) => {
                    if (oneAnnonce.id === data.annonce.id ) {
                        array = [...array , data]
                    }
                })
                setImages(array);
            });
    }
    return <Container maxWidth="lg" id='oneAnnonce'>
        <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Annonce</Typography>
        {loading ? (
            <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement de l'annonce...</Typography>
        ) : (
        <Box sx={{ display: 'block'}}>
        <Box sx={{ float:"left" }} width="500px">
            <Carousel id='carousel'>
                {images.map(({id , url}) => {
                        return (
                            <Box component="img" src={`http://127.0.0.1:8000/storage/uploads/${url}`}
                                 alt={url} sx={{width: "400px"}} key={id}/>
                        )
                })}
            </Carousel>
        </Box>
        <Box sx={{ float:"right"}} >
           <Box  sx={{ border: "1px solid black" , padding: 3 , margin: 0 }}>
               <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>{oneAnnonce.name_annonce}</Typography>
               <Typography variant="body2" gutterBottom>{oneAnnonce.category.name_category}</Typography>
               <Typography variant="body2" gutterBottom>Package: {oneAnnonce.package.name_package}</Typography>
            <Box>Description:</Box>
            <Box>
                <Box component='span'>{oneAnnonce.description}</Box>
                <Typography variant="body2" gutterBottom>Alcool: {oneAnnonce.volume}°</Typography>
                <Typography variant="body2" gutterBottom>Contenance: {oneAnnonce.contenance}</Typography>
            </Box>
               <Typography variant="body2" gutterBottom>Mis en ligne le: {oneAnnonce.created_at}</Typography>
           </Box>
            <Box  sx={{ border: "1px solid black" , padding: 3 , marginTop: 10 }}>
            <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Informations vendeur</Typography>
            <Box>
                <Box component='span'>{oneAnnonce.user.username}</Box>
                <Button size="small" sx={{ marginLeft: 5 }}>
                    <LocalPhoneIcon />
                    Contacter</Button>
            </Box>
            </Box>
            <Box  sx={{ border: "1px solid black" , padding: 5 , marginTop: 10 , textAlign: "center" }} >
                <Box>
                    <Box component='span'>Prix: {oneAnnonce.price}€</Box>
                    <Button size="small" sx={{ marginLeft: 5 }}>
                        <AddShoppingCartIcon />
                        Acheter</Button>
                </Box>

            </Box>
        </Box>
        </Box>

            )}
    </Container>
}
export default OneAnnonce;
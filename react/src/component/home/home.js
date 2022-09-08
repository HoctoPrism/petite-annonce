import React, {useEffect, useState} from "react";
import { Box, CardHeader, Container, Card, TableContainer, Table, TablePagination } from "@mui/material";
import axios from "axios";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoupeIcon from '@mui/icons-material/Loupe';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import adminMessage from '../../services/auth/adminMessage'

function Home(props) {

    document.title = "Page d'accueil";

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/annonces').then((actualData) => {
            actualData = actualData.data;
            setLoading(true)
            setData(actualData.data);
            setError(null);
        }).catch((err) => {
            setError(err.message);
            setData(null);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return <Container maxWidth="lg" id='home'>
        <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Annonces</Typography>
        {loading ? (
            <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des annonces...</Typography>
        ) : (
            <Box sx={{ maxWidth: '100%' }}>
                <TableContainer sx={{ mt:4 }}>
                    <Table>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({id, name_annonce , description , contenance , volume , created_at , price , category , brand }) => {
                return (
                <Card sx={{ maxWidth: 345 , display: 'inline-block' , marginLeft: 3  }} key={id}>
                    <CardHeader
                        title={ name_annonce }
                    />
                    <CardMedia
                        component="img"
                        height="160"
                        image="https://www.vinotrip.com/fr/blog/wp-content/uploads/2015/10/vinification-vin-rouge.jpg"
                        alt={name_annonce}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div">
                            {category.name_category} - { brand.name_brand }
                        </Typography>
                        <Typography variant="body2">
                            {description.slice(0,40)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {contenance}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {volume}°
                        </Typography>
                        <Typography variant="button" >
                            {price}€
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="secondary">
                                <LocalPhoneIcon />
                            Contacter</Button>
                        <Button size="small" color="secondary" href={`annonce/${id}`}>
                                <LoupeIcon />
                            Voir l'annonce</Button>
                    </CardActions>
                </Card>
            )
        })}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 25, 50]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        )}
        {props.adminMessage ? (
            <adminMessage.AdminMessage adminMessage={props.adminMessage}/>
        ) : null}
</Container>

}
export default Home;
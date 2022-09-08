import React, {useEffect, useState} from "react";
import {
    Box,
    Container,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Alert
} from "@mui/material";
import DeleteAnnonce from "./deleteAnnonce";
import NewAnnonce from "./newAnnonce";
import EditAnnonce from "./editAnnonce";
import axios from "axios";
import AnnonceUser from "./displayUser";

function Annonce() {

    document.title = 'Page des annonces';

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // WIP
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

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

    const handleDataChange = async (dataChange, message) => {
        await setData(dataChange)
        if (message && message === 'edit'){
            setToastMessage({message: "Annonce modifié !", severity: "success"});
            setShowToast(true);
        } else if(message && message === 'delete') {
            setToastMessage({message: "Annonce supprimé !", severity: "success"});
            setShowToast(true);
        }
    }

    return <Container maxWidth="xl" id="annonce">
        <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 10}}>
            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Annonces</Typography>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des annonces...</Typography>
            ) : (
                <Box sx={{ maxWidth: '100%' }}>
                    <NewAnnonce newValue={{data}} handleDataChange={handleDataChange} />
                    <TableContainer sx={{ mt:4 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell key={1}>ID</TableCell>
                                    <TableCell key={2}>Nom</TableCell>
                                    <TableCell key={3}>Description</TableCell>
                                    <TableCell key={4}>Price</TableCell>
                                    <TableCell key={5}>Contenance</TableCell>
                                    <TableCell key={6}>Volume</TableCell>
                                    <TableCell key={7}>Package</TableCell>
                                    <TableCell key={8}>Marque</TableCell>
                                    <TableCell key={9}>Categorie</TableCell>
                                    <TableCell key={10}>Utilisateur</TableCell>
                                    <TableCell key={11} align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({id, name_annonce, description, price, contenance, volume, package_id, brand, category, user}) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={name_annonce+id}>
                                            <TableCell>{id}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>{name_annonce}</TableCell>
                                            <TableCell>{description}</TableCell>
                                            <TableCell>{price}</TableCell>
                                            <TableCell>{contenance}</TableCell>
                                            <TableCell>{volume}</TableCell>
                                            <TableCell>{package_id ? package_id.name_package : '--'}</TableCell>
                                            <TableCell>{brand ? brand.name_brand : '--'}</TableCell>
                                            <TableCell>{category ? category.name_category : '--'}</TableCell>
                                            <TableCell>{user ? <AnnonceUser display={{id, user}} /> : '--'}</TableCell>
                                            <TableCell>
                                                <Box sx={{display: 'flex', justifyContent: 'right'}}>
                                                    <EditAnnonce updateValue={{id, name_annonce, description, price, contenance, volume, package_id, brand, category, user, data}} handleDataChange={handleDataChange} />
                                                    <DeleteAnnonce deleteValue={{id, name_annonce, description, price, contenance, volume, package_id, brand, category, user, data}} handleDataChange={handleDataChange}/>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            )}
        </Paper>

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
    </Container>
}

export default Annonce;
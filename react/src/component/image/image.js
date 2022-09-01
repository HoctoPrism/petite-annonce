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
import DeleteImage from "./deleteImage";
import NewImage from "./newImage";
import EditImage from "./editImage";
import axios from "axios";
import ImageAnnonce from "./displayAnnonce";

function Image() {

    document.title = 'Page des images';

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
        axios.get('http://127.0.0.1:8000/api/images').then((actualData) => {
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
            setToastMessage({message: "Image modifiée !", severity: "success"});
            setShowToast(true);
        } else if(message && message === 'delete') {
            setToastMessage({message: "Image supprimée !", severity: "success"});
            setShowToast(true);
        }
    }

    return <Container maxWidth="md" id="image">
        <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 10}}>
            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Images</Typography>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des images...</Typography>
            ) : (
                <Box sx={{ maxWidth: '100%' }}>
                    <NewImage newValue={{data}} handleDataChange={handleDataChange} />
                    <TableContainer sx={{ mt:4 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell key={1}>ID</TableCell>
                                    <TableCell key={2}>Url</TableCell>
                                    <TableCell key={3}>Annonce</TableCell>
                                    <TableCell key={4} align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({id, url, annonce}) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={url+id}>
                                            <TableCell>{id}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>
                                                { url ? (
                                                    <Box component="img" src={`http://127.0.0.1:8000/storage/uploads/${url}`} alt={url} sx={{ width: "80px" }}/>
                                                ) : (
                                                    '--'
                                                ) }
                                            </TableCell>
                                            <TableCell>{annonce ? <ImageAnnonce display={{id, annonce}} /> : '--'}</TableCell>
                                            <TableCell>
                                                <Box sx={{display: 'flex', justifyContent: 'right'}}>
                                                    <EditImage updateValue={{id, url, annonce, data}} handleDataChange={handleDataChange} />
                                                    <DeleteImage deleteValue={{id, url, annonce, data}} handleDataChange={handleDataChange}/>
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

export default Image;
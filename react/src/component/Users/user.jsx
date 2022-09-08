import React, {useEffect, useState} from "react";
import {
    Box,
    Container,
    Paper,
    Snackbar,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TablePagination,
    TableRow,
    Typography,
    Alert
} from "@mui/material";
import axios from "axios";

function User() {

    document.title = 'Page des users';

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
        axios.get('http://127.0.0.1:8000/api/users', {
            "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            }
            ).then((actualData) => {

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
    return <Container maxWidth="md" id="type">
        <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 10}}>
            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Users de voiture</Typography>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des user...</Typography>
            ) : (
                <Box sx={{ maxWidth: '100%' }}>
                    <TableContainer sx={{ mt:4 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell key={1}>ID</TableCell>
                                    <TableCell key={2}>email</TableCell>
                                    <TableCell key={3}>lastname</TableCell>
                                    <TableCell key={4}>firstname</TableCell>
                                    <TableCell key={5}>roles</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({id, email, lastname, firstname, roles }) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={email+id}>
                                            <TableCell>{id}</TableCell>
                                            <TableCell>{email}</TableCell>
                                            <TableCell>{lastname}</TableCell>
                                            <TableCell>{firstname}</TableCell>
                                            <TableCell>{roles}</TableCell>
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

export default User;
import React, { useEffect, useState } from "react";
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
  Alert,
} from "@mui/material";
import DeleteAddress from "./deleteAddress";
import NewAddress from "./newAddress";
import EditAddress from "./editAddress";
import axios from "axios";
import AddressUser from "./displayUser";

function Address() {
  document.title = "Page des address";

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
    axios
      .get("http://127.0.0.1:8000/api/addresses")
      .then((actualData) => {
        actualData = actualData.data;
        setLoading(true);
        setData(actualData.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDataChange = async (dataChange, message) => {
    await setData(dataChange);
    if (message && message === "edit") {
      setToastMessage({ message: "Adresse modifiée !", severity: "success" });
      setShowToast(true);
    } else if (message && message === "delete") {
      setToastMessage({ message: "Adresse supprimée !", severity: "success" });
      setShowToast(true);
    }
  };

  return (
    <Container maxWidth="xl" id="address">
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          py: 10,
        }}
      >
        <Typography variant="h3" sx={{ textAlign: "center" }} gutterBottom>
          Adresse d'utilisateur
        </Typography>
        {loading ? (
          <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>
            Chargement des adresses...
          </Typography>
        ) : (
          <Box sx={{ maxWidth: "100%" }}>
            <NewAddress
              newValue={{ data }}
              handleDataChange={handleDataChange}
            />
            <TableContainer sx={{ mt: 4 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell key={1}>ID</TableCell>
                    <TableCell key={2}>Adresse</TableCell>
                    <TableCell key={3}>Code Postal</TableCell>
                    <TableCell key={4}>Pays</TableCell>
                    <TableCell key={5}>Ville</TableCell>
                    <TableCell key={6}>phone</TableCell>
                    <TableCell key={7}>User</TableCell>
                    <TableCell key={8} align={"right"}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                      ({ id, user, address, postal_code, country, city, phone}) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={country + id}
                          >
                            <TableCell>{id}</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              {address}
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              {postal_code}
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              {country}
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              {city}
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              {phone}
                            </TableCell>
                            <TableCell>{user ? <AddressUser display={{id, user}} /> : '--'}</TableCell>

                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "right",
                                }}
                              >
                                <EditAddress
                                  updateValue={{
                                    id,
                                    address,
                                    postal_code,
                                    country,
                                    city,
                                    phone,
                                    data,
                                    user,
                                  }}
                                  handleDataChange={handleDataChange}
                                />
                                <DeleteAddress
                                  deleteValue={{
                                    id,
                                    address,
                                    postal_code,
                                    country,
                                    city,
                                    phone,
                                    data,
                                  }}
                                  handleDataChange={handleDataChange}
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
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
    </Container>
  );
}

export default Address;

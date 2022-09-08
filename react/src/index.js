import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.css';
import './assets/css/component/_partials/_theme.scss';

import {Provider} from 'react-redux';
import store from './store'

import auth from './services/auth/token'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import {lightTheme} from "./component/_partials/_theme/_lightTheme";
import {darkTheme} from "./component/_partials/_theme/_darkTheme";
import {ColorContext, setThemeToStorage} from "./component/_partials/_theme/_colorContext";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";

import App from './App';
import Home from "./component/home/home";
import {Navbar} from "./component/_partials/_navbar/_navbar";
import {Footer} from "./component/_partials/_footer/_footer";
import Login from './services/auth/login';
import Logout from './services/auth/logout';
import Register from "./services/auth/register";
import Package from "./component/package/package";
import Image from "./component/image/image";
import Brand from "./component/brand/brand";
import Category from "./component/category/category";
import Denomination from "./component/denomination/denomination";
import Annonce from "./component/annonce/annonce";

function CustomTheme() {

    const [mode, setMode] = React.useState("light");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
                setThemeToStorage();
            },
        }),
        []
    );
    const theme = React.useMemo(
        () => createTheme(mode === "light" ? lightTheme : darkTheme),
        [mode]
    );

    useEffect(() => {
        // rend le thème persistant après reload
        const mode = localStorage.getItem("isDarkMode");
        if (mode) {
            setMode(mode);
        }
    }, []);

    let loggedAndAdmin = auth.getToken() && auth.getRoles() === 'ROLE_ADMIN';

    return <ColorContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <Navbar/>
            <App/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home/>}>Accueil</Route>
                    <Route exact path="login" element={auth.getToken() ? <Home adminMessage='alreadyLogged'/> : <Login/> }>Login</Route>
                    <Route exact path="register" element={<Register/>}>Inscription</Route>
                    <Route exact path="logout" element={<Logout/>}>Logout</Route>
                    <Route exact path="brand" element={loggedAndAdmin ? <Brand/> : <Home adminMessage='unauthorizedRole'/> }>Marque</Route>
                    <Route exact path="category" element={loggedAndAdmin ? <Category/> : <Home  adminMessage='unauthorizedRole'/>}>Categorie</Route>
                    <Route exact path="denomination" element={loggedAndAdmin ? <Denomination/> : <Home adminMessage='unauthorizedRole'/>}>Denomination</Route>
                    <Route exact path="package" element={loggedAndAdmin ? <Package/> : <Home  adminMessage='unauthorizedRole'/>}>Package</Route>
                    <Route exact path="image" element={loggedAndAdmin ? <Image/> : <Home  adminMessage='unauthorizedRole'/>}>Image</Route>
                    <Route exact path="annonce" element={loggedAndAdmin ? <Annonce/> : <Home  adminMessage='unauthorizedRole'/>}>Annonce</Route>
                    <Route path="*" element={
                        <div>
                            <p>Il n'y a rien ici !</p>
                            <p>:'(</p>
                        </div>
                    }/>
                </Routes>
            </BrowserRouter>
            <Footer />
        </ThemeProvider>
    </ColorContext.Provider>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <CustomTheme/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react'
import { useSelector } from 'react-redux'
import {Button} from "@mui/material";

function LoginButton() {

  const loggedIn = useSelector((state) => state.loggedIn.value)

  return (
    <div>
        <Button href={ loggedIn ? 'logout' : 'login' } color="secondary">{ loggedIn ? 'DECONNEXION' : 'CONNEXION' }</Button>
    </div>
  )
}

export default LoginButton
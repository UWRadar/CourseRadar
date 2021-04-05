import React, {Component} from "react"
import {Dialog, DialogTitle, Button} from '@material-ui/core'
import {motion} from 'framer-motion';
import TextField from '@material-ui/core/TextField';
import Header from "../general/Header"
import "./LoginPage.css"
function LoginPage(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleLoginClick = () => {

    }

    const handlePasswordChange = () => {

    }

    const handleUsernameChange = () => {

    }
    
    const handleSignUpClick = () => {

    }
    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title" 
            open={open}
            fullWidth={true}
        > 
            <Header/>
            <motion.div id="mainPage">
                
                <img src="./img/logo.png" id="logo" alt="Logo for Club" />
                <div class="input">
                    <TextField
                        autoFocus
                        margin="normal"
                        id="username"
                        label="Email Address"
                        type="email"
                        variant="filled"
                        
                        onChange={handleUsernameChange}
                    />
                </div>
                <div class="input">
                    <TextField
                        autoFocus
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        variant="filled"
                        onChange={handlePasswordChange}
                    />
                </div>
                <Button variant="contained" id="loginButton" onClick={handleLoginClick}> Login </Button>
                <div id="signUpDiv">
                    <Button size="small" variant="default" id="signUpButton" onClick={handleSignUpClick}> Sign up </Button>
                </div>
                
            </motion.div>


        </Dialog>
    )
}

export default LoginPage;
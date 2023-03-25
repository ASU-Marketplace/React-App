import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useNavigate} from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const path = window.location.pathname

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      ).then(routeChange);
      console.log(user);
    } catch (error) {
      console.log(error.message);
      setErrorVisible(true);
      setOpen(true);
      setErrorMessage(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <BoxContainer>
        <FormContainer>
          <Input type="email" placeholder="Your ASU E-mail"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }} />
          <Input type="password" placeholder="Password"  
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }} />
        </FormContainer>
        <Marginer direction="vertical" margin={30} />
        <MutedLink href="#">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />

        <SubmitButton type="submit" onClick={login}>Sign In</SubmitButton>
        
        <Marginer direction="vertical" margin="1em" />
        <MutedLink href="#">
          Don't have an account?{" "}
          <BoldLink href="#" onClick={switchToSignup}>
            Sign up Here!
          </BoldLink>
        </MutedLink>
      </BoxContainer>
      {isErrorVisible && <Snackbar open={open} message={errorMessage} onClose={handleClose} autoHideDuration={6000} action={action}/>}
    </div>
  );
}
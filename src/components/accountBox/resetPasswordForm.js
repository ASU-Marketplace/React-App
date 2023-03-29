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
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export function ResetPasswordForm(props) {
  const { switchToSignin, switchToSignup, switchToReset } = useContext(AccountContext);
  const path = window.location.pathname

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/accountSignUp`; 
    navigate(path);
  }

  const [resetEmail, setResetEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");

  const [user, setUser] = useState({});
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const resetPassword = async () => {
    if (resetEmail === confirmedEmail) {
      try {
        const user = await sendPasswordResetEmail(
          auth,
          resetEmail,
        ).then(routeChange);
        console.log(user);
      } catch (error) {
        console.log(error.message);
        setErrorVisible(true);
        setOpen(true);
        setErrorMessage(error.message);
      }
    } else {
      setOpen(true);
      setErrorVisible(true);
      setErrorMessage("E-mails do not match!");
      return;
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
        onClick={handleClose}>
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
              setResetEmail(event.target.value);
            }} />
          <Input type="email" placeholder="Confirm E-mail"  
            onChange={(event) => {
              setConfirmedEmail(event.target.value);
            }} />
        </FormContainer>
        <Marginer direction="vertical" margin={30} />

        <SubmitButton type="submit" onClick={resetPassword}>Reset Password</SubmitButton>
        
        <Marginer direction="vertical" margin="1em" />
        <MutedLink href="#">
          Don't have an account?{" "}
          <BoldLink href="#" onClick={switchToSignup}>
            Sign up Here!
          </BoldLink>
        </MutedLink>
        <MutedLink href="#">
          Got your password?{" "}
          <BoldLink href="#" onClick={switchToSignin}>
            Sign in Here!
          </BoldLink>
        </MutedLink>
      </BoxContainer>
      {isErrorVisible && <Snackbar open={open} message={errorMessage} onClose={handleClose} autoHideDuration={6000} action={action}/>}
    </div>
  );
}
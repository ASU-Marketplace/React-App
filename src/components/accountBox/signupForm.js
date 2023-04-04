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
import { useNavigate, Link} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Add from "../../images/addAvatar.png";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
 
  const [user, setUser] = useState({});
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const [isErrorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (confirmedPassword === registerPassword) {
      if (registerEmail.endsWith("@asu.edu")) {
        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          ).then(routeChange);

          const date = new Date().getTime();
          const storageRef = ref(storage, `${registerName + date}`);

          await uploadBytesResumable(storageRef).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                //Update profile
                await updateProfile(res.user, {
                  displayName: registerName,
                  //photoURL: downloadURL,
                });
                //create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName: registerName,
                  email: registerEmail,
                  //photoURL: downloadURL,
                });
    
                //create empty user chats on firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
              } catch (err) {
                console.log(err);
                setErrorVisible(true);
                setLoading(false);
              }
            });
          });
          console.log(user);     
        } catch (error) {
          console.log(error.message);
          setErrorVisible(true);
          setOpen(true);
          setErrorMessage(error.message);
          setLoading(false);
        }
      } else {
        setOpen(true);
        setErrorVisible(true);
        setErrorMessage("E-mail must be a valid ASU E-mail!");
        return;
      }
    } else {
      setOpen(true);
      setErrorVisible(true);
      setErrorMessage("Passwords do not match!");
      return;
    }
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
    <>
      <BoxContainer>
        <FormContainer>
          <Input required type="text" placeholder="Full Name" onChange={(event) => {
            setRegisterName(event.target.value);
          }}/>          
          <Input required type="email" placeholder="Your ASU E-mail" onChange={(event) => {
            setRegisterEmail(event.target.value);
          }} />
          <Input required type="password" placeholder="Password" onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}/>
          <Input required type="password" placeholder="Confirm Password" onChange={(event) => {
              setConfirmedPassword(event.target.value);
            }}/>
          {/* <Input required style={{ display: "none" }} type="file" id="file" onChange={(event) => {
              setAvatar(event.target.value); }} />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label> */}
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <SubmitButton disabled={loading} type="submit" onClick={register}>Sign Up</SubmitButton>

        <Marginer direction="vertical" margin="1em" />
        <span>
          <MutedLink href="#">Already have an account?</MutedLink>
          <BoldLink href="#" onClick={switchToSignin}>Sign in Here!</BoldLink>
        </span>
      </BoxContainer>
      {/* {loading && "Uploading and compressing the image please wait..."} */}
      {isErrorVisible && <Snackbar open={open} message={errorMessage} onClose={handleClose} autoHideDuration={6000} action={action}/>}
    </> 
  );
};

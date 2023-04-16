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
import Add from "../../images/user.png";

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

  const [isErrorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confPassword = e.target[3].value;
    const file = e.target[4].files[0];

    if (confPassword === password) {
      if (email.endsWith("@asu.edu")) {
        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          const date = new Date().getTime();
          const storageRef = ref(storage, `${registerName + date}`);

          await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                //Update profile
                await updateProfile(res.user, {
                  displayName: displayName,
                  photoURL: downloadURL,
                });
                //create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName: displayName,
                  email: email,
                  photoURL: downloadURL,
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
          //console.log(user);     
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
        <form onSubmit={register}>
        <Input required type="text" placeholder="display name" />
          <Input required type="text" placeholder="email" />
          <Input required type="password" placeholder="password" />
          <Input required type="password" placeholder="password" />
          <input  style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
          <Marginer direction="vertical" margin={10} />
            <span style={{fontSize: "12px", color: "rgba(68,65,66,0.8)", weight: "500", 
            marginTop:"50px", marginLeft:"10px", marginBottom:"20px", float:"none"}}>
                Upload a profile picture!</span>
              <img src={Add} alt="" style={{width: "20%", marginRight: "10px", marginBottom:"5px", 
              float: "right", cursor:"pointer"}}/>
          </label>
        <SubmitButton disabled={loading}>Sign up</SubmitButton>
        </form>
        <Marginer direction="vertical" margin={10} />
        {/* <Marginer direction="vertical" margin="1em" /> */}
        <span>
          <MutedLink href="#">Already have an account?</MutedLink>
          <BoldLink href="#" onClick={switchToSignin}>Sign in Here!</BoldLink>
        </span>
        <Marginer direction="vertical" margin="1em" />
      </BoxContainer>
      {loading && <Snackbar open={open} message={"Uploading image..."} onClose={handleClose} autoHideDuration={6000} action={action}/>}
      {isErrorVisible && <Snackbar open={open} message={errorMessage} onClose={handleClose} autoHideDuration={6000} action={action}/>}
    </> 
  );
};

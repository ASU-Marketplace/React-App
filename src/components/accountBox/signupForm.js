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
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Add from "../../images/addAvatar.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
 
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [isErrorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState({});

  const date = new Date().getTime();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  // const register = async () => {
  //   if (confirmedPassword === registerPassword) {
  //     if (registerEmail.endsWith("@asu.edu")) {
  //       try {
  //         const user = await createUserWithEmailAndPassword(
  //           auth,
  //           registerEmail,
  //           registerPassword
  //         ).then(routeChange);     
  //         console.log(user);     
  //       } catch (error) {
  //         console.log(error.message);
  //         setErrorVisible(true);
  //         setOpen(true);
  //         setErrorMessage(error.message);
  //       }
  //     } else {
  //       setOpen(true);
  //       setErrorVisible(true);
  //       setErrorMessage("E-mail must be a valid ASU E-mail!");
  //       return;
  //     }
  //   } else {
  //     setOpen(true);
  //     setErrorVisible(true);
  //     setErrorMessage("Passwords do not match!");
  //     return;
  //   }
  // };

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
          <Input type="text" placeholder="Full Name" onChange={(event) => {
            setRegisterName(event.target.value);
          }}/>          
          <Input type="email" placeholder="Your ASU E-mail" onChange={(event) => {
            setRegisterEmail(event.target.value);
          }} />
          <Input type="password" placeholder="Password" onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}/>
          <Input type="password" placeholder="Confirm Password" onChange={(event) => {
              setConfirmedPassword(event.target.value);
            }}/>
          <Input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit" onClick={handleSubmit}>Sign Up</SubmitButton>

        <Marginer direction="vertical" margin="1em" />
        <MutedLink href="#">
          Already have an account?
          <BoldLink href="#" onClick={switchToSignin}>
            Sign in Here!
          </BoldLink>
        </MutedLink>
      </BoxContainer>

      {isErrorVisible && <Snackbar open={open} message={errorMessage} onClose={handleClose} autoHideDuration={6000} action={action}/>}
    </div> 
  );
}
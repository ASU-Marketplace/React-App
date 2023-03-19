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
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

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

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      ).then((user) => {
        user.updateProfile({
          displayName: registerName,
        })
      });
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" onChange={(event) => {
          setRegisterName(event.target.value);
        }}/>          
        <Input type="email" placeholder="Your ASU E-mail" onChange={(event) => {
          setRegisterEmail(event.target.value);
        }} />
        <Input type="password" placeholder="Password" 
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}/>
        {/* <Input type="password" placeholder="Confirm Password" /> */}
      </FormContainer>
      <Marginer direction="vertical" margin={10} />

      <SubmitButton type="submit" onClick={register}>Sign Up</SubmitButton>

      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Sign in Here!
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

import React, { useContext } from "react";
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
import { Link, useMatch, useResolvedPath, useNavigate} from "react-router-dom"

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const path = window.location.pathname

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="ASU-Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />

      <SubmitButton type="submit" onClick={routeChange}>Sign In</SubmitButton>
      
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign up Here!
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
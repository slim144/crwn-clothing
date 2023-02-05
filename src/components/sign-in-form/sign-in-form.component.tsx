import { ChangeEvent, FormEvent, useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormField = {
  email: "",
  password: "",
};

function SignInForm() {
  const [formField, setFormField] = useState(defaultFormField);
  const { email, password } = formField;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormField(defaultFormField);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormField((currField) => {
      return {
        ...currField,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.USER_DELETED:
          alert("User does not exist");
          break;
        case AuthErrorCodes.INVALID_PASSWORD:
          alert("Incorrect password");
          break;
        default:
          console.log(AuthErrorCodes);
      }
    }
  };

  const logGoogleUser = async () => {
    dispatch(googleSignInStart());
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="text"
          onChange={handleChange}
          value={email}
          name="email"
        />
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          value={password}
          name="password"
        />
        <ButtonsContainer>
          <Button type="submit">SIGN IN</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={logGoogleUser}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}

export default SignInForm;

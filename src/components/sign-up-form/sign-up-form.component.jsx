import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  const [formField, setFormField] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formField;

  const resetFormFields = () => {
    setFormField(defaultFormField);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField((currField) => {
      return {
        ...currField,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password does not match.");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
      console.log("User creation encountered an error", error);
    }
  };

  return (
    <SignUpContainer>
      {" "}
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          value={displayName}
          name="displayName"
        />
        <FormInput
          label="Email"
          required
          type="email"
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
        <FormInput
          label="Confirm Password"
          required
          type="password"
          onChange={handleChange}
          value={confirmPassword}
          name="confirmPassword"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
}

export default SignUpForm;

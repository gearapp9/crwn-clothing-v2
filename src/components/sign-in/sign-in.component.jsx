import { useState } from "react";
import {
  createAuthUserWithEmailAndPass,
  createUserDocFromAuth,
  signWithGoogle,
  singInAuthUserWithEmailAndPass,
} from "../../utils/firebase.util";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFeilds = () => {
    setFormFields(defaultFormFields);
  };

  const singInWithGoogle = async () => {
    const { user } = await signWithGoogle();
    await createUserDocFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await singInAuthUserWithEmailAndPass(email, password);
      console.log(response);
      resetFeilds();
    } catch (error) {
      alert("something went wrong");
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={singInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

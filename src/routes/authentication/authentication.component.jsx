// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import {
  auth,
  createUserDocFromAuth,
  signWithGoogle,
  //   signWithGoogleRedirect,
} from "../../utils/firebase.util";

import './authentication.styles.scss';

const Authentication = () => {
  //signing in with redirect and creating user
  //   useEffect(async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);
  //     if (response) {
  //       const userDocRef = await createUserDocFromAuth(response.user);
  //       console.log(userDocRef);
  //     }
  //   }, []);

 

  return (
    <div className='authentication-container'>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Authentication;

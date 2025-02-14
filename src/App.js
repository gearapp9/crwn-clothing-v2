import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
  getUser,
} from "./utils/firebase.util";
import { checkUser, setCurrentUser } from "./store/user/user-actions";

const App = () => {
  const disptach = useDispatch();

  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) createUserDocFromAuth(user);
    //   disptach(setCurrentUser(user));
    // });
    // return unsubscribe;
    // getUser().then((data) => console.log("d",data));
    disptach(checkUser())
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

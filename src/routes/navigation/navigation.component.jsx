import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import {
  LogoContainer,
  NavLink,
  NavLinks,
  NavigationContainer,
} from "./navigation.styles.jsx";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useSelector , useDispatch} from "react-redux";
import { selectCurrentUser } from "../../store/user/user-selector.js";
import { selectIsCartOpen } from "../../store/cart/cart-selector.js";
import { signout } from "../../store/user/user-actions.js";

const Navigation = () => {

  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser)
  const  cartIsVisible  = useSelector(selectIsCartOpen);
  const signOutUser = ()=>dispatch(signout())

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              Sign out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign-in</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {cartIsVisible && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

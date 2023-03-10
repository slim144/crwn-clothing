import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import {
  NavigationContainer,
  NavLogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

function NavigationBar() {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOutStart());
  };
  return (
    <>
      <NavigationContainer>
        <NavLogoContainer to="/">
          <CrwnLogo className="logo" />
        </NavLogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as={"span"} onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
}

export default NavigationBar;

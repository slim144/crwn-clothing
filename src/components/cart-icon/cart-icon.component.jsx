import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount,
} from "./cart-icon.styles.jsx";

function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>
        {cartItems.reduce(
          (accumulator, currentItem) => accumulator + currentItem.quantity,
          0
        )}
      </ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;

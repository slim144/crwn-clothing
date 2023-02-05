import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";

import { selectCartItems } from "../../store/cart/cart.selector";
import { CategoryItem } from "../../store/categories/categories.types";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { ProductCardContainer, Footer } from "./product-card.styles";

type ProductCardProps = {
  product: CategoryItem;
};

function ProductCard({ product }: ProductCardProps) {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to Cart
      </Button>
    </ProductCardContainer>
  );
}

export default ProductCard;

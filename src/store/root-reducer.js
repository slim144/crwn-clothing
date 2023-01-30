import { cartReducer } from "./cart/cart.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = {
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
};

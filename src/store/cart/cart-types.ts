import { CategoryItem } from "../categories/categories-types";

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = "SET_CART_ITEMS",
  SET_CART_VISIBILITY = "SET_CART_VISIBILITY",
}

export type CartItem = CategoryItem & {
  quantity: number;
};

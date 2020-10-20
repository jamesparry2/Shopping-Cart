import { IRootState } from "..";

export const selectItems = ({ shoppingCart }: IRootState) => shoppingCart.items;

export const selectBasket = ({ shoppingCart }: IRootState) => shoppingCart.basket;
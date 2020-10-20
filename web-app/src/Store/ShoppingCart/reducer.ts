import {
  IGetItemsAction,
  IShoppingCartState,
  ShoppingCartTypes,
  IAddItemAction,
  IDeleteItemAction,
  IDeleteAllItemsAction,
  IToggleItemDiscountAction,
  Item,
  IPostOrdersSuccessAction,
  IPostOrdersErrorAction,
} from "./types";

const init: IShoppingCartState = {
  items: [],
  basket: [],
};

type TShoppingCartActions =
  | IGetItemsAction
  | IAddItemAction
  | IDeleteItemAction
  | IDeleteAllItemsAction
  | IToggleItemDiscountAction
  | IPostOrdersSuccessAction
  | IPostOrdersErrorAction;

export const shoppingCartReducer = (
  state: IShoppingCartState = init,
  action: TShoppingCartActions
): IShoppingCartState => {
  switch (action.type) {
    case ShoppingCartTypes.GET_ITEMS:
      return {
        ...state,
        items: [...action.payload],
      };
    case ShoppingCartTypes.ADD_ITEM: {
      const _basket = state.basket;
      return {
        ...state,
        basket: _basket.concat(action.payload),
      };
    }
    case ShoppingCartTypes.DELETE_ITEM: {
      const _basket = state.basket.filter(
        (item: Item) => item.id !== action.payload
      );
      return {
        ...state,
        basket: _basket,
      };
    }
    case ShoppingCartTypes.DELETE_ITEMS:
      return {
        ...state,
        basket: [],
      };
    case ShoppingCartTypes.TOGGLE_DISCOUNT: {
      const _basket = state.basket.map((element: Item) =>
        findAndUpdateItemDiscount(element, action.payload)
      );

      return {
        ...state,
        basket: _basket,
      };
    }
    case ShoppingCartTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
};

// This would most defo require a unit test
const findAndUpdateItemDiscount = (item: Item, itemToUpdate: Item) =>
  item.id === itemToUpdate.id
    ? {
        ...itemToUpdate,
        price: !itemToUpdate.discount.hasBeenApplied
          ? formatDiscountPrice(item.price, item.discount.percentage)
          : item.discount.previousValue,
        discount: {
          ...itemToUpdate.discount,
          hasBeenApplied: !itemToUpdate.discount.hasBeenApplied,
          previousValue: item.price,
        },
      }
    : item;

const formatDiscountPrice = (price: number, percentage: number): number => {
  const percentageOff = percentage / 100;
  const princeDiff = price * percentageOff;
  return price - princeDiff;
};

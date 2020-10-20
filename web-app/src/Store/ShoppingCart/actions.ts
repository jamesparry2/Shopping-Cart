import { Dispatch } from "react";
import * as localStorage from "../../Utils/localStorage";
import {
  IGetItemsAction,
  IAddItemAction,
  AddItemActionArgs,
  IDeleteItemAction,
  RemoveItemActionArgs,
  IDeleteAllItemsAction,
  ShoppingCartTypes,
  IToggleItemDiscountAction,
  ToggleItemActionArgs,
  IPostOrdersSuccessAction,
  IPostOrdersErrorAction,
  Item,
} from "./types";
import axios from "axios";

const localStorageBasketId = "local_storage_basket_key";

export const GetItems = () => {
  return async (dispatch: Dispatch<IGetItemsAction>) => {
    const response = await axios.get("https://localhost:44358/api/items");
    dispatch({
      type: ShoppingCartTypes.GET_ITEMS,
      payload: response.data,
    });
  };
};

export const CreateOrder = (items: Item[]) => {
  return async (
    dispatch: Dispatch<IPostOrdersSuccessAction | IPostOrdersErrorAction>
  ) => {
    const response = await axios.post(
      "https://localhost:44358/api/orders",
      items
    );

    if (response.status === 200) {
      dispatch({
        type: ShoppingCartTypes.CREATE_ORDER_SUCCESS,
      });
    } else {
      dispatch({
        type: ShoppingCartTypes.CREATE_ORDER_ERROR,
      });
    }
  };
};

export const AddItemToBasketAction = ({
  item,
}: AddItemActionArgs): IAddItemAction => {
  localStorage.appendToStorage(localStorageBasketId, item);
  return {
    type: ShoppingCartTypes.ADD_ITEM,
    payload: item,
  };
};

export const RemoveItemFromBasketAction = (
  payload: RemoveItemActionArgs
): IDeleteItemAction => ({
  type: ShoppingCartTypes.DELETE_ITEM,
  payload: payload.id,
});

export const RemoveAllItemsFromBasketAction = (): IDeleteAllItemsAction => ({
  type: ShoppingCartTypes.DELETE_ITEMS,
});

export const ApplyDiscountToItemAction = ({
  item,
}: ToggleItemActionArgs): IToggleItemDiscountAction => ({
  type: ShoppingCartTypes.TOGGLE_DISCOUNT,
  payload: item,
});

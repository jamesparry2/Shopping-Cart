// Model Definitions
export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUri: string;
  discount: Discount;
}

export interface Discount {
  id: number;
  percentage: number;
  previousValue: number;
  hasBeenApplied: boolean;
  hasBeenUsed: boolean;
}

// Reducer Definitions
export interface IShoppingCartState {
  items: Item[];
  basket: Item[];
}

// Action Definitions
export enum ShoppingCartTypes {
  GET_ITEMS = "GET_ITEMS",
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "REMOVE_ITEM",
  DELETE_ITEMS = "REMOVE_ITEMS",
  TOGGLE_DISCOUNT = "TOGGLE_DISCOUNT",
  CREATE_ORDER = "CREATE_ORDER",
  CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS",
  CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR",
}

export interface IShoppingCartBaseAction {
  type: ShoppingCartTypes;
}

export interface IAddItemAction extends IShoppingCartBaseAction {
  type: ShoppingCartTypes.ADD_ITEM;
  payload: Item;
}

export interface IDeleteItemAction extends IShoppingCartBaseAction {
  type: ShoppingCartTypes.DELETE_ITEM;
  payload: number;
}

export interface IDeleteAllItemsAction extends IShoppingCartBaseAction {
  type: ShoppingCartTypes.DELETE_ITEMS;
}

export interface IGetItemsAction extends IShoppingCartBaseAction {
  type: ShoppingCartTypes.GET_ITEMS;
  payload: Item[];
}

export interface IToggleItemDiscountAction extends IShoppingCartBaseAction {
  type: ShoppingCartTypes.TOGGLE_DISCOUNT;
  payload: Item;
}

export interface IPostOrdersSuccessAction extends IShoppingCartBaseAction {
  type: ShoppingCartTypes.CREATE_ORDER_SUCCESS;
}

export interface IPostOrdersErrorAction extends IShoppingCartBaseAction {
  type: ShoppingCartTypes.CREATE_ORDER_ERROR;
}

export interface AddItemActionArgs {
  item: Item;
}

export interface RemoveItemActionArgs {
  id: number;
}

export interface ToggleItemActionArgs {
  item: Item;
}

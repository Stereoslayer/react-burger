import {TIngredientType} from "../../utils/types";

export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const DELETE_ALL_ITEMS: 'DELETE_ALL_ITEMS' = 'DELETE_ALL_ITEMS';
export const SORT_ITEMS: 'SORT_ITEMS' = 'SORT_ITEMS';

export interface IAddItemAction {
    readonly type: typeof ADD_ITEM;
    payload: TIngredientType;
}

export interface IDeleteItemAction {
    readonly type: typeof DELETE_ITEM;
    payload: number;
}

export interface IDeleteAllItemsAction {
    readonly type: typeof DELETE_ALL_ITEMS;
}

export interface ISortItemsAction {
    readonly type: typeof SORT_ITEMS;
    payload: Array<TIngredientType>;
}

export type TItemActions = IAddItemAction | IDeleteItemAction | IDeleteAllItemsAction | ISortItemsAction;
export const SHOW_ING_DETAILS: 'SHOW_ING_DETAILS' = 'SHOW_ING_DETAILS';
export const HIDE_ING_DETAILS: 'HIDE_ING_DETAILS' = 'HIDE_ING_DETAILS';
export const SHOW_ORDER_DETAILS: 'SHOW_ORDER_DETAILS' = 'SHOW_ORDER_DETAILS';
export const HIDE_ORDER_DETAILS: 'HIDE_ORDER_DETAILS' = 'HIDE_ORDER_DETAILS';

export interface IShowIngDetailsAction {
    readonly type: typeof SHOW_ING_DETAILS;
    payload: any;
}

export interface IHideIngDetailsAction {
    readonly type: typeof HIDE_ING_DETAILS;
}

export interface IShowOrderDetailsAction {
    readonly type: typeof SHOW_ORDER_DETAILS;
}

export interface IHideOrderDetailsAction {
    readonly type: typeof HIDE_ORDER_DETAILS;
}

export type TIngDetailsActions =
    IShowIngDetailsAction
    | IHideIngDetailsAction;

export type TOrderDetailsActions =
    IShowOrderDetailsAction
    | IHideOrderDetailsAction;

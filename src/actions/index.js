import {
  SET_AUTHORIZATION,
  SET_QUANTITY_PRODUCT_PANTRY,
  REMOVE_PRODUCT_PANTRY,
  ADD_PRODUCT_PANTRY,
  UPDATE_PRODUCT_PANTRY,
  ADD_TO_SHOPPING_LIST,
  UPDATE_PANTRY_WITH_SHOPPING_LIST,
  SET_SELECTED_PRODUCTS,
  CLEAR_SHOPPING_LIST,
  REMOVE_FROM_SHOPPING_LIST,
  UPDATE_QUANTITY_ON_LIST,
  INITIAL_STATE,
} from '../constants';

export const setQuantityProductPantry = (dispatch) => ({ id, value }) => {
  dispatch({
    type: SET_QUANTITY_PRODUCT_PANTRY,
    payload: {
      id,
      value,
    },
  });
};

export const removeProductPantry = (dispatch) => ({ id }) => {
  dispatch({
    type: REMOVE_PRODUCT_PANTRY,
    payload: {
      id,
    },
  });
};

export const addProductPantry = (dispatch) => ({ id, productName, unit, min, max, quantity }) => {
  dispatch({
    type: ADD_PRODUCT_PANTRY,
    payload: {
      id,
      productName,
      unit,
      min,
      max,
      quantity,
    },
  });
};

export const updateProductPantry = (dispatch) => ({
  id,
  productName,
  unit,
  min,
  max,
  quantity,
}) => {
  dispatch({
    type: UPDATE_PRODUCT_PANTRY,
    payload: {
      id,
      productName,
      unit,
      min,
      max,
      quantity,
    },
  });
};

export const addToShoppingList = (dispatch) => ({ id, productName, quantity, unit }) => {
  dispatch({
    type: ADD_TO_SHOPPING_LIST,
    payload: {
      id,
      productName,
      quantity,
      unit,
    },
  });
};

export const updatePantryWithShoppingList = (dispatch) => ({ productsToUpdate }) => {
  dispatch({
    type: UPDATE_PANTRY_WITH_SHOPPING_LIST,
    payload: {
      productsToUpdate,
    },
  });
};

export const setSelectedProducts = (dispatch) => ({ products }) => {
  dispatch({
    type: SET_SELECTED_PRODUCTS,
    payload: {
      products,
    },
  });
};

export const clearShoppingList = (dispatch) => () => {
  dispatch({
    type: CLEAR_SHOPPING_LIST,
  });
};

export const removeFromShoppingList = (dispatch) => ({ id }) => {
  dispatch({
    type: REMOVE_FROM_SHOPPING_LIST,
    payload: {
      id,
    },
  });
};

export const updateQuantityOnList = (dispatch) => ({ id, quantity }) => {
  dispatch({
    type: UPDATE_QUANTITY_ON_LIST,
    payload: {
      id,
      quantity,
    },
  });
};

export const setInitialState = (dispatch) => ({
  isLoading = false,
  pantry,
  selectedProducts,
  shoppingList,
}) => {
  dispatch({
    type: INITIAL_STATE,
    payload: {
      isLoading,
      pantry,
      selectedProducts,
      shoppingList,
    },
  });
};

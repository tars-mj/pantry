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

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHORIZATION:
      return { ...state, isAuthorized: action.payload.isAuthorized };
    case SET_QUANTITY_PRODUCT_PANTRY:
      return {
        ...state,
        pantry: [
          ...state.pantry.map((product) => {
            if (product.id === action.payload.id) {
              product.quantity = action.payload.value;
              return product;
            }

            return product;
          }),
        ],
      };
    case REMOVE_PRODUCT_PANTRY:
      return {
        ...state,
        pantry: state.pantry.filter((product) => product.id !== action.payload.id),
      };
    case ADD_PRODUCT_PANTRY:
      return {
        ...state,
        pantry: [...state.pantry, { ...action.payload }],
      };
    case UPDATE_PRODUCT_PANTRY:
      return {
        ...state,
        pantry: [
          ...state.pantry.map((product) =>
            product.id === action.payload.id ? { ...action.payload } : product,
          ),
        ],
      };
    case ADD_TO_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: [...state.shoppingList, action.payload],
      };

    case UPDATE_PANTRY_WITH_SHOPPING_LIST:
      return {
        ...state,
        pantry: [
          ...state.pantry.map((product) => {
            const findProduct = action.payload.productsToUpdate.find((x) => x.id === product.id);
            if (findProduct) {
              product.quantity = product.quantity + Number(findProduct.quantity);
              return product;
            }
            return product;
          }),
        ],
      };
    case SET_SELECTED_PRODUCTS:
      return { ...state, selectedProducts: [...action.payload.products] };
    case CLEAR_SHOPPING_LIST:
      return { ...state, selectedProducts: [], shoppingList: [] };
    case REMOVE_FROM_SHOPPING_LIST:
      return {
        ...state,
        selectedProducts: [...state.selectedProducts.filter((x) => x.id !== action.payload.id)],
        shoppingList: [...state.shoppingList.filter((x) => x.id !== action.payload.id)],
      };
    case UPDATE_QUANTITY_ON_LIST:
      return {
        ...state,
        shoppingList: [
          ...state.shoppingList.map((product) => {
            if (product.id === action.payload.id) {
              product.quantity = action.payload.quantity;
              return product;
            }
            return product;
          }),
        ],
        selectedProducts: [
          ...state.selectedProducts.map((product) => {
            if (product.id === action.payload.id) {
              product.quantity = action.payload.quantity;
              return product;
            }
            return product;
          }),
        ],
      };
    case INITIAL_STATE:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};

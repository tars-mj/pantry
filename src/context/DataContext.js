import React, { createContext, useReducer } from 'react';

export const DataContext = createContext();

// Initial state
const initialState = {
  isLoading: false,
  pantry: [
    {
      id: 'asdsad7d8sadddasd86',
      productName: 'Cukier',
      unit: 'kg',
      min: 4,
      max: 10,
      description: '',
      quantity: 12,
    },
    {
      id: 'sasdsad7ddd8sdsdsd86',
      productName: 'Mąka',
      unit: 'kg',
      min: 10,
      max: 20,
      description: '',
      quantity: 14,
    },
    {
      id: 'ssdasdsad7d8sdsdsd86',
      productName: 'Woda',
      unit: 'l',
      min: 10,
      max: 30,
      description: '',
      quantity: 5,
    },
    {
      id: 'asdsad7d8ssddsdsd86',
      productName: 'Banany',
      unit: 'szt',
      min: 6,
      max: 12,
      description: '',
      quantity: 15,
    },
  ],
  shoppingList: [],
  selectedProducts: [],
};

// Constants
const SET_AUTHORIZATION = 'SET_AUTHORIZATION';
const SET_QUANTITY_PRODUCT_PANTRY = 'SET_QUANTITY_PRODUCT_PANTRY';
const REMOVE_PRODUCT_PANTRY = 'REMOVE_PRODUCT_PANTRY';
const ADD_PRODUCT_PANTRY = 'ADD_PRODUCT_PANTRY';
const UPDATE_PRODUCT_PANTRY = 'UPDATE_PRODUCT_PANTRY';
const ADD_TO_SHOPPING_LIST = 'ADD_TO_SHOPPING_LIST';
const UPDATE_PANTRY_WITH_SHOPPING_LIST = 'UPDATE_PANTRY_WITH_SHOPPING_LIST';
const SET_SELECTED_PRODUCTS = 'SET_SELECTED_PRODUCTS';
const CLEAR_SHOPPING_LIST = 'CLEAR_SHOPPING_LIST';
const REMOVE_FROM_SHOPPING_LIST = 'REMOVE_FROM_SHOPPING_LIST';
const UPDATE_QUANTITY_ON_LIST = 'UPDATE_QUANTITY_ON_LIST';

// Reducer
const reducer = (state, action) => {
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
    default:
      throw new Error();
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const setAuthorization = ({ isAuthorized }) => {
    dispatch({ type: SET_AUTHORIZATION, payload: { isAuthorized } });
  };

  const setQuantityProductPantry = ({ id, value }) => {
    dispatch({
      type: SET_QUANTITY_PRODUCT_PANTRY,
      payload: {
        id,
        value,
      },
    });
  };

  const removeProductPantry = ({ id }) => {
    dispatch({
      type: REMOVE_PRODUCT_PANTRY,
      payload: {
        id,
      },
    });
  };

  const addProductPantry = ({ id, productName, unit, min, max, quantity }) => {
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

  const updateProductPantry = ({ id, productName, unit, min, max, quantity }) => {
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

  const addToShoppingList = ({ id, productName, quantity, unit }) => {
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

  const updatePantryWithShoppingList = ({ productsToUpdate }) => {
    dispatch({
      type: UPDATE_PANTRY_WITH_SHOPPING_LIST,
      payload: {
        productsToUpdate,
      },
    });
  };

  const setSelectedProducts = ({ products }) => {
    dispatch({
      type: SET_SELECTED_PRODUCTS,
      payload: {
        products,
      },
    });
  };

  const clearShoppingList = () => {
    dispatch({
      type: CLEAR_SHOPPING_LIST,
    });
  };

  const removeFromShoppingList = ({ id }) => {
    dispatch({
      type: REMOVE_FROM_SHOPPING_LIST,
      payload: {
        id,
      },
    });
  };

  const updateQuantityOnList = ({ id, quantity }) => {
    dispatch({
      type: UPDATE_QUANTITY_ON_LIST,
      payload: {
        id,
        quantity,
      },
    });
  };

  return (
    <DataContext.Provider
      value={{
        pantry: state.pantry,
        shoppingList: state.shoppingList,
        isLoading: state.isLoading,
        selectedProducts: state.selectedProducts,
        setQuantityProductPantry,
        removeProductPantry,
        addProductPantry,
        updateProductPantry,
        addToShoppingList,
        updatePantryWithShoppingList,
        setSelectedProducts,
        clearShoppingList,
        removeFromShoppingList,
        updateQuantityOnList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

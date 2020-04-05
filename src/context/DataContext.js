import React, { createContext, useReducer } from 'react';

export const DataContext = createContext();

// Initial state
const initialState = {
  isLoading: false,
  pantry: [
    {
      id: 'asdsad7d8sadddasd86',
      productName: 'Mąka',
      unit: 'kg',
      min: 10,
      max: 20,
      description: 'asdsds',
      quantity: 12,
    },
    {
      id: 'asdsad7d8sdsdsd86',
      productName: 'Mąka',
      unit: 'kg',
      min: 10,
      max: 20,
      description: 'asdsds',
      quantity: 22,
    },
  ],
  shoppingList: [
    {
      id: 'asdsad7d8sadddasd86',
      productName: 'Mąka',
      quantity: 4,
    },
  ],
};

// Constants
const SET_AUTHORIZATION = 'SET_AUTHORIZATION';
const SET_QUANTITY_PRODUCT_PANTRY = 'SET_QUANTITY_PRODUCT_PANTRY';
const REMOVE_PRODUCT_PANTRY = 'REMOVE_PRODUCT_PANTRY';
const ADD_PRODUCT_PANTRY = 'ADD_PRODUCT_PANTRY';
const UPDATE_PRODUCT_PANTRY = 'UPDATE_PRODUCT_PANTRY';

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

  return (
    <DataContext.Provider
      value={{
        pantry: state.pantry,
        shoppingList: state.shoppingList,
        isLoading: state.isLoading,
        setQuantityProductPantry,
        removeProductPantry,
        addProductPantry,
        updateProductPantry,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

import React, { createContext, useReducer } from 'react';

export const DataContext = createContext();

// Initial state
const initialState = {
  isLoading: false,
  pantry: [
    {
      uid: 'asdsad7d8sadddasd86',
      productName: 'Mąka',
      unit: 'kg',
      min: 10,
      max: 20,
      description: 'asdsds',
      quantity: 12,
    },
  ],
  shoppingList: [
    {
      uid: 'asdsad7d8sadddasd86',
      productName: 'Mąka',
      quantity: 4,
    },
  ],
};

// Constants
const SET_AUTHORIZATION = 'SET_AUTHORIZATION';

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHORIZATION:
      return { ...state, isAuthorized: action.payload.isAuthorized };
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

  return (
    <DataContext.Provider
      value={{
        pantry: state.pantry,
        shoppingList: state.shoppingList,
        isLoading: state.isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

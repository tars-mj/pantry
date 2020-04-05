import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

// Initial state
const initialState = {
  isAuthorized: false,
  uid: '',
  email: '',
};

// Constants
const SET_AUTHORIZATION = 'SET_AUTHORIZATION';
const SET_LOGIN = 'SET_LOGIN';
const SET_LOGOUT = 'SET_LOGOUT';

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHORIZATION:
      return { ...state, isAuthorized: action.payload.isAuthorized };
    case SET_LOGIN:
      return { ...state, ...action.payload.isAuthorized };
    case SET_LOGOUT:
      return { ...state, isAuthorized: false, uid: '', email: '' };
    default:
      throw new Error();
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const setAuthorization = ({ isAuthorized }) => {
    dispatch({ type: SET_AUTHORIZATION, payload: { isAuthorized } });
  };

  const setLogin = ({ uid, email, isAuthorized }) => {
    dispatch({ type: SET_LOGIN, payload: { uid, email, isAuthorized } });
  };

  const setLogout = () => {
    dispatch({ type: SET_LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthorized: state.isAuthorized,
        setAuthorization,
        setLogin,
        setLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

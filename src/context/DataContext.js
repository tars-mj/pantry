import React, { createContext, useReducer, useEffect } from 'react';
import { db, auth } from 'services/firebase';
import { initialState } from 'utils/initialState';
import { reducer } from 'reducers';
import {
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
  setInitialState,
} from 'actions';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saveFirestore = async () => {
      if (!auth.currentUser) {
        return;
      }
      const data = await db.collection('data').doc(auth.currentUser.uid).get();
      if (data.data() !== 'undefined') {
        db.collection('data')
          .doc(auth.currentUser.uid)
          .set({
            pantry: state.pantry,
            shoppingList: state.shoppingList,
            selectedProducts: state.selectedProducts,
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      }
    };
    saveFirestore();
  }, [state.pantry, state.shoppingList, state.selectedProducts]);

  return (
    <DataContext.Provider
      value={{
        pantry: state.pantry,
        shoppingList: state.shoppingList,
        isLoading: state.isLoading,
        selectedProducts: state.selectedProducts,
        setQuantityProductPantry: setQuantityProductPantry(dispatch),
        removeProductPantry: removeProductPantry(dispatch),
        addProductPantry: addProductPantry(dispatch),
        updateProductPantry: updateProductPantry(dispatch),
        addToShoppingList: addToShoppingList(dispatch),
        updatePantryWithShoppingList: updatePantryWithShoppingList(dispatch),
        setSelectedProducts: setSelectedProducts(dispatch),
        clearShoppingList: clearShoppingList(dispatch),
        removeFromShoppingList: removeFromShoppingList(dispatch),
        updateQuantityOnList: updateQuantityOnList(dispatch),
        setInitialState: setInitialState(dispatch),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

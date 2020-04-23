import React, { useEffect, useContext } from 'react';
import useAuthUser from 'hooks/useAuthUser';
import { DataContext } from 'context/DataContext';
import { db, auth } from 'services/firebase';
import { initialState } from 'utils/initialState';

const withAuthentication = (WrappedComponent) => (props) => {
  const { pantry, setInitialState } = useContext(DataContext);
  const isAuthorized = useAuthUser();

  useEffect(() => {
    const getInitialState = async () => {
      const data = await db.collection('data').doc(auth.currentUser.uid).get();

      if (!data.data()) {
        setInitialState(initialState);
        return;
      }
      const { pantry, shoppingList, selectedProducts } = data.data();
      setInitialState({ pantry, shoppingList, selectedProducts });
    };

    if (isAuthorized && pantry.length === 0) {
      getInitialState();
    }

    return () => {
      setInitialState(initialState);
    };
  }, [isAuthorized]);

  return <>{isAuthorized && <WrappedComponent {...props} />}</>;
};

export default withAuthentication;

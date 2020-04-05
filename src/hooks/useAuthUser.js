import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../services/firebase';
import { routes } from '../routes';

export default () => {
  const { setLogin, setLogout } = useContext(AuthContext);
  const [isAuthorized, setAuthorized] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const setUser = (user) => {
      if (user) {
        setAuthorized(true);
        setLogin({ uid: user.uid, email: user.email, isAuthorized: true });
      } else {
        setLogout();
        history.push(routes.login);
      }
    };
    const unsubscribe = auth.onAuthStateChanged(setUser);

    return () => unsubscribe();
  }, []);

  return isAuthorized;
};

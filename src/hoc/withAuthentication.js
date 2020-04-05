import React from 'react';
import useAuthUser from '../hooks/useAuthUser';

const withAuthentication = (WrappedComponent) => (props) => {
  const isAuthorized = useAuthUser();

  return <>{isAuthorized && <WrappedComponent {...props} />}</>;
};

export default withAuthentication;

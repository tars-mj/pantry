import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import MainTemplate from 'components/templates/MainTemplate';
import AuthProvider from 'context/AuthContext';
import DataProvider from 'context/DataContext';
import LoginPage from 'components/pages/LoginPage';
import RegisterPage from 'components/pages/RegisterPage';
import ShoppingListPage from 'components/pages/ShoppingListPage';
import PantryPage from 'components/pages/PantryPage';

const Root = () => (
  <AuthProvider>
    <DataProvider>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path={routes.home} render={() => <Redirect to="/pantry" />} />
            <Route exact path={routes.login} component={LoginPage} />
            <Route exact path={routes.register} component={RegisterPage} />
            <Route exact path={routes.pantry} component={PantryPage} />
            <Route exact path={routes.shoppingList} component={ShoppingListPage} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </DataProvider>
  </AuthProvider>
);

export default Root;

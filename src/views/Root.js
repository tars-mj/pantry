import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ShoppingListPage from './ShoppingListPage';
import PantryPage from './PantryPage';
import { routes } from '../routes';
import MainTemplate from '../templates/MainTemplate';
import DataProvider from '../context/DataContext';
import AuthProvider from '../context/AuthContext';

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

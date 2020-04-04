import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import ShoppingListPage from './ShoppingListPage';
import PantryPage from './PantryPage';
import { routes } from '../routes';
import MainTemplate from '../templates/MainTemplate';

const Root = () => (
  <BrowserRouter>
    <MainTemplate>
      <Switch>
        <Route exact path={routes.home} render={() => <Redirect to="/pantry" />} />
        <Route exact path={routes.login} component={LoginPage} />
        <Route exact path={routes.pantry} component={PantryPage} />
        <Route exact path={routes.shoppingList} component={ShoppingListPage} />
      </Switch>
    </MainTemplate>
  </BrowserRouter>
);

export default Root;

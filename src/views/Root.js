import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PantryPage from 'views/PantryPage';
import LoginPage from 'views/LoginPage';
import ShoppingListPage from 'views/ShoppingListPage';
import { routes } from '../routes';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.login} component={LoginPage} />
      <Route exact path={routes.pantry} component={PantryPage} />
      <Route exact path={routes.shoppingList} component={ShoppingListPage} />
    </Switch>
  </BrowserRouter>
);

export default Root;

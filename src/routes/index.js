/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

// Pages
import Login from '../pages/Login';
import Categories from '../pages/Categories';
import CreateCategory from '../pages/Categories/CreateCategory';
import EditCategory from '../pages/Categories/EditCategory';
import NotFound from '../pages/NotFound';

// Auth
import { isAuthenticated } from '../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))}
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/new-category" component={CreateCategory} />
        <PrivateRoute path="/category/:id" component={EditCategory} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

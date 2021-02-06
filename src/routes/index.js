/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

// Pages
import Login from '../pages/Login';
import Categories from '../pages/Categories';
import CreateCategory from '../pages/Categories/CreateCategory';

// Auth
import { isAuthenticated } from '../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    ))}
  />
);

export default function Routes() {
  console.log('isAuthenticated', isAuthenticated());
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/new-category" component={CreateCategory} />
      </Switch>
    </BrowserRouter>
  );
}

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

const history = createBrowserHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = Component => {
  if (Meteor.userId()) {
    return <Redirect to="/links" />;
  } else {
    return <Component />;
  }
};

const onEnterPrivatePage = Component => {
  if (!Meteor.userId()) {
    return <Redirect to="/" />;
  } else {
    return <Component />;
  }
};

export const onAuthChange = isAuthenticated => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  // console.log('isUnauthenticatedPage', isUnauthenticatedPage);
  // console.log('isAuthenticatedPage', isAuthenticatedPage);
  // console.log('isAuthenticated: ', isAuthenticated);
  if (isUnauthenticatedPage && isAuthenticated) history.replace('/links');
  if (isAuthenticatedPage && !isAuthenticated) history.replace('/');
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => onEnterPublicPage(Login)} />
      <Route path="/signup" render={() => onEnterPublicPage(Signup)} />
      <Route path="/links" render={() => onEnterPrivatePage(Link)} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

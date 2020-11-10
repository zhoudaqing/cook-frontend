import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { main as mainRoutes } from "./index";

import AuthLayout from "../layouts/Auth";
import MainLayout from "../layouts/Main";
import ErrorPage from "../pages/Errors/ErrorPage";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
        // Route item without children
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      )
  );

const Routes = ({ t }) => (
  <Router>
    <Switch>
      {childRoutes(MainLayout, mainRoutes)}
      <Route
        render={() => (
          <AuthLayout>
            <ErrorPage t={t} errorCode={404} errorTitle={'pageNotFound'} errorDescription={'pageMightBeenRemoved'}
              returnButtonTitle={'returnToIndex'} returnButtonLink={'/'} />
          </AuthLayout>
        )}
      />
    </Switch>
  </Router>
);

export default Routes;

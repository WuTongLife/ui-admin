import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import routes, { IRouteConfig } from "./route";

const renderRoutes = (routes: IRouteConfig[]) => {
  return routes.map((route, index) => {
    if (route.routes && route.routes.length > 0) {
      const Parent = route.component;
      return (
        <Route
          path={route.path}
          exact={route.exact}
          key={route.path}
          render={(props) =>
            Parent ? <Parent {...props}>{renderRoutes(route.routes!)}</Parent> : renderRoutes(route.routes!)
          }
        />
      );
    } else {
      return <Route path={route.path} exact={route.exact} key={route.path} component={route.component} />;
    }
  });
};

const RouteIndex = () => {
  return (
    <Router>
      <Switch>
        <Redirect path="/" exact to="/home" />
        {renderRoutes(routes)}
      </Switch>
    </Router>
  );
};
export default RouteIndex;

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import RouteIndex from "@/routes";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouteIndex />
    </Provider>
  );
};

export default App;

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import RouteIndex from "@/routes";
import { IntlProvider } from "react-intl";
import langs from "@/locales";
import { SettingProvide, SettingConsumer } from "@/contexts";

const App: React.FC = () => {
  return (
    <SettingProvide>
      <SettingConsumer>
        {({ lang }) => (
          <IntlProvider locale={lang} messages={langs[lang]}>
            <Provider store={store}>
              <RouteIndex />
            </Provider>
          </IntlProvider>
        )}
      </SettingConsumer>
    </SettingProvide>
  );
};

export default App;

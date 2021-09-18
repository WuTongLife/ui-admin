import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import RouteIndex from "@/routes";
import { IntlProvider } from "react-intl";
import langs from "@/locales";
import { SettingProvide, SettingConsumer } from "@/contexts";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";

const App: React.FC = () => {
  return (
    <SettingProvide>
      <SettingConsumer>
        {({ lang }) => (
          <ConfigProvider locale={lang === "en" ? enUS : zhCN}>
            <IntlProvider locale={lang} messages={langs[lang]}>
              <Provider store={store}>
                <RouteIndex />
              </Provider>
            </IntlProvider>
          </ConfigProvider>
        )}
      </SettingConsumer>
    </SettingProvide>
  );
};

export default App;

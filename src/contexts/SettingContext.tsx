import React, { useCallback, FC, createContext, useState } from "react";

interface ISettingContext {
  lang: string;
  changeLang: (lang: string) => void;
}

export const SettingContext = createContext<ISettingContext>({ lang: "zh", changeLang: () => {} });
export const SettingConsumer = SettingContext.Consumer;

const SettingProvide: FC = (props) => {
  const [lang, setLang] = useState<string>(localStorage.getItem("lang") || "zh");

  const changeLang = useCallback((lang: string) => {
    setLang(lang);
    localStorage.setItem("lang", lang);
  }, []);

  return <SettingContext.Provider value={{ lang, changeLang }}>{props.children}</SettingContext.Provider>;
};

export default SettingProvide;

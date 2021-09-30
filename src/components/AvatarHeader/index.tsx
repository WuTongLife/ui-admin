import React, { useContext } from "react";
import { Avatar, Space, Badge, Menu, Dropdown } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import { SettingContext } from "@/contexts";
import "./index.less";
import IconFont from "../IconFont";

const prefixCls = "avatar-header";

interface IAvatarHeaderProps {
  currentUser: Store.InitStateValue["currentUser"];
}

const AvatarHeader = ({ currentUser }: IAvatarHeaderProps) => {
  const { changeLang, lang } = useContext(SettingContext);

  const onClickLang = () => {
    changeLang(lang === "zh" ? "en" : "zh");
  };

  return (
    <Space size={16} className={prefixCls}>
      <Badge dot>
        <NotificationOutlined style={{ fontSize: 16 }} />
      </Badge>
      <span className={`${prefixCls}-lang`} onClick={onClickLang}>
        <IconFont type={`icon-lang_${lang}`} />
      </span>
      <Avatar style={{ backgroundColor: "#9CD8EF" }} size={40} />
      <span>{currentUser?.nickname}</span>
    </Space>
  );
};

export default AvatarHeader;

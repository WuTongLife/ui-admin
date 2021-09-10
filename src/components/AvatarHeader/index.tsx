import React from "react";
import { Avatar, Space, Badge } from "antd";
import { NotificationOutlined } from "@ant-design/icons";

const AvatarHeader = () => {
  return (
    <Space size={16}>
      <Badge dot>
        <NotificationOutlined style={{ fontSize: 16 }} />
      </Badge>
      <Avatar style={{ backgroundColor: "#9CD8EF" }} size={40} />
      <span>Taylor Kareem</span>
    </Space>
  );
};

export default AvatarHeader;

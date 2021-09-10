import React, { FC } from "react";
import { Layout, Avatar } from "antd";
import SiderMenu from "@/components/SiderMenu";
import AvatarHeader from "@/components/AvatarHeader";
import AffixMusic from "@/components/AffixMusic";
import { LogoutOutlined } from "@ant-design/icons";
import "./index.less";
import WrapBreadcrumb from "@/components/WrapBreadcrumb";

const { Header, Sider, Content } = Layout;

const prefixCls = "layout-basic";

const SiderTitle = () => {
  return (
    <div className={`${prefixCls}-sider-title`}>
      <Avatar style={{ backgroundColor: "#29518E" }} />
      <span>Dakota</span>
    </div>
  );
};

const BasicLayout: FC = ({ children, ...props }) => {
  console.log(props);
  return (
    <Layout className={prefixCls}>
      <Sider className={`${prefixCls}-sider`}>
        <SiderTitle />
        <SiderMenu />
        <span className={`${prefixCls}-sider-logout`}>
          <LogoutOutlined />
          Logout
        </span>
      </Sider>
      <Layout>
        <Header>
          <WrapBreadcrumb />
          <AvatarHeader />
        </Header>
        <Content className={`${prefixCls}-content`}>
          <div style={{ padding: 20, overflowY: "auto" }}>{children}</div>
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
      <AffixMusic />
    </Layout>
  );
};

export default BasicLayout;

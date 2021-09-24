import React, { FC, useState, useEffect } from "react";
import { Layout, Avatar } from "antd";
import SiderMenu from "@/components/SiderMenu";
import AvatarHeader from "@/components/AvatarHeader";
import AffixMusic from "@/components/AffixMusic";
import { LogoutOutlined } from "@ant-design/icons";
import "./index.less";
import WrapBreadcrumb from "@/components/WrapBreadcrumb";
import classNames from "classnames";

const { Header, Sider, Content } = Layout;

const prefixCls = "layout-basic";

const SiderTitle = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className={classNames(`${prefixCls}-sider-title`, { [`${prefixCls}-sider-title-collapsed`]: collapsed })}>
      <Avatar size={32} style={{ backgroundColor: "#29518E" }} />
      <span>Dakota</span>
    </div>
  );
};

const BasicLayout: FC = ({ children, ...props }) => {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const width = document.documentElement.clientWidth;
      if (width < 1200) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout className={prefixCls}>
      <Sider className={`${prefixCls}-sider`} collapsed={collapsed}>
        <SiderTitle collapsed={collapsed} />
        <SiderMenu />
        <span
          className={classNames(`${prefixCls}-sider-logout`, {
            [`${prefixCls}-sider-logout-collapsed`]: collapsed
          })}
        >
          <LogoutOutlined />
          <span>Logout</span>
        </span>
        {/* <span onClick={() => setCollapsed(!collapsed)}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </span> */}
      </Sider>
      <Layout>
        <Header>
          <WrapBreadcrumb />
          <AvatarHeader />
        </Header>
        <Content className={`${prefixCls}-content`}>
          <div style={{ padding: 20, overflowY: "auto" }}>{children}</div>
        </Content>
      </Layout>
      <AffixMusic />
    </Layout>
  );
};

export default BasicLayout;

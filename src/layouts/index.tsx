import React, { FC, useState, useEffect } from "react";
import { Layout, Avatar, Spin } from "antd";
import SiderMenu from "@/components/SiderMenu";
import AvatarHeader from "@/components/AvatarHeader";
import AffixMusic from "@/components/AffixMusic";
import { LogoutOutlined } from "@ant-design/icons";
import WrapBreadcrumb from "@/components/WrapBreadcrumb";
import classNames from "classnames";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { saveCurrentUserAction } from "@/store/actions/initState";
import "./index.less";
import { Redirect, useHistory } from "react-router-dom";
import { fetchCurrentUser } from "@/services/user";

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

interface IBasicLayoutProps extends Pick<Store.Models, "initState"> {
  onSaveCurrentUser: (currentUser: Entity.User) => Store.InitStateAction;
}

const BasicLayout: FC<IBasicLayoutProps> = ({ children, ...props }) => {
  const { initState, onSaveCurrentUser } = props;
  const { currentUser } = initState;
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // 查询当前用户
    getCurrentUser();
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

  // 查询当前用户
  const getCurrentUser = async () => {
    const res = await fetchCurrentUser();
    if (res?.code === 200) {
      onSaveCurrentUser(res.data!);
    } else {
      history.push("/login");
    }
  };

  // 退出登录
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className={prefixCls}>
      <Sider className={`${prefixCls}-sider`} collapsed={collapsed}>
        <SiderTitle collapsed={collapsed} />
        <SiderMenu />
        <span
          className={classNames(`${prefixCls}-sider-logout`, {
            [`${prefixCls}-sider-logout-collapsed`]: collapsed
          })}
          onClick={logout}
        >
          <LogoutOutlined />
          <span>Logout</span>
        </span>
      </Sider>
      <Layout>
        <Header>
          <WrapBreadcrumb />
          <AvatarHeader currentUser={currentUser} />
        </Header>
        <Content className={`${prefixCls}-content`}>
          <div style={{ padding: 20, overflowY: "auto" }}>{children}</div>
        </Content>
      </Layout>
      <AffixMusic />
    </Layout>
  );
};

const mapStateToProps = (state: Store.Models) => {
  return {
    initState: state.initState
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Store.Action>) => {
  return {
    onSaveCurrentUser: (currentUser: Entity.User) => dispatch(saveCurrentUserAction({ currentUser }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);

import React, { useMemo, useState, Key, useEffect } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import routes, { IRouteConfig } from "@/routes/route";
import { RouteIconEnum } from "@/routes/icon";
import { FormattedMessage } from "react-intl";

const { SubMenu } = Menu;

export const icon = {
  [RouteIconEnum.首页]: <HomeOutlined />,
  [RouteIconEnum.系统管理]: <SettingOutlined />
};

const SiderMenu = () => {
  const { pathname } = useLocation();
  const newMenuData = routes?.filter((item) => item.isLayout)[0].routes;
  const pathnames = pathname.split("/");
  const keys = [`/${pathnames[1]}`, ...(pathnames[2] ? [`/${pathnames[1]}/${pathnames[2]}`] : [])];
  const [openKeys, setOpenKeys] = useState<string[]>(keys);

  useEffect(() => {
    setOpenKeys((openKeys) => {
      const tempKeys = [...openKeys];
      keys.forEach((key) => {
        if (!openKeys.includes(key)) {
          tempKeys.push(key);
        }
      });
      return tempKeys;
    });
  }, [pathname]);

  // 展开的菜单栏
  const onOpenChange = (keys: Key[]) => {
    setOpenKeys(keys as string[]);
  };

  const getSelectedKeys = (menus: IRouteConfig[]): string[] => {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (menu.path === "/" || !pathname.includes(menu.path)) {
        continue;
      }
      if (!menu.routes || menu.routes.length === 0) {
        const data = menu.path.split("/");
        data.pop();
        return menu.hiddenInMenu ? [data.join("/")] : [menu.path];
      } else {
        return getSelectedKeys(menu.routes || []);
      }
    }
    return [];
  };

  // 递归渲染菜单
  const renderMenu = (menus: IRouteConfig[]) => {
    return menus
      .filter((d) => !d.hiddenInMenu)
      .map((item) => {
        const childData = item.routes;
        if (childData && childData.length === 0) {
          return null;
        }
        const title = item.format ? <FormattedMessage id={item.format} defaultMessage={item.title} /> : item.title;
        return !childData ? (
          <Menu.Item key={item.path} icon={item.icon ? icon[item.icon] : null}>
            <NavLink to={item.path}>{title}</NavLink>
          </Menu.Item>
        ) : (
          <SubMenu key={item.path} icon={item.icon ? icon[item.icon] : null} title={title}>
            {renderMenu(childData)}
          </SubMenu>
        );
      });
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={getSelectedKeys(newMenuData || [])}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    >
      {useMemo(() => renderMenu(newMenuData || []), [newMenuData])}
    </Menu>
  );
};

export default SiderMenu;

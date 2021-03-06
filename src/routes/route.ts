import loadable from "@/utils/loadable";
import { RouteConfig } from "react-router-config";
import { RouteIconEnum } from "./icon";

export interface IRouteConfig extends RouteConfig {
  routes?: IRouteConfig[];
  component?: any;
  path: string;
  redirect?: string;
  title?: string;
  hiddenInMenu?: boolean;
  isLayout?: boolean;
  icon?: RouteIconEnum;
  format?: string;
}

const routesConfig: IRouteConfig[] = [
  {
    path: "/blog/editor",
    exact: true,
    hiddenInMenu: true,
    component: import("@/pages/blogManage/blog/editor")
  },
  {
    path: "/login",
    exact: true,
    hiddenInMenu: true,
    component: import("@/pages/login")
  },
  {
    path: "/",
    component: import("@/layouts/index"),
    isLayout: true,
    routes: [
      {
        path: "/home",
        exact: true,
        component: import("@/pages/index"),
        title: "首页",
        format: "menu.home",
        icon: RouteIconEnum.首页
      },
      {
        path: "/blog",
        title: "博客管理",
        icon: RouteIconEnum.博客管理,
        format: "menu.blog",
        routes: [
          {
            path: "/blog/index",
            exact: true,
            component: import("@/pages/blogManage/blog/index"),
            format: "menu.blog.blog"
          },
          {
            path: "/blog/label",
            exact: true,
            component: import("@/pages/blogManage/blogLabel/index"),
            format: "menu.blog.label"
          }
        ]
      },
      {
        path: "/system",
        title: "系统管理",
        icon: RouteIconEnum.系统管理,
        format: "menu.system",
        routes: [
          {
            path: "/system/menu",
            exact: true,
            component: import("@/pages/system/menu/index"),
            title: "菜单管理",
            format: "menu.menu"
          },
          {
            path: "/system/user",
            exact: true,
            component: import("@/pages/system/user/index"),
            title: "用户管理",
            format: "menu.user"
          }
        ]
      },
      {
        path: "/component",
        exact: true,
        title: "组件",
        icon: RouteIconEnum.系统管理,
        format: "menu.component",
        component: import("@/pages/component")
      },
      {
        path: "/404",
        hiddenInMenu: true,
        component: import("@/pages/404")
      }
    ]
  }
];

const handelRoute = (routes: IRouteConfig[]): IRouteConfig[] => {
  return routes.map((d) => ({
    ...d,
    component: d.component && loadable(d.component),
    routes: d.routes && handelRoute(d.routes)
  }));
};

const routes = handelRoute(routesConfig);

export default routes;

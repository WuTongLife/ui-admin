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
}

const routesConfig: IRouteConfig[] = [
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
        icon: RouteIconEnum.首页
      },
      {
        path: "/system",
        title: "系统管理",
        icon: RouteIconEnum.系统管理,
        routes: [
          {
            path: "/system/menu",
            exact: true,
            component: import("@/pages/system/menu/index"),
            title: "菜单管理"
          },
          {
            path: "/system/user",
            exact: true,
            component: import("@/pages/system/user/index"),
            title: "用户管理"
          }
        ]
      },
      {
        path: "/component",
        exact: true,
        title: "组件",
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

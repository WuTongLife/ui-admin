import React, { FC, Fragment, useEffect, useState } from "react";
import { Breadcrumb, Space, Spin } from "antd";
import { useLocation, Link } from "react-router-dom";
import routes, { IRouteConfig } from "@/routes/route";
import "./index.less";
import { FormattedMessage, useIntl } from "react-intl";

interface IBreadcrumbData {
  href?: string;
  title?: React.ReactNode;
  disable?: boolean;
  format?: string;
}

interface WrapBreadcrumbProps {
  data?: IBreadcrumbData[];
  style?: React.CSSProperties;
}

const WrapBreadcrumb: FC<WrapBreadcrumbProps> = ({ data, style }) => {
  const [breadcrumbData, setBreadcrumbData] = useState<IBreadcrumbData[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const tempData: IBreadcrumbData[] = [];
    filterBreadcrumb(routes || [], tempData);
    setBreadcrumbData(tempData);
  }, [pathname]);

  const filterBreadcrumb = (routes: IRouteConfig[], data: any[]) => {
    for (let i = 0; i < routes.length; i++) {
      if (pathname.startsWith(routes[i].path)) {
        if (routes[i].path !== "/") {
          if (!data.map((d) => d.href).includes(routes[i].path)) {
            data.push({
              title: routes[i].breadcrumbTitle || routes[i].title,
              href: routes[i].path,
              icon: routes[i].icon,
              disable: routes[i].routes,
              format: routes[i].format
            });
          }
        }
        filterBreadcrumb(routes[i].routes || [], data);
      }
    }
  };

  return (
    <Breadcrumb separator="">
      {breadcrumbData.map((item, index) => {
        const title = item.format ? <FormattedMessage id={item.format} /> : item.title;
        return index === 0 ? (
          <Fragment key={index}>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
            {breadcrumbData.length > 1 && <Breadcrumb.Separator>:</Breadcrumb.Separator>}
          </Fragment>
        ) : (
          <Breadcrumb.Item key={index}>
            {item.href && !item.disable && item.href !== pathname ? (
              <Link to={item.href}>{title}</Link>
            ) : (
              <Space size={4}>{title}</Space>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default WrapBreadcrumb;

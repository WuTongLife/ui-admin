import { Input, Space } from "antd";
import React from "react";
import "./index.less";

const prefixCls = "table-filter";

interface ITableFilter {
  loading?: boolean;
  extraOperate?: React.ReactNode[];
}

const TableFilter = (props: ITableFilter) => {
  return (
    <div className={prefixCls}>
      <Input.Search className={`${prefixCls}-search`} loading={props.loading} />
      <Space>{props.extraOperate?.map((d) => d)}</Space>
    </div>
  );
};
export default TableFilter;

import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";

const UserIndex = () => {
  const columns: ColumnsType<Entity.User> = [{ dataIndex: "name", title: "用户名" }];

  return <Table size="small" rowKey="id" columns={columns} dataSource={[{ name: "admin", id: 1 }]} />;
  // return <div style={{ width: 200, height: 200 }} />;
};
export default UserIndex;

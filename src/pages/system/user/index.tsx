import React from "react";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import TableFilter from "@/components/TableFilter";
import { PlusOutlined } from "@ant-design/icons";

const UserIndex = () => {
  const columns: ColumnsType<Entity.User> = [{ dataIndex: "name", title: "用户名" }];

  return (
    <div>
      <TableFilter extraOperate={[<Button icon={<PlusOutlined />}>新增</Button>]} />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={Array(20)
          .fill(0)
          .map((_, index) => ({ name: "admin", id: index }))}
      />
    </div>
  );
  // return <div style={{ width: 200, height: 200 }} />;
};
export default UserIndex;

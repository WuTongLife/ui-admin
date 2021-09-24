import React from "react";
import { Button, Table } from "antd";
import TableFilter from "@/components/TableFilter";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const prefixCls = "blog-table";

const BlogIndex = () => {
  return (
    <div className={prefixCls}>
      <TableFilter
        extraOperate={[
          <Link to="/blog/editor" target="_blank">
            <Button icon={<PlusOutlined />}>新增</Button>
          </Link>
        ]}
      />
    </div>
  );
};
export default BlogIndex;

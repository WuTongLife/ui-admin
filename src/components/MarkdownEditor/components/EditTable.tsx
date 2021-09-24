import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Button, Form, Input, Table } from "antd";
import { TableProps } from "antd/lib/table";
import { CloseCircleOutlined } from "@ant-design/icons";
import styles from "./index.module.less";

export declare type ColumnsItem = { key: string | number; value?: string; sort: number }[];

interface IEditTable {
  columns: ColumnsItem;
  dataSource: ColumnsItem[];
  onSubmit: (values: any, columns: ColumnsItem) => void;
}

const EditTable = forwardRef(({ columns, dataSource, onSubmit }: IEditTable, ref) => {
  const [form] = Form.useForm();
  const [tempColumns, setTempColumns] = useState<ColumnsItem>(columns);

  useEffect(() => {
    setTempColumns(columns);
    form.setFieldsValue({
      list: dataSource
    });
  }, [columns, dataSource]);

  const delCol = useCallback(
    (index: number, key: any) => {
      setTempColumns((c) => {
        c.splice(index, 1);
        return [...c];
      });
      let list = form.getFieldValue("list");
      list.forEach((item: any) => {
        delete item[`column-${key}`];
        delete item[`value-${key}`];
      });
      form.setFieldsValue({
        list: [...list]
      });
    },
    [form]
  );

  useImperativeHandle(
    ref,
    () => ({
      onSubmit: form.submit,
      addCol: (index?: number) =>
        setTempColumns((c) => {
          c.splice(index === undefined ? c.length : index, 0, { key: Date.now(), sort: index || c.length });
          return c.map((i, ci) => ({ ...i, sort: ci }));
        })
    }),
    [form]
  );

  return (
    <Form onFinish={(values) => onSubmit(values, tempColumns)} form={form} className={styles["edit-table"]}>
      <Form.List name="list">
        {(fields, { add, remove }) => (
          <>
            <Table
              bordered
              scroll={{ x: "max-content", y: 500 }}
              columns={
                [
                  ...tempColumns.map((c, cindex) => ({
                    title: (
                      <>
                        {tempColumns.length === 1 ? null : (
                          <CloseCircleOutlined onClick={() => delCol(cindex, c.key)} className={styles["col-close"]} />
                        )}
                        <Form.Item noStyle {...fields[cindex]} initialValue="" name={[0, `column-${c.key}`]}>
                          <Input placeholder="表头" />
                        </Form.Item>
                      </>
                    ),
                    render: (value: any, record: any, index: number) => {
                      return (
                        <Form.Item
                          noStyle
                          {...fields[index]}
                          initialValue=""
                          name={[fields[index].name, `value-${tempColumns[cindex].key}`]}
                        >
                          <Input />
                        </Form.Item>
                      );
                    }
                  })),
                  ...(fields.length === 1
                    ? []
                    : [
                        {
                          title: "操作",
                          width: 70,
                          align: "center",
                          fixed: "right",
                          render: (value: any, record: any, index: number) => <a onClick={() => remove(index)}>删除</a>
                        }
                      ])
                ] as TableProps<any>["columns"]
              }
              pagination={false}
              dataSource={fields}
            />
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="dashed"
                style={{ width: "100%", marginTop: 8 }}
                onClick={() => {
                  add();
                }}
              >
                添加行
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
});

export default EditTable;

import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, TableOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { Button, InputNumber, Modal, Radio, Space } from 'antd';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import EditTable, { ColumnsItem } from './EditTable';

interface ITableToolProps {
  icon?: ReactNode;
  getTableString: () => string;
  onClick: (str: string) => void;
}

const TableTool = ({ icon, getTableString, onClick }: ITableToolProps) => {
  const [visible, modalOperate] = useBoolean(false);
  const colNumRef = useRef<any>(null);
  const formRef = useRef<{ onSubmit: () => void; addCol: (index?: number) => void }>();
  const [editParams, setEditParams] = useState<any>({
    columns: [
      { key: 0, value: '' },
      { key: 1, value: '' },
    ],
    dataSource: [{}, {}],
  });

  useEffect(() => {
    if (visible) {
      const row = getTableString().split(/\n/g);
      const col = row
        .filter(i => i.startsWith('|'))
        .map(i => {
          let arr = i.split('|');
          return arr.slice(1, arr.length - 1).map(d => d.trim());
        });
      if (col.length > 0) {
        let dataSource: any[] = [];
        col.forEach((i, index) => {
          let temp: any = {};
          if (index === 0) {
            i.forEach((d, id) => {
              temp[`column-${id}`] = d;
            });
            dataSource.push(temp);
          }
          if (index >= 2) {
            if (dataSource[index - 2]) {
              i.forEach((d, id) => {
                dataSource[index - 2][`value-${id}`] = d;
              });
            } else {
              i.forEach((d, id) => {
                temp[`value-${id}`] = d;
              });
              dataSource.push(temp);
            }
          }
        });

        setEditParams({
          columns: col[0].map((i, index) => ({ key: index, value: i })),
          dataSource,
        });
      } else {
        setEditParams({
          columns: [
            { key: 0, value: '' },
            { key: 1, value: '' },
          ],
          dataSource: [{}, {}],
        });
      }
    }
  }, [visible]);

  const onConfirm = (values: any, columns: ColumnsItem) => {
    const { list } = values;
    const data: string[][] = Array(list.length + 1)
      .fill(0)
      .map(() => []);
    columns.sort((a, b) => a.sort - b.sort);
    columns.forEach(item => {
      let key = String(item.key);
      data[0].push(list[0][`column-${key}`]);
      list.forEach((item: any, index: number) => {
        for (const iKey in item) {
          if (iKey === `value-${key}`) {
            data[index + 1].push(item[iKey] || '');
          }
        }
      });
    });

    data.splice(
      1,
      0,
      data[0].map(() => ':-:'),
    );
    let tbStr = data.map(i => `|${i.join('|')}|`).join('\n');
    onClick(tbStr);
  };

  return (
    <>
      <span onClick={modalOperate.setTrue} title="表格">
        {icon || <TableOutlined />}
      </span>
      <Modal
        title={
          <Space>
            <InputNumber placeholder="请输入列" min={0} ref={colNumRef} />
            <Button onClick={() => formRef.current?.addCol(colNumRef.current?.currentValue)}>添加列</Button>
            <Radio.Group defaultValue={1}>
              <Radio value={1}>
                <AlignLeftOutlined />
              </Radio>
              <Radio value={2}>
                <AlignCenterOutlined />
              </Radio>
              <Radio value={3}>
                <AlignRightOutlined />
              </Radio>
            </Radio.Group>
          </Space>
        }
        okText="确定"
        cancelText="取消"
        width={1200}
        visible={visible}
        onCancel={modalOperate.setFalse}
        onOk={() => {
          formRef.current?.onSubmit();
          modalOperate.setFalse();
        }}
      >
        <EditTable ref={formRef} {...editParams} onSubmit={onConfirm} />
      </Modal>
    </>
  );
};
export default TableTool;

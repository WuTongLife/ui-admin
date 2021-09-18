import IconFont from "@/components/IconFont";
import { imgRegex, pdfRegex, wordRegex, excelRegex } from "@/utils/regex";
import { FileTextOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Progress, ProgressProps, Space } from "antd";
import classNames from "classnames";
import React from "react";
import "./index.less";

const fileIcon = (name: string, src: string) => {
  if (imgRegex.test(name)) {
    return <Avatar src={src} shape="square" size={60} />;
  } else if (wordRegex.test(name)) {
    return <IconFont type="icon-doc" />;
  } else if (excelRegex.test(name)) {
    return <IconFont type="icon-excel" />;
  } else if (pdfRegex.test(name)) {
    return <IconFont type="icon-PDF" />;
  } else {
    return <FileTextOutlined />;
  }
};

const prefixCls = "upload-view-item";

interface IFileViewItem extends Pick<ProgressProps, "status" | "percent"> {
  src: string;
  name: string;
}

const FileViewItem = (props: IFileViewItem) => {
  return (
    <div
      className={classNames(prefixCls, {
        [`${prefixCls}-exception`]: props.status === "exception"
      })}
    >
      <div>{fileIcon(props.name, props.src)}</div>
      <div>
        <div className={`${prefixCls}-name`}>
          {props.name}
          <DeleteOutlined />
        </div>
        {props.status === "success" || props.status === "exception" ? null : (
          <Progress percent={props.percent} status={props.status} />
        )}
      </div>
    </div>
  );
};

export default FileViewItem;

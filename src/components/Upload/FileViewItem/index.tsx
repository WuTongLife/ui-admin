import IconFont from "@/components/IconFont";
import { imgRegex, pdfRegex, wordRegex, excelRegex } from "@/utils/regex";
import { FileTextOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Progress, ProgressProps } from "antd";
import classNames from "classnames";
import React from "react";
import "./index.less";

const fileIcon = (name: string, src?: string, preview?: any) => {
  if (imgRegex.test(name) && (src || preview)) {
    const strSrc = src?.startsWith("http")
      ? `${src}?x-oss-process=image/resize,m_fill,w_60,h_60,limit_0`
      : src || preview;
    return <Avatar src={strSrc} shape="square" size={60} />;
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
  src?: string;
  preview?: any; // base64
  name: string;
  onDelete: () => void;
  hiddenProgress?: boolean;
}

const FileViewItem = (props: IFileViewItem) => {
  const { status, percent, name, src, preview, onDelete, hiddenProgress } = props;
  return (
    <div
      className={classNames(prefixCls, {
        [`${prefixCls}-exception`]: status === "exception",
        [`${prefixCls}-active`]: status === "active"
      })}
    >
      <div>{fileIcon(name, src, preview)}</div>
      <div>
        <div className={`${prefixCls}-name`}>
          <span title={name}>{name}</span>
          <DeleteOutlined onClick={onDelete} />
        </div>
        {status === "success" || status === "exception" || hiddenProgress ? null : (
          <Progress percent={Math.floor(percent || 0)} status={status} />
        )}
      </div>
    </div>
  );
};

export default FileViewItem;

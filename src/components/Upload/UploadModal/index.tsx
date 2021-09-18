import { Modal, Upload } from "antd";
import React from "react";
import IconFont from "../../IconFont";
import FileViewItem from "../FileViewItem";
import "./index.less";

const { Dragger } = Upload;
const prefixCls = "upload-modal";

const UploadModal = () => {
  return (
    <Modal width={800} className={prefixCls} visible maskClosable={false}>
      <div className={`${prefixCls}-body`}>
        <Dragger className={`${prefixCls}-dragger`} multiple name="file" action="/api/upload/file">
          <p className="ant-upload-drag-icon">
            <IconFont type="icon-upload" />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
          <p className="ant-upload-hint">支持单个或批量上传</p>
        </Dragger>
        <div className={`${prefixCls}-list`}>
          <div className={`${prefixCls}-list_title`}>上传列表（上传中：1；成功：1；失败：1）</div>
          <div className={`${prefixCls}-list_content`}>
            <FileViewItem name="14130579.jpg" src="https://static.qqcywzc.cn/images/20210918/14130579.jpg" />
            <FileViewItem percent={30} name="xxxxxx.xlsx" src=".xlsx" status="active" />
            <FileViewItem percent={70} name="xxxxxx.docx" status="exception" src=".docx" />
            <FileViewItem percent={100} name="xxxxxx.pdf" src=".pdf" status="success" />
            <FileViewItem percent={30} name="xxxxxx.xlsx" src=".xlsx" status="active" />
            <FileViewItem percent={70} name="xxxxxx.docx" status="exception" src=".docx" />
            <FileViewItem percent={100} name="xxxxxx.pdf" src=".pdf" status="success" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;

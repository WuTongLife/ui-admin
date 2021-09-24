import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Button, message, Modal, ModalProps, Upload } from "antd";
import IconFont from "../../IconFont";
import FileViewItem from "../FileViewItem";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { getBase64 } from "@/utils/tool";
import { imgRegex } from "@/utils/regex";
import { manualUpload } from "@/services/file";
import "./index.less";

interface IUploadModalProps extends Pick<ModalProps, "visible" | "onCancel"> {
  isManual?: boolean; // 是否手动上传
  maxCount?: number;
  onChange?: (fileList: Common.IFile[]) => void;
}

const { Dragger } = Upload;
const prefixCls = "upload-modal";
const MAX_SIZE = 100 * 1024 * 1024;

const calculateFile = (files: Common.IFile[]) => {
  return {
    uploading: files.filter((d) => d.status === "active").length,
    success: files.filter((d) => d.status === "success").length,
    exception: files.filter((d) => d.status === "exception").length
  };
};

const UploadModal = (props: IUploadModalProps) => {
  const { isManual = false, visible, maxCount = 20, onChange, onCancel } = props;
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<Common.IFile[]>([]);
  const count = calculateFile(fileList);

  const handleChange = useCallback(async ({ file }: UploadChangeParam<UploadFile<API.IUploadResponse>>) => {
    if (isManual) {
      if (file instanceof Blob) {
        file.preview = await getBase64(file);
        setFileList((fileList) => [
          ...fileList,
          { uid: file.uid, name: file.name, preview: file.preview, originFileObj: file, status: "active" }
        ]);
      }
    } else {
      if (file.status === "error") {
        message.error("上传失败");
      }
      if (imgRegex.test(file.name) && !file.preview) {
        file.preview = await getBase64(file.originFileObj!);
      }
      const data = file.response?.data || [];
      const newFile: Common.IFile = {
        uid: file.uid,
        name: file.name,
        src: data[0]?.src,
        status: file.status === "error" ? "exception" : file.status === "uploading" ? "active" : "success",
        percent: file.percent,
        preview: file.preview
      };
      setFileList((fileList) => {
        const uids = fileList.map((d) => d.uid);
        if (uids.includes(file.uid)) {
          return fileList.map((d) => {
            if (d.uid === file.uid) {
              return newFile;
            }
            return d;
          });
        }
        return [...fileList, newFile];
      });
    }
  }, []);

  // 删除附件
  const onDelete = useCallback(
    (file: Common.IFile) => () => {
      setFileList((fileList) => [...fileList.filter((d) => d.uid !== file.uid)]);
    },
    []
  );

  // 上传限制
  const beforeUpload = useCallback(
    (file: RcFile, files: RcFile[]) => {
      const limitSize = file.size < MAX_SIZE;
      if (!limitSize) {
        message.error("附件最大100M");
      }
      const isMax = files.length > maxCount - fileList.length;
      if (isMax) {
        message.error(`最多上传${maxCount}份`);
      }
      return (limitSize && !isManual && !isMax) || Upload.LIST_IGNORE;
    },
    [fileList.length]
  );

  // 手动上传
  const handleUpload = () => {
    if (isManual) {
      const formData = new FormData();
      fileList.forEach((file) => {
        if (file.originFileObj instanceof Blob) {
          formData.append("files[]", file.originFileObj);
        }
      });
      setUploading(true);
      message.info("开始上传...");
      manualUpload(formData).then((res) => {
        setUploading(false);
        if (res?.code === 200) {
          const data = res.data;
          message.success("上传完成");
          if (data) {
            setFileList(
              fileList.map((d) => {
                if (d.src) return d;
                const resFile = data.find((f) => f.fileName === d.name);
                return {
                  name: d.name,
                  uid: d.uid,
                  src: resFile?.src,
                  status: resFile?.uploaded ? "success" : "exception",
                  fileName: resFile?.fileName,
                  id: resFile?.id
                };
              })
            );
          }
        } else {
          setFileList(
            fileList.map((d) => {
              if (d.src) return d;
              return {
                ...d,
                status: "exception"
              };
            })
          );
        }
      });
    } else {
      onOk();
    }
  };

  // 确定
  const onOk = () => {
    if (typeof onChange === "function") {
      onChange(fileList.filter((d) => d.status === "success"));
    }
  };

  return (
    <Modal
      width={800}
      confirmLoading={uploading}
      className={prefixCls}
      visible={visible}
      maskClosable={false}
      onCancel={onCancel}
      onOk={handleUpload}
      footer={
        isManual
          ? [
              <Button onClick={onCancel}>取消</Button>,
              <Button disabled={!!count.uploading} loading={uploading} onClick={handleUpload}>
                开始上传
              </Button>,
              <Button disabled={!count.uploading} loading={uploading} onClick={onOk}>
                确定
              </Button>
            ]
          : undefined
      }
    >
      <div className={`${prefixCls}-body`}>
        {useMemo(
          () => (
            <Dragger
              disabled={fileList.length >= maxCount}
              headers={{
                Authorization: localStorage.getItem("token") || ""
              }}
              showUploadList={false}
              className={`${prefixCls}-dragger`}
              multiple
              name="file"
              action="/api/upload/file"
              onChange={handleChange}
              beforeUpload={beforeUpload}
            >
              <p className="ant-upload-drag-icon">
                <IconFont type="icon-upload" />
              </p>
              <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
              <p className="ant-upload-hint">支持单个或批量上传，最多上传{maxCount}份</p>
            </Dragger>
          ),
          [fileList.length, isManual]
        )}
        <div className={`${prefixCls}-list`}>
          <div className={`${prefixCls}-list_title`}>
            上传列表（{fileList.length}）（上传中：{count.uploading}；成功：{count.success}；失败：{count.exception}）
          </div>
          <div className={`${prefixCls}-list_content`}>
            {fileList.map((file, index) => (
              <FileViewItem
                key={index}
                preview={file.preview}
                percent={file.percent}
                name={file.name}
                src={file.src}
                status={file.status}
                onDelete={onDelete(file)}
                hiddenProgress={isManual}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;

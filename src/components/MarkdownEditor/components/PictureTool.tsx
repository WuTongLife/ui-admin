// import CustomUpload from '@/components/CustomUpload';
import UploadModal from "@/components/Upload/UploadModal";
import { PictureOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";

interface IPictureToolProps {
  title?: string;
  uploadAfter: (src: string) => void;
}

const PictureTool = ({ title, uploadAfter }: IPictureToolProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <PictureOutlined title={title} onClick={() => setVisible(true)} />
      <UploadModal
        maxCount={1}
        onCancel={() => setVisible(false)}
        visible={visible}
        onChange={(files) => files[0]?.src && uploadAfter(files[0]?.src)}
      />
    </>
  );
};

export default PictureTool;

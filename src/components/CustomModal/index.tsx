import React, { FC } from "react";
import { Modal, ModalProps } from "antd";

const CustomModal: FC<ModalProps> = (props) => {
  return <Modal {...props} />;
};

export default CustomModal;

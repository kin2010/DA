import React, { useState } from "react";
import { Button, Modal } from "antd";

const ModalCommon = (props) => {
  const { open, setOpen, children, footer, ok, cancel, title } = props;

  const showModal = () => {
    // setOpen(true);
  };

  const handleOk = () => {
    //
  };

  const handleCancel = () => {
    if (!!cancel) {
      cancel();
    }
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        title={title}
        onOk={!!ok ? ok() : handleOk}
        onCancel={handleCancel}
        footer={footer || <></>}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalCommon;

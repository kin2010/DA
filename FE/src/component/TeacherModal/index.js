import React, { useState } from "react";
import { Modal, Select } from "antd";
import VirtualList from "rc-virtual-list";
import { Avatar, List } from "antd";

const TeacherModal = ({ open, setOpen, changee, data, ids }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const ContainerHeight = 400;

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <List>
          <VirtualList
            unselectable="off"
            data={data}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="email"
          >
            {(item) => (
              <List.Item key={item?.email}>
                <List.Item.Meta
                  style={{
                    background: ids.includes(item?._id) ? "#f1f1f1" : "",
                  }}
                  onClick={() => changee(item?._id)}
                  avatar={<Avatar src={item?.picture?.large} />}
                  title={<a href="https://ant.design">{item?.fullName}</a>}
                  description={item?.email}
                />
              </List.Item>
            )}
          </VirtualList>
        </List>
        <p>{modalText}</p>
      </Modal>
    </>
  );
};
export default TeacherModal;

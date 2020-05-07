import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";

function CancelReserve(props) {
  const [visible, setVisible] = useState(false);
  const showModal = (e) => {
    console.log(e);
    setVisible(true);
  };
  const handleOk = (e) => {
    props.deleteReserve(props.id);
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <Button onClick={showModal} type="danger">
        ลบการจองนี้
      </Button>
    </div>
  );
}

export default CancelReserve;

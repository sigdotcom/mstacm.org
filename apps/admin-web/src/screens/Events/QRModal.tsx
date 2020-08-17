import React from "react";

import { IEvent } from "./interfaces";
import Modal from "antd/lib/modal/Modal";

var QRCode = require('qrcode.react');

interface IQRModalProps {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  event?: IEvent;
}

const QRModal: React.FC<IQRModalProps> = ({
  visible,
  setVisible,
  event,
}: IQRModalProps): JSX.Element => {
  const handleCancel: () => void = (): void => {
    setVisible(false);
  };

  const registrationLink: string = "https://mstacm.org/e/" + event?.urlKey; 

  return (
    <Modal
      title={"Registration Link"}
      visible={visible}
      footer={null}
      onCancel={handleCancel}
    >
      <h2>{registrationLink}</h2>
      <QRCode value={registrationLink} />
    </Modal>
  );
};

export { QRModal };
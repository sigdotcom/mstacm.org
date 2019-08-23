import { Modal } from "antd";
import React, { useState } from "react";

import { EventForm } from "./EventForm";
import { IEvent } from "./interfaces";

interface IEventFormProps {
  event?: IEvent;
  visible: boolean;
  setVisible: any;
}

const EventFormModal: React.FC<IEventFormProps> = (
  props: IEventFormProps
): any => {
  const [confirmLoading, setConfirmLoading]: any = useState(false);

  const handleCancel: any = (): void => {
    props.setVisible(false);
  };

  const action: string = event ? "Edit" : "Add";

  return (
    <Modal
      title={action + " Event"}
      visible={props.visible}
      confirmLoading={confirmLoading}
      footer={null}
      onCancel={handleCancel}
    >
      <EventForm
        key={props.visible}
        setConfirmLoading={setConfirmLoading}
        event={props.event}
      />
    </Modal>
  );
};

export { EventFormModal };

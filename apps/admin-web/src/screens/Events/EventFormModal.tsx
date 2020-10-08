import React from "react";
import { Modal } from "antd";

import { EventForm } from "./EventForm";
import { IEvent } from "./interfaces";

interface IEventFormModalProps {
  formVisible: boolean;
  setFormVisible: (arg: boolean) => void;
  event?: IEvent;
}

const EventFormModal: React.FC<IEventFormModalProps> = ({
  formVisible,
  setFormVisible,
  event,
}: IEventFormModalProps): JSX.Element => {
  const handleCancel: () => void = (): void => {
    setFormVisible(false);
  };

  const action: string = `${event ? "Edit" : "Add"} Event`;

  return (
    <Modal
      title={action}
      visible={formVisible}
      footer={null}
      onCancel={handleCancel}
    >
    <EventForm eventBase={event} />
    </Modal>
  );
};

export { EventFormModal };

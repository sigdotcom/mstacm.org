import { Modal } from "antd";
import React, { useGlobal, useState } from "reactn";

import { EventForm } from "./EventForm";

const EventFormModal: React.FC<{}> = (): JSX.Element => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [eventFormVisible, setEventFormVisible] = useGlobal("eventFormVisible");

  const handleCancel: () => void = (): void => {
    setEventFormVisible(false);
  };

  const action: string = `${event ? "Edit" : "Add"} Event`;

  return (
    <Modal
      title={action}
      visible={eventFormVisible}
      confirmLoading={confirmLoading}
      footer={null}
      onCancel={handleCancel}
    >
      <EventForm key={eventFormVisible} setConfirmLoading={setConfirmLoading} />
    </Modal>
  );
};

export { EventFormModal };

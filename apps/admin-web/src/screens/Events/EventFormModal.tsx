import { Modal } from "antd";
import React, { useGlobal } from "reactn";

import { EventForm } from "./EventForm";

const EventFormModal: React.FC<{}> = (): JSX.Element => {
  const [eventFormVisible, setEventFormVisible] = useGlobal("eventFormVisible");

  const handleCancel: () => void = (): void => {
    setEventFormVisible(false);
  };

  const action: string = `${eventFormVisible ? "Edit" : "Add"} Event`;

  return (
    <Modal
      title={action}
      visible={eventFormVisible}
      footer={null}
      onCancel={handleCancel}
    >
      <EventForm />
    </Modal>
  );
};

export { EventFormModal };

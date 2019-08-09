import React, { useState } from "react";

import { useQuery } from "@apollo/react-hooks";
import debug from "debug";

import { Button, Form } from "antd";
import Modal from "react-modal";
import styled from "styled-components";

import { AdvertForm } from "./AdvertForm";
import Event from "./Event";
import EventForm from "./EventForm";
import { /*getEvents,*/ GET_EVENTS, updateEvent } from "./helpers";
import { IEvent } from "./interfaces";

const log: any = debug("warden:events");
log.log = console.log.bind(console);

Modal.setAppElement("#root");

const PageWrapper: any = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 800px;
`;
const EventsList: any = styled.ul`
  padding: 0;
  margin: 0;
`;
const Header: any = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Events: React.FC<{}> = (): any => {
  const [modalOpen, setModalOpen]: any = useState(false);
  const [editData, setEditData]: any = useState(undefined);
  const [editing, setEditing]: any = useState(false);
  const [advert, setAdvert]: any = useState(false);

  const { loading, error, data }: any = useQuery(GET_EVENTS);
  const events: IEvent[] = data.events;
  log("Refreshed page");

  const closeModal: any = (): any => {
    setAdvert(false);
    setEditData({});
    setModalOpen(false);
  };

  const addEvent: any = (): any => {
    setEditData({});
    setEditing(false);
    setModalOpen(true);
  };

  const editEvent: any = (data: any): any => {
    const copyData: any = JSON.parse(JSON.stringify(data));
    copyData.hostSigs = data.hostSigs.name;
    setEditData(copyData);
    setEditing(true);
    setModalOpen(true);
  };

  const advertiseEvent: any = (data: any): any => {
    setAdvert(true);
    setEditData(data);
    setModalOpen(true);
  };
  const deleteEvent: any = (id: number): any => {
    /*
    this.request("DELETE", id.toString(), null, {}, (result: any) => {
      this.refresh();
      log("Deleted event " + id);
    });
    */
    // TODO
  };

  const postEvent: any = (data: any, headerOverride: any = null): any => {
    /*
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(data);
    this.request("POST", "", body, headers, (result: any) => {
      this.closeModal();
      this.refresh();
    });
    */
    // TODO
  };

  const patchEvent: any = (data: any): any => {
    updateEvent(data);
  };

  const changeValue: any = (field: string, event: any): any => {
    editData[field] = event.target.value;
    setEditData(editData);
  };

  const handleChange: any = (field: string): any => {
    return (event: any): any => changeValue(field, event);
  };

  let content: any;
  let innerModal: any;
  const intent: string = editing ? "Edit" : "Add";

  const ModEvent: any = Form.create({ name: "modify" })(EventForm);
  const AdEvent: any = Form.create({ name: "advert" })(AdvertForm);

  if (advert) {
    innerModal = <AdEvent addEvent={addEvent} data={editData} />;
  } else {
    innerModal = (
      <div>
        <h1>{intent} Event Details</h1>
        <ModEvent
          editing={editing}
          postEvent={postEvent}
          patchEvent={patchEvent}
          handleChange={handleChange}
          editData={editData}
        />
      </div>
    );
  }

  const modal: any = (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      contentLabel={intent + "Event"}
    >
      <Button onClick={closeModal}>Close</Button>
      {innerModal}
    </Modal>
  );

  if (loading) {
    content = <h3>Loading...</h3>;
  } else if (error) {
    content = <h3>Error: {error.toString()}</h3>;
  } else {
    content = events.map((event: IEvent) => {
      return (
        <Event
          advertiseEvent={advertiseEvent}
          createQR={advertiseEvent}
          event={event}
          deleteEvent={deleteEvent}
          editEvent={editEvent}
          key={event.id}
        />
      );
    });
  }

  return (
    <PageWrapper>
      <Header>
        <h1>Events</h1>
        <Button onClick={addEvent}>Add Event</Button>
      </Header>
      {modal}
      <EventsList>{content}</EventsList>
    </PageWrapper>
  );
};

export { Events };

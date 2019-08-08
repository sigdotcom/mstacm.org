import { Button, Form } from "antd";
import * as React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import AdvertForm from "./AdvertForm";
import Event from "./Event";
import EventForm from "./EventForm";
import { IEvent } from "./interfaces";

import debug from "debug";

const log: any = debug("warden:events");
log.log = console.log.bind(console);

Modal.setAppElement("#root");

interface IEventsState {
  error: any;
  events: IEvent[];
  isLoaded: boolean;
  modalIsOpen: boolean;
  editData: any;
  editing: boolean;
  advert: boolean;
}

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

class Events extends React.Component<{}, IEventsState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      advert: false,
      editData: {},
      editing: true,
      error: null,
      events: [],
      isLoaded: false,
      modalIsOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public componentDidMount = (): any => {
    this.refresh();
  };

  public render = (): any => {
    const {
      events,
      isLoaded,
      error,
      modalIsOpen,
      editData,
      editing,
      advert
    }: any = this.state;

    let content: any;
    let innerModal: any;
    const intent: string = editing ? "Edit" : "Add";

    const ModEvent: any = Form.create({ name: "modify" })(EventForm);
    const AdEvent: any = Form.create({ name: "advert" })(AdvertForm);

    if (advert) {
      innerModal = <AdEvent sendEvent={this.sendEvent} data={editData} />;
    } else {
      innerModal = (
        <div>
          <h1>{intent} Event Details</h1>
          <ModEvent
            editing={editing}
            postEvent={this.postEvent}
            patchEvent={this.patchEvent}
            handleChange={this.handleChange}
            editData={editData}
          />
        </div>
      );
    }

    const modal: any = (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel={intent + "Event"}
      >
        <Button onClick={this.closeModal}>Close</Button>
        {innerModal}
      </Modal>
    );

    if (!isLoaded) {
      content = <h3>Loading...</h3>;
    } else if (error) {
      content = <h3>Error: {error.toString()}</h3>;
    } else {
      content = events.map((event: IEvent, index: number) => {
        return (
          <Event
            advertiseEvent={this.advertiseEvent}
            createQR={this.advertiseEvent}
            event={event}
            deleteEvent={this.deleteEvent}
            editEvent={this.editEvent}
            key={index}
          />
        );
      });
    }

    return (
      <PageWrapper>
        <Header>
          <h1>Events</h1>
          <Button onClick={this.addEvent}>Add Event</Button>
        </Header>
        {modal}
        <EventsList>{content}</EventsList>
      </PageWrapper>
    );
  };

  private closeModal = (): any => {
    this.setState({
      advert: false,
      editData: {},
      modalIsOpen: false
    });
  };

  private addEvent = (event: any): any => {
    this.setState({
      editData: {},
      editing: false,
      modalIsOpen: true
    });
  };

  private editEvent = (data: any): any => {
    const copyData: any = JSON.parse(JSON.stringify(data));
    copyData.hostSigs = data.hostSigs.name;
    this.setState({
      editData: copyData,
      editing: true,
      modalIsOpen: true
    });
  };

  private advertiseEvent = (data: any): any => {
    this.setState({
      advert: true,
      editData: data,
      modalIsOpen: true
    });
  };

  private refresh = (): void => {
    this.request("GET", "", null, null, (result: any) => {
      this.setState({
        events: result
      });
      log("Refreshed page");
    });
  };

  private deleteEvent = (id: number): any => {
    this.request("DELETE", id.toString(), null, {}, (result: any) => {
      this.refresh();
      log("Deleted event " + id);
    });
  };

  private sendEvent = (body: any, fin: boolean): any => {
    console.log("BODY", body);
    fetch("http://localhost/api/v1/mail/", {
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then((res: any): any => res.text())
      .then(
        (result: any): any => {
          log(
            "Attempting to email " +
              JSON.stringify(body.personalizations[0].to) +
              " got " +
              result
          );
          if (fin) {
            this.closeModal();
          }
        },
        (error: Error) => {
          log("Failed to send event with error message: " + error.toString());
        }
      );
  };

  private postEvent = (data: any, headerOverride: any = null): any => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(data);
    this.request("POST", "", body, headers, (result: any) => {
      this.closeModal();
      this.refresh();
    });
  };

  private patchEvent = (data: any): any => {
    const headers: any = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body: any = JSON.stringify(data);
    this.request("PATCH", data.id.toString(), body, headers, (result: any) => {
      this.closeModal();
      this.refresh();
    });
  };

  private request = (
    method: string,
    postUrl: string,
    data: string | null,
    headers: any,
    callback: any
  ): any => {
    const info: any = { method };
    if (headers) {
      info.headers = headers;
    }
    if (data) {
      info.body = data;
    }

    console.log("http://localhost/api/v1/events/" + postUrl);
    fetch("http://localhost/api/v1/events/" + postUrl, info)
      .then(res => res.json())
      .then(
        (result: any): any => {
          callback(result);
          this.setState({
            isLoaded: true
          });
        },
        (error: any): any => {
          this.setState({
            error,
            isLoaded: true
          });
          log("Failed to make request. Error message: " + error.toString());
        }
      );
  };

  private changeValue = (field: string, event: any): any => {
    const { editData }: any = this.state;
    editData[field] = event.target.value;
    this.setState({ editData });
  };

  private handleChange = (field: string): any => {
    return (event: any): any => this.changeValue(field, event);
  };
}
export { Events };

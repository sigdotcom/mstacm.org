import Modal from "react-modal"
import * as React from "react"
import styled from "styled-components"
import { Form, Button } from 'antd'

import Event from "./Event"
import EventForm from "./EventForm"
import AdvertForm from "./AdvertForm"
import { IEvent } from "./interfaces"

import debug from "debug"

const log = debug("warden:events")
log.log = console.log.bind(console);

Modal.setAppElement('#root')

interface IEventsState {
  error: any;
  events: IEvent[];
  isLoaded: boolean;
  modalIsOpen: boolean;
  editData: any;
  editing: boolean;
  advert: boolean;
}

const PageWrapper = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 800px;
`
const EventsList = styled.ul`
  padding: 0;
  margin: 0;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

class Events extends React.Component<{}, IEventsState> {
  public constructor(props: {}) {
    super(props)

    this.state = {
      error: null,
      events: [],
      isLoaded: false,
      modalIsOpen: false,
      editData: {},
      editing: true,
      advert: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  private closeModal() {
    this.setState({
      modalIsOpen: false,
      editData: {},
      advert: false
    });
  }

  public componentDidMount() {
    this.refresh();
  }

  private addEvent = (event: any) => {
    this.setState({
      modalIsOpen: true,
      editData: {},
      editing: false
    });
  }

  private editEvent = (data: any) => {
    let copyData = JSON.parse(JSON.stringify(data))
    copyData["hostSigs"] = data["hostSigs"].name
    this.setState({
      modalIsOpen: true,
      editData: copyData,
      editing: true
    });
  }

  private advertiseEvent = (data: any) => {
    this.setState({
      modalIsOpen: true,
      advert: true,
      editData: data
    });
  }

  private refresh = () => {
    this.request("GET", "", null, null, (result: any) => {
      this.setState({
        events: result,
      });
      log("Refreshed page")
    });
  }

  private deleteEvent = (id: number) => {
    this.request("DELETE", id.toString(), null, {}, (result: any) => {
      this.refresh()
      log("Deleted event " + id)
    });
  }

  private sendEvent = (body: any, fin: boolean) => {
    console.log("BODY", body)
    fetch("http://localhost/api/v1/mail/", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(res => res.text())
      .then(
        (result) => {
          log("Attempting to email " + JSON.stringify(body.personalizations[0].to) + " got " + result)
          if (fin) this.closeModal()
        },
        (error: Error) => {
          log("Failed to send event with error message: " + error.toString())
        }
      )

  }

  private postEvent = (data: any, headerOverride: any = null) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
    const body = JSON.stringify(data)
    this.request("POST", "", body, headers, (result: any) => {
      this.closeModal()
      this.refresh()
    });
  }

  private patchEvent = (data: any) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(data)
    this.request("PATCH", data.id.toString(), body, headers, (result: any) => {
      this.closeModal()
      this.refresh()
    });
  }

  private request = (method: string, postUrl: string, data: string | null, headers: any, callback: any) => {
    let info: any = { method };
    if (headers) info.headers = headers
    if (data) info.body = data

    fetch("http://localhost/api/v1/events/" + postUrl, info)
      .then(res => res.json())
      .then(
        (result) => {
          callback(result)
          this.setState({
            isLoaded: true
          })
        },
        (error) => {
          this.setState({
            error,
            isLoaded: true
          });
          log("Failed to make request. Error message: " + error.toString())
        }
      )
  }

  private changeValue = (field: string, event: any) => {
    let { editData } = this.state;
    editData[field] = event.target.value
    this.setState({editData: editData});
  }

  private handleChange = (field: string) => {
    return (event: any) => this.changeValue(field, event)
  }

  public render() {
    const {
      events,
      isLoaded,
      error,
      modalIsOpen,
      editData,
      editing,
      advert
    } = this.state;

    let content;
    let innerModal;
    const intent = editing ? "Edit" : "Add";

    const ModEvent = Form.create({ name: 'modify' })(EventForm);
    const AdEvent = Form.create({ name: 'advert' })(AdvertForm);

    if (advert) {
      innerModal = (
        <AdEvent
          sendEvent={this.sendEvent}
          data={editData}
        />
      )
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
      )
    }

    const modal = (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel={intent + "Event"}
      >
        <Button onClick={this.closeModal}>Close</Button>
        {innerModal}
      </Modal>
    )

    if (!isLoaded) {
      content = (
        <h3>Loading...</h3>
      )
    } else if (error) {
      content = (
        <h3>Error: {error.toString()}</h3>
      )
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
          )
      })
    }

    return (
      <PageWrapper>
        <Header>
          <h1>Events</h1>
          <Button onClick={this.addEvent}>Add Event</Button>
        </Header>
        {modal}
        <EventsList>
          {content}
        </EventsList>
      </PageWrapper>
    );
  }
}
export { Events };

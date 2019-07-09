import moment from "moment";
import * as React from "react"
import styled from "styled-components"

import { Button } from "antd"

interface ISig {
  dateFounded: Date;
  description: string;
  name: string;
}

interface IEvent {
  dateCreated: Date;
  dateExpire: Date;
  dateHosted: Date;
  description: string;
  eventLink: string;
  eventTitle: string;
  flierLink: string;
  id: number;
  location: string;
  hostSigs: ISig;
}

interface IEventProps {
  event: IEvent;
  key: number;
  editEvent: any;
  deleteEvent: any;
  advertiseEvent: any;
  createQR: any;
}

const EventWrapper = styled.li`
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
`
const EventContent = styled.div`
  display: flex;
  align-items: center;
`
const EventFlier = styled.img`
  height: 88px;
  width: 68px;
  margin-right: 20px;
`
const EventDetails = styled.div`
`
const EventHighLevel = styled.div`
  display: flex;
`
const EventTitle = styled.h3`
  margin: 0;
  line-height: 20px;
`
const EventDate = styled.p`
  padding: 0 6px;
  margin: 0 0 0 20px;
  border-radius: 20px;
  border: 2px solid blue;
`
const EventMidLevel = styled.div`
`
const EventDescription = styled.div`
`
const EventLowLevel = styled.div`
`


class Event extends React.Component<IEventProps, {}> {
  public constructor(props: IEventProps) {
    super(props)
  }

  formatDate = (date: Date) => {
    return moment(date).format("MMMM Do h:mmA");
  }

  handleEdit = () => {
    this.props.editEvent(this.props.event);
  }

  handleDelete = () => {
    this.props.deleteEvent(this.props.event.id);
  }

  handleAdvert = () => {
    this.props.advertiseEvent(this.props.event);
  }
  
  handleQR = () => {
    this.props.createQR(this.props.event.id);
  }

  render() {
    const { event } = this.props;
    return (
      <EventWrapper>
        <EventContent>
          <EventFlier src={event.flierLink} alt={"Flier"} />
          <EventDetails>
            <EventHighLevel>
              <EventTitle>ACM {event.hostSigs.name}: {event.eventTitle}</EventTitle>
              <EventDate>
                {this.formatDate(event.dateHosted)}{event.dateHosted !== event.dateExpire && (" - " + this.formatDate(event.dateExpire))}
              </EventDate>
            </EventHighLevel>
            <EventMidLevel>
              {event.location}{event.eventLink && (<span> - <a href={event.eventLink}>Link</a></span>)}
            </EventMidLevel>
            <EventDescription>{event.description}</EventDescription>
            <EventLowLevel>Created {this.formatDate(event.dateCreated)}</EventLowLevel>
          </EventDetails>
        </EventContent>
        <div>
          <div>
            <Button onClick={this.handleEdit}>Edit</Button>
            <Button onClick={this.handleDelete}>Delete</Button>
          </div>
          <div>
            <Button onClick={this.handleAdvert}>Advert</Button>
            <Button onClick={this.handleQR}>QR</Button>
          </div>
        </div>
      </EventWrapper>
    );
  }
}

export default Event

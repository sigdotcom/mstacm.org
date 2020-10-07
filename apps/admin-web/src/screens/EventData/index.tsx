import React, { useEffect, useState } from "react";
import { Statistic, Row, Col, Table, message } from 'antd';
import { IEvent, IUser } from "./interfaces";
import { useEventsWithKeyQuery } from "../../generated/graphql";

const EventData: React.FC<{match: any}> = ({match}: any) => {
//   const statStyle = {
//     fontSize: 35,
//     fontWeight: 100,
//   }

  const eventUrlKey: string = match.params.eventId;

  const [event, setEvent] = useState<IEvent>();
  const [attendees, setAttendees] = useState<IUser[]>();
  const [usersInterested, setUsersInterested] = useState<IUser[]>();

  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  }: any = useEventsWithKeyQuery({variables: { urlKey: eventUrlKey }});

  useEffect(() => {
    if (eventLoading)
      message.info("Event data loading...");
    else if (eventError)
      message.info("An error occured loading event data.");
    else if (eventData) {
      setEvent((eventData.eventsWithKey)[0]);
      //message.success("Event data loading complete!");
    }
  }, [eventData, eventError, eventLoading]);

  useEffect(() => {
    if(event != undefined) {
        setAttendees(event.attendees);
        setUsersInterested(event.usersInterested);
    }
  }, [event]);

  if(eventUrlKey == null)
    return <p>This event does not exist.</p>

  const ordinal_suffix: Function = (num: number) => {
    let j = num % 10,
        k = num % 100;
    if (j == 1 && k != 11)
        return "st";
    if (j == 2 && k != 12)
        return "nd";
    if (j == 3 && k != 13)
        return "rd";

    return "th";
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (record: IUser) => (
        <span>{`${record.firstName} ${record.lastName}`}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    }
  ];

  return (
    <div>
      <h2>{event?.eventTitle} Data</h2>

      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="Interested Users" value={19} />
        </Col>
        <Col span={6}>
          <Statistic title="Attendees" value={12} />
        </Col>
        <Col span={6}>
          <Statistic title="Ratio Interested : Attended" value={(12/19) * 100} precision={2} suffix={"%"} />
        </Col>
        <Col span={6}>
          <Statistic title="Attendance Ranking" value={4} suffix={ordinal_suffix(4)}/>
        </Col>
      </Row>

      <br />

      <h2>Interested Users</h2>

      <Table columns={columns} dataSource={usersInterested} />

      <br />

      <h2>Attendees</h2>

      <Table columns={columns} dataSource={attendees} />
    </div>
  );
};

export { EventData };
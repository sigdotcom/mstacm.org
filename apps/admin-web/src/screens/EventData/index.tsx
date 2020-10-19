import React, { useEffect, useState } from "react";
import { Statistic, Row, Col, Table, message } from 'antd';
import { ExportToCsv } from "export-to-csv";
import { IEvent, IUser } from "./interfaces";
import { QRModal } from "./QRModal"
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
  const [QRVisible, setQRVisible] = useState(false);

  let attendeeEmails: string[] = [];

  const csvOptions = { 
    filename: 'email addresses',
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Attendee Emails',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

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

  useEffect(() => {
    if(attendees != undefined) {
      attendeeEmails = attendees?.map(attendees => attendees.email);
      console.log(attendeeEmails)
    }
  }, [attendees]);

  if(eventUrlKey == null)
    return <p>This event does not exist.</p>

  const get_ratio: Function = () => {
    if(usersInterested != undefined && attendees != undefined && attendees.length != 0)
      return (usersInterested.length / attendees.length) * 100
    return null
  };

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

  const handleQR: () => void = (): void => {
    setQRVisible(true);
  };

  const downloadAttendeeCSV: () => void = (): void => {
    const csvExporter = new ExportToCsv(csvOptions);
    csvExporter.generateCsv(attendeeEmails);
  };

  return (
    <div>
      <h2 style={{fontSize: 35, marginBottom: 0}}>{event?.eventTitle} Data</h2>

      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="Interested Users" value={usersInterested?.length} />
        </Col>
        <Col span={6}>
          <Statistic title="Attendees" value={attendees?.length} />
        </Col>
        <Col span={6}>
          <Statistic title="Ratio Interested : Attended" value={get_ratio()} precision={2} suffix={"%"} />
        </Col>
        <Col span={6}>
          <Statistic title="Attendance Ranking" value={4} suffix={ordinal_suffix(4)}/>
        </Col>
      </Row>

      <br />
      <br />

      <Row gutter={16}>
        <Col span={3}>
          <h2 style={{fontSize: 20}}>Interested Users</h2>
        </Col>
        <Col span={3}>
        </Col>
        <Col span={3}>
        </Col>
      </Row>

      {/*<div style={{float: "left"}}><h2 style={{fontSize: 20}}>Interested Users</h2></div>*/}
      {/*<div style={{float: "left", marginLeft: 50, marginTop: 5}}><a style={{fontSize: 16, textDecoration: "underline"}} onClick={handleQR}>Registration Link / QR</a></div> */}
      {/*<div style={{float: "left", marginLeft: 50, marginTop: 5}}><Button onClick={handleQR}>QR</Button></div>*/}

      <Table columns={columns} dataSource={usersInterested} />

      <br />

      <Row gutter={16}>
        <Col span={3}>
          <h2 style={{fontSize: 20}}>Attendees</h2>
        </Col>
        <Col span={3}>
          <a style={{fontSize: 16, textDecoration: "underline"}} onClick={handleQR}>Registration Link / QR</a>
        </Col>
        <Col span={3}>
          <a style={{fontSize: 16, textDecoration: "underline"}} onClick={downloadAttendeeCSV}>Download Email CSV</a>
        </Col>
      </Row>

      {/* <div style={{float: "left"}}><h2 style={{fontSize: 20}}>Attendees</h2></div>
      <div style={{float: "left", marginLeft: 50, marginTop: 2}}><a style={{fontSize: 16, textDecoration: "underline"}} onClick={handleQR}>Registration Link / QR</a></div> */}
      {/*div style={{float: "left", marginLeft: 50, marginTop: 2}}><a style={{fontSize: 16, textDecoration: "underline"}} onClick={downloadAttendeeCSV}>Download Email CSV</a></div>*/}

      <Table columns={columns} dataSource={attendees} />

      <QRModal
        visible={QRVisible}
        setVisible={setQRVisible}
        eventUrlKey={eventUrlKey}
      />
    </div>
  );
};

export { EventData };
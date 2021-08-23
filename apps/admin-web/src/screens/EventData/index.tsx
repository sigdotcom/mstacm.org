import React, { useEffect, useState } from "react";
import { Statistic, Row, Col, Table, message } from 'antd';
import { ExportToCsv } from "export-to-csv";
import { IUser, IEvent, IYearEvent } from "./interfaces";
import { QRModal } from "./QRModal"
import { EventsWithKeyQueryHookResult,
         useEventsWithKeyQuery,
         useYearEventsQuery, 
         YearEventsQueryHookResult} from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

interface IMatchParams {
  eventId: string;
}

const EventData: React.FC<RouteComponentProps<IMatchParams>> = (props) => {
  const eventUrlKey: string = props.match.params.eventId;

  const [event, setEvent] = useState<IEvent>();
  const [attendees, setAttendees] = useState<IUser[]>();
  const [usersInterested, setUsersInterested] = useState<IUser[]>();

  const [yearEvents, setYearEvents] = useState<IYearEvent[]>();
  const [attendancePlace, setAttendancePlace] = useState<number>();

  const [QRVisible, setQRVisible] = useState(false);

  const [qrKey, setQrKey] = useState<string>();

  const csvOptions = { 
    filename: 'email addresses',
    fieldSeparator: ',',
    quoteStrings: '',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Emails',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    headers: ['Emails']
  };

  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  }: EventsWithKeyQueryHookResult = useEventsWithKeyQuery({pollInterval: 500, variables: { urlKey: eventUrlKey }});

  const {
    loading: yearEventsLoading,
    error: yearEventsError,
    data: yearEventsData,
  }: YearEventsQueryHookResult = useYearEventsQuery({pollInterval: 500});

  useEffect(() => {
    if (eventLoading)
      message.info("Event data loading...");
    else if (eventError)
      message.info("An error occured loading event data.");
    else if (eventData) {
      setEvent((eventData.eventsWithKey)[0] as IEvent);
    }
  }, [eventData, eventError, eventLoading]);

  useEffect(() => {
    if (yearEventsError) {
      message.info("An error occured loading year event data.");
    }
    else if (yearEventsData) {
      setYearEvents(yearEventsData.yearEvents as IYearEvent[]);
    }
  }, [yearEventsData, yearEventsError, yearEventsLoading]);

  useEffect(() => {
    if(event !== undefined) {
        setAttendees(event.attendees);
        setUsersInterested(event.usersInterested);
    }
  }, [event]);

  useEffect(() => {
    if(yearEvents !== undefined) {
      setYearEvents(yearEvents.sort((a,b) => (a.numAttendees > b.numAttendees) ? -1 : ((b.numAttendees > a.numAttendees) ? 1 : 0)));
      setAttendancePlace(yearEvents.map(function(e) { return e.urlKey }).indexOf(eventUrlKey) + 1);
    }
  }, [yearEvents]);

  if(eventUrlKey === null || !event)
    return <p>This event does not exist.</p>

  const get_ratio: Function = () => {
    if(usersInterested !== undefined && attendees !== undefined && attendees.length !== 0)
      return (usersInterested.length / attendees.length) * 100
    return "N/A"
  };

  const ordinal_suffix: Function = (num: number) => {
    let j = num % 10,
        k = num % 100;
    if (j === 1 && k !== 11)
        return "st";
    if (j === 2 && k !== 12)
        return "nd";
    if (j === 3 && k !== 13)
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

  const handleQR: Function = (choice: number) => {
    if (choice === 0)
      setQrKey("e/" + eventUrlKey);
    else if (choice === 1)
      setQrKey("i/" + eventUrlKey);

    setQRVisible(true);
  };

  const downloadInterestCSV: () => void = (): void => {
    csvOptions.filename = "interest_emails";
    csvOptions.title = "Interested Users";
    const csvExporter = new ExportToCsv(csvOptions);
    const columns: any = usersInterested?.map(obj => ({Email: obj.email, Name: obj.firstName + " " + obj.lastName}))
    csvExporter.generateCsv(columns);
  };

  const downloadAttendeeCSV: () => void = (): void => {
    csvOptions.filename = "attendee_emails";
    csvOptions.title = "Attendees";
    const csvExporter = new ExportToCsv(csvOptions);
    const columns: any = attendees?.map(obj => ({Email: obj.email, Name: obj.firstName + " " + obj.lastName}))
    csvExporter.generateCsv(columns);
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
          <Statistic title="Attendance Ranking" value={attendancePlace} suffix={ordinal_suffix(attendancePlace)}/>
        </Col>
      </Row>

      <br />
      <br />

      <Row gutter={16}>
        <Col span={3}>
          <h2 style={{fontSize: 20}}>Interested Users</h2>
        </Col>
        <Col span={3}>
          <a style={{fontSize: 16, textDecoration: "underline"}} onClick={() => handleQR(1)}>Interest Link / QR</a>
        </Col>
        <Col span={3}>
          <a style={{fontSize: 16, textDecoration: "underline"}} onClick={downloadInterestCSV}>Download Email CSV</a>
        </Col>
      </Row>

      <Table columns={columns} dataSource={usersInterested} />

      <br />

      <Row gutter={16}>
        <Col span={3}>
          <h2 style={{fontSize: 20}}>Attendees</h2>
        </Col>
        <Col span={3}>
          <a style={{fontSize: 16, textDecoration: "underline"}} onClick={() => handleQR(0)}>Registration Link / QR</a>
        </Col>
        <Col span={3}>
          <a style={{fontSize: 16, textDecoration: "underline"}} onClick={downloadAttendeeCSV}>Download Email CSV</a>
        </Col>
      </Row>

      <Table columns={columns} dataSource={attendees} />

      <QRModal
        visible={QRVisible}
        setVisible={setQRVisible}
        eventUrlKey={qrKey}
      />
    </div>
  );
};

export { EventData };
import React, { useState } from "react";

import styled from "styled-components";

import { GET_EVENTS } from "./helpers";
import { useDeleteEventMutation } from "../../generated/graphql";
import { IEvent } from "./interfaces";
import { EventFormModal } from "./EventFormModal";

interface IEventProps {
  event: IEvent;
  index: number;
  key: number;
}
const Box = styled.div`
  height: 226px;
  max-width: 912px;
  background-color: white;
  border-radius: 12px;
  padding-top: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  font-family: Nunito Sans;
  padding-bottom: 20px;
  @media (max-width: 900px) {
    width: auto;
  }
`;
const Space = styled.div`
  padding-bottom: 15px;
`;
const Constraint = styled.div`
  display: flex;
  height: 100%;
  max-width: 612px;
  margin: auto;
  display: flex;
  transition: all 0.2s ease-in-out;
  flex-direction: column;
  float: right;
  @media (max-width: 900px) {
    padding: 5px;
  }
  @media (max-width: 750px) {
    max-width: 800px;
  }
`;
const Group = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 750px) {
    justify-content: center;
  }
`;
const Title = styled.div`
  display: inline-block;
  font-size: 24px;
  font-family: Nunito Sans;
  padding-right: 20px;
  font-weight: 300;
  color: #333333;
  @media (max-width: 900px) {
    font-size: 20px;
  }
  @media (max-width: 380px) {
    font-size: 17px;
  }
  @media (max-width: 300px) {
    font-size: 14px;
  }
`;

const Time = styled.div`
  font-weight: bold;
  font-size: 18px;
  font-family: Nunito Sans;
  display: flex;
  @media (max-width: 900px) {
    font-size: 14px;
  }
  @media (max-width: 380px) {
    font-size: 11px;
  }
`;
const Description = styled.div`
  font-weight: 300;
  font-size: 18px;
  font-family: Nunito Sans;
  padding-bottom: 20px;
  color: #555555;
  word-wrap: break-word;
  @media (max-width: 900px) {
    font-size: 14px;
  }
  @media (max-width: 380px) {
    font-size: 11px;
  }
`;
const Edit = styled.button`
  display: inline-block;
  background: #2d9cdb;
  backdrop-filter: blur(4px);
  width: 120px;
  height: 34px;
  font-weight: bold;
  font-size: 17px;
  border: none;
  border-radius: 40px;
  color: #ffffff;
  margin-right: 50px;
  @media (max-width: 500px) {
    width: 100px;
    height: 29px;

    font-size: 13px;
  }
`;
const Remove = styled.button`
  display: inline-block;
  color: #696969;
  font-size: 17px;
  border: none;
  border-radius: 40px;
  background-color: white;
  width: 120px;
  height: 34px;
  @media (max-width: 500px) {
    width: 100px;
    height: 29px;

    font-size: 13px;
  }
`;
const Fly = styled.img`
  height: 160px;
  width: 106px;
  float: left;
  transition: all 0.2s ease-in-out;
  margin-left: 25px;
  @media (max-width: 900px) {
    height: 130px;
    width: 90px;
  }
  @media (max-width: 760px) {
    display: none;
  }
`;

const Event: React.FC<IEventProps> = (props: IEventProps): JSX.Element => {
  const [deleteEvent] = useDeleteEventMutation();
  const [formVisible, setFormVisible] = useState(false);

  const formatDate: (date: string) => string = (date: string): string => {
    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const d: Date = new Date(date);

    return d.toLocaleDateString("en-US", options);
  };

  const handleEdit: () => void = (): void => {
    setFormVisible(true);
  };

  const handleDelete: () => void = (): void => {
    deleteEvent({
      refetchQueries: [{ query: GET_EVENTS }],
      variables: { id: Number(props.event.id) },
    });
  };

  // const handleAdvert: any = (): any => {};

  // const handleQR: any = (): any => {};

  const { event }: any = props;
  const end = formatDate(event.dateExpire).slice(-8);
  const start = formatDate(event.dateHosted);
  function truncate(str: string, n: number, useWordBoundary: boolean) {
    if (str.length <= n) {
      return str;
    }
    const subString = str.substr(0, n - 1);
    return (
      (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(" "))
        : subString) + "..."
    );
  }

  const branch = {
    display: "inline-block",
    paddingLeft: "5px",
    paddingRight: "5px",
    fontSize: "12px",
    fontFamily: "Nunito Sans",
    borderRadius: "50px",

    backgroundColor: "",
  };
  if (event.hostSig.name === "Women") {
    branch.backgroundColor = "#e8bff6";
  } else if (event.hostSig.name === "Security") {
    branch.backgroundColor = "#db532d";
  } else if (event.hostSig.name === "Hack") {
    branch.backgroundColor = "#dba72d";
  } else if (event.hostSig.name === "Competition") {
    branch.backgroundColor = "#db2db0";
  } else if (event.hostSig.name === "Web") {
    branch.backgroundColor = "#2ddbca";
  } else if (event.hostSig.name === "Data") {
    branch.backgroundColor = "#2d78db";
  } else if (event.hostSig.name === "Game") {
    branch.backgroundColor = "#9bdb2d";
  }

  return (
    <Space>
      <Box>
        <Fly src={event.flierLink} alt={"Flier"}></Fly>
        <Constraint>
          <Group>
            <Title>{event.eventTitle}</Title>
            <div style={branch}>{event.hostSig.name}</div>
          </Group>
          <Time>
            {start} - {end} @ {event.location}
          </Time>
          <Description>{truncate(event.description, 128, true)}</Description>
          <ButtonGroup>
            <Edit onClick={handleEdit}>Edit</Edit>
            <Remove onClick={handleDelete}>Remove</Remove>
          </ButtonGroup>
        </Constraint>
      </Box>
      <EventFormModal
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        event={event}
      />
    </Space>
  );
};

/*
 * Buttons to be added
        <div>
          <Button onClick={handleAdvert}>Advert</Button>
          <Button onClick={handleQR}>QR</Button>
        </div>
*/

export { Event };

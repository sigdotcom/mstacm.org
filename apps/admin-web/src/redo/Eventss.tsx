import React from "react";
import styled from "styled-components";
import Logo2 from "./testfly.png";

const Box = styled.div`
  height: 226px;
  max-width: 912px;
  background-color: white;
  border-radius: 12px;
  padding-top: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  font-family: Nunito Sans;
  padding-bottom: 20px;
`;
const Constraint = styled.div`
  display: flex;
  height: 100%;
  width: 568px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const Group = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  display: inline-block;
  font-size: 24px;
  font-family: Nunito Sans;
  padding-right: 20px;
  font-weight: 300;
  color: #333333;
`;
const Branch = styled.div`
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 12px;
  font-family: Nunito Sans;
  border-radius: 50px;

  background-color: #e8bff6;
`;
const Time = styled.div`
  font-weight: bold;
  font-size: 18px;
  font-family: Nunito Sans;
  display: flex;
`;
const Description = styled.div`
  font-weight: 300;
  font-size: 18px;
  font-family: Nunito Sans;
  padding-bottom: 20px;
  color: #555555;
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
`;
const Fly = styled.img`
  height: 160px;
  width: 106px;
  float: left;
  margin-left: 50px;
`;
const Event: React.SFC<{}> = (): JSX.Element => {
  return (
    <div>
      <Box>
        <Fly src={Logo2}></Fly>
        <Constraint>
          <Group>
            <Title>Dr. Katrina Ward Talk</Title>
            <Branch>ACM Women</Branch>
          </Group>
          <Time>September 25, 2019 5:00 - 6:00pm @ CS 202</Time>
          <Description>
            ACM-W is proud to welcome Dr. Katrina Ward from Sandia National
            Laboratories. She'll be offering insight on her career at Sandia...
          </Description>
          <Group>
            <Edit>Edit</Edit>
            <Remove>Remove</Remove>
          </Group>
        </Constraint>
      </Box>
    </div>
  );
};

export { Event };

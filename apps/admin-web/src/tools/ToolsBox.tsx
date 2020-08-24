import React from "react";
import { Link } from "react-router-dom";
import styled, { AnyStyledComponent } from "styled-components";

interface IToolProps {
  tool: string;
  link: string;
}
const Box: AnyStyledComponent = styled.div`
  height: 140px;
  width: 200px;
  padding: 10px;
  background-color: white;
  border-radius: 12px;
  font-size: 20px;
  padding-top: 10px;
  display: flex;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  font-family: Nunito Sans;
  padding-bottom: 5px;
`;
const Center: AnyStyledComponent = styled.div`
  display: flex;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
`;

const ToolBox: React.SFC<IToolProps> = ({ tool, link }): JSX.Element => {
  return (
    <Link to={link}>
      <Box>
        <Center>
          <div>{tool}</div>
        </Center>
      </Box>
    </Link>
  );
};

export { ToolBox };

import React, { useState } from "react";
import styled, { AnyStyledComponent } from "styled-components";

const SubTitle: AnyStyledComponent = styled.div`
  font-size: 30px;
  padding-left: 10px;
  display: inline-block;

  @media (max-width: 450px) {
    font-size: 17px;
  }
`;
const CollapseButton: AnyStyledComponent = styled.button`
  display: inline-block;
  color: #696969;
  cursor: pointer;
  font-size: 17px;
  border: none;
  border-radius: 40px;
  outline: 0;
  background-color: #f4f5f8;
  width: 120px;
  height: 34px;
  @media (max-width: 500px) {
    width: 100px;
    height: 29px;

    font-size: 13px;
  }
`;
const Group: AnyStyledComponent = styled.div`
  display: flex;
  user-select: none;

  align-items: center;
`;

interface CollapseProps {
  week: string;
  list: JSX.Element;
}

const Collapse: React.SFC<CollapseProps> = ({
  list,
  week,
}: CollapseProps): JSX.Element => {
  const [open, setIsOpen] = useState(false);
  const style = {
    collapsed: {
      display: "none",
    },
    expanded: {
      display: "block",
    },
  };

  return (
    <div>
      <Group>
        <SubTitle>{week}</SubTitle>
        <CollapseButton onClick={() => setIsOpen(!open)}>
          {open ? "Show" : "Collapse"}
        </CollapseButton>
      </Group>
      <div style={open ? style.collapsed : style.expanded} aria-expanded={open}>
        {list}
      </div>
    </div>
  );
};

export { Collapse };

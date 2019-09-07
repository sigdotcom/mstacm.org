import React from "react";
import styled from "styled-components";
import Icon from "react-eva-icons";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: 16px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid black;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
  }

  & i {
    margin-top: -3px;
    margin-left: -3px;
  }
`;

interface ICheckboxProps {
  checked: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Checkbox: React.SFC<ICheckboxProps> = (props): JSX.Element => {
  const { checked, onClick } = props;

  return (
    <CheckboxContainer>
      <StyledCheckbox
        onClick={onClick}
        style={{ background: checked ? "#ef9c6d" : "#fff" }}
      >
        <div style={{ visibility: checked ? "visible" : "hidden" }}>
          <Icon name="checkmark-outline" size="medium" fill="#fff" />
        </div>
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

export { Checkbox };

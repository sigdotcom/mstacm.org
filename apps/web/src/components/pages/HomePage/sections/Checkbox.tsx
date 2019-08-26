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

function Checkbox(props: any): any {
  const { checked, onClick }: any = props;

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
}

export { Checkbox };

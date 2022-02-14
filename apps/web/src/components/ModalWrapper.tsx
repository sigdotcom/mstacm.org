// ModalWrapper.tsx
import React from "react";
import Modal from "react-modal";

import styled, { AnyStyledComponent } from "styled-components";
import { MembershipTypes } from "../generated/graphql";

const modalStyle: any = {
  content: {
    background: "#F3F3F3",
    padding: "2rem 3rem 1rem",
    top: "50%",
    right: "auto",
    bottom: "auto",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    overflow: "hidden",
    border: "none",
    minWidth: "340px"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .25)"
  }
};

const ExitButton: AnyStyledComponent = styled.button`
  position: absolute;
  top: -9px;
  right: -9px;
  height: 40px;
  width: 40px;
  border: none;
  outline: none;
  cursor: pointer;
  background: #F3F3F3;
  border-radius: 50%;
  transition: 0.2s ease-in-out all;

  &:hover {
    background: #D6D6D6;
    color: #fff;
  }
`;

const XBar: AnyStyledComponent = styled.div`
  position: absolute;
  background: #909090;
  top: 50%;
  left: 50%;
  width: 3px;
  height: 28px;
  border-radius: 60px;
`;

// https://github.com/microsoft/TypeScript/issues/37597
const LeftX: AnyStyledComponent = styled(XBar as any)`
  transform: translate(-50%, -50%) rotate(45deg);
`;

const RightX: AnyStyledComponent = styled(XBar as any)`
  transform: translate(-50%, -50%) rotate(-45deg);
`;

type CustomModalProps = React.HTMLAttributes<HTMLDivElement> & {
  resetForm: () => Promise<void>;
  tag: MembershipTypes | undefined;
}

export const ModalWrapper: React.FC<CustomModalProps> = (
  props: CustomModalProps
) => {

  return (
    <Modal
      isOpen={props.tag !== undefined}
      onRequestClose={props.resetForm}
      contentLabel="Checkout Modal"
      style={modalStyle}
      ariaHideApp={false}
      closeTimeoutMS={400}
    >
      <div style={{ position: "relative" }}>
        <ExitButton onClick={props.resetForm}>
          <LeftX />
          <RightX />
        </ExitButton>
        {props.children}
      </div>
    </Modal>
  );
}

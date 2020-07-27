// ModalWrapper.tsx
import React from "react";
import Modal from "react-modal";

import { MembershipTypes } from "../generated/graphql";

import styled, { AnyStyledComponent } from "styled-components";

const modalStyle: any = {
  content: {
    background: "#F3F3F3",
    padding: "1rem 4rem",
    maxWidth: "480px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    overflow: "hidden",
    border: "none"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .25)"
  }
};

const Circle: AnyStyledComponent = styled.div`
  position: absolute;
  right: -30%;
  border-radius: 50%;
`;

const BigCircle: AnyStyledComponent = styled(Circle)`
  top: -30px;
  right: -130px;
  background-color: #d3f0ff;
  width: 450px;
  height: 300px;
  z-index: -9999;
`;

const SmallCircle: AnyStyledComponent = styled(Circle)`
  top: -110px;
  right: -100px;
  background-color: #42c0fc;
  width: 300px;
  height: 180px;
  z-index: -999;
`;

const ExitButton: AnyStyledComponent = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 2.5rem;
  width: 2.5rem;
  border: none;
  outline: none;
  cursor: pointer;
  background: #42c0fc;
  border-radius: 50%;
  transition: 0.2s ease-in-out all;

  &:hover {
    background: #0080bd;
    color: #fff;
  }
`;

const XBar: AnyStyledComponent = styled.div`
  position: absolute;
  display: flex;
  top: 5px;
  left: 18px;
  background: black;
  width: 4px;
  height: 30px;
  border-radius: 20px;
`;

const LeftX: AnyStyledComponent = styled(XBar)`
  transform: rotate(45deg);
`;

const RightX: AnyStyledComponent = styled(XBar)`
  transform: rotate(-45deg);
`;

type CustomModalProps = React.HTMLAttributes<HTMLDivElement> & {
  removeTag: () => void;
  tag: MembershipTypes | undefined;
}

export const ModalWrapper: React.SFC<CustomModalProps> = (
  props: CustomModalProps
) => {
  return (
    <Modal
      isOpen={props.tag !== undefined}
      onRequestClose={props.removeTag}
      contentLabel="Checkout Modal"
      style={modalStyle}
      ariaHideApp={false}
    >
      <BigCircle />
      <SmallCircle />
      <ExitButton onClick={props.removeTag}>
        <LeftX />
        <RightX />
      </ExitButton>
      {props.children}
    </Modal>
  );
}

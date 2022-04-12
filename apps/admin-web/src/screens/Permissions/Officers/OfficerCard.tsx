import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { IOfficer } from "./OfficersList";
import { EditOutlined, DeleteOutlined , LockTwoTone} from "@ant-design/icons";

interface IOfficerProps {
  value: IOfficer;
}

const OfficerCard: React.FC<any> = (props: IOfficerProps): JSX.Element => {
  const data = props.value;

  const OfficerCard: AnyStyledComponent = styled.div`
    flex: 1;
    height: 320px;
    min-width: 260px;
    max-width: 260px;
    margin: 30px;
    user-select: none;
    background-color: white;
    border-radius: 12px;
    padding-top: 10px;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  `;

  const ProfileImage: AnyStyledComponent = styled.img`
    border-radius: 50%;
    width: 100px;
    height: auto;
    margin-top: 10px;
  `;

  const Name: AnyStyledComponent = styled.div`
    font-size: 18px;
    margin-top: 10px;
  `;

  const RoleWrapper: AnyStyledComponent = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 18px;
  `;

  const Role: AnyStyledComponent = styled.div`
    font-size: 16px;
    font-weight: normal;
    background: #87ceeb;
    backdrop-filter: blur(4px);
    width: 100px;
    height: 25px;
    outline: 0;
    border: none;
    border-radius: 40px;
  `;

  const EditIconWrapper: AnyStyledComponent = styled.div`
    display: inline-block;
    margin-right: 135px;
    &:hover {
      cursor: pointer
    }
  `;

  const DeleteIconWrapper: AnyStyledComponent = styled.div`
    display: inline-block;
    &:hover {
      cursor: pointer
    }
  `;

  const PermissionsButton: AnyStyledComponent = styled.div`
    display: inline-block;
    padding: 12px;
    margin-top: 32px;
    font-size: 15px;
    font-weight: normal;
    color: #0d5d8b;
    border-top: solid .5px rgb(0, 0, 0, 0.2);
    border-right: solid .5px rgb(0, 0, 0, 0.2);
    width: 50%;
    height: 50px;
    &:hover {
      cursor: pointer
    }
  `;

  const ProfileButton: AnyStyledComponent = styled.div`
    display: inline-block;
    padding: 12px;
    margin-top: 32px;
    font-size: 15px;
    font-weight: normal;
    color: #0d5d8b;
    border-top: solid .5px rgb(0, 0, 0, 0.2);
    border-left: solid .5px rgb(0, 0, 0, 0.2);
    width: 50%;
    height: 50px;
    &:hover {
      cursor: pointer
    }
  `;
  
  return (
    <OfficerCard>
      <ProfileImage src={data.img} />
      <Name>{data.firstName} {data.lastName}</Name>
      <RoleWrapper>
        <Role>{data.role}</Role>
      </RoleWrapper>
      <EditIconWrapper>
        <EditOutlined />
      </EditIconWrapper>
      <DeleteIconWrapper>
        <DeleteOutlined />
      </DeleteIconWrapper>
      <PermissionsButton>
        <LockTwoTone style={{marginRight: '5px'}} />
        Permissions
      </PermissionsButton>
      <ProfileButton>
        <LockTwoTone style={{marginRight: '5px'}} />
        Profile
      </ProfileButton>
    </OfficerCard>
  );
};

export { OfficerCard };

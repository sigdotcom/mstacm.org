import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import React, { useState } from 'react';
import { IStyles } from './IStyles';
import { IUser } from './IUser';

const users: IUser[] = [
  {
    "id": "8f6ea01b-63b1-41b0-feaf-6603cf59d456",
    "firstName": "MST",
    "lastName": "ACM",
    "email": "acm@mst.edu",
    "membershipExpiration": null
  },
  {
    "id": "1bb766b6-d237-f329-a70a-625deb254da0",
    "firstName": "Kevin",
    "lastName": "Schoonover",
    "email": "ksyh3@umsystem.edu",
    "membershipExpiration": null
  },
  {
    "id": "4feafds35-7101-460e-aee8-5a0d58023abc",
    "firstName": "Kevin",
    "lastName": "Schoonover",
    "email": "schoonoverkevinm@gmail.com",
    "membershipExpiration": "2020-03-04T07:01:09.118Z"
  },
];

const styles: IStyles = {
  display: 'inline-block',
  cursor: 'pointer',
  marginLeft: '9px'
};


const Membership: React.FC<{}> = () => {
  const [userState, setUserState] = useState<IUser[]>(users);
  const usersBase: IUser[] = [...userState];

  const statusActive: (expirationDate: string) => string = (expirationDate: string)=> {
    const currentDate: Date = new Date();
    const expDate: Date = new Date(expirationDate);
  
    if(expirationDate === null) {
      return "Not Member";
    }
    else if(currentDate <= expDate) {
      return "Active";
    }
    else {
      return "Invalid";
    }
  }
  
  const dateFormat: (expirationDate: string | null) => string = (expirationDate: string | null) => {
    if(expirationDate === null) {
      return "null";
    }
    else {
      return expirationDate.toString().slice(0, 10);
    }
  }
  
  const saveAction: Function = (id: string) => {
    let dateInputs: any = document.getElementsByClassName("date");

    return (): void => {
      for (let i = 0; i < usersBase.length; i++) {
        if (usersBase[i].id === id) {
          usersBase[i].membershipExpiration = dateInputs[i].value;
          setUserState(usersBase);
          break;
        }
      }
    }
  }
  
  const deleteAction: Function = (id: string) => {
    let dateInputs: any = document.getElementsByClassName("date");

    return (): void => {
      for (let i = 0; i < usersBase.length; i++) {
        if (usersBase[i].id == id) {
          usersBase[i].membershipExpiration = null;
          setUserState(usersBase);
          dateInputs[i].value = "";
          break;
        }
      }
    }
  }

  const changeDate: Function = (id: string) => {
    let dateInputs: any = document.getElementsByClassName("date");

    return (): void => {
      for (let i = 0; i < usersBase.length; i++) {
        if (usersBase[i].id == id) {
          usersBase[i].membershipExpiration = dateInputs[i].value;
          setUserState(usersBase);
          break;
        }
      }
    }
  }

  const columns: ColumnProps<IUser>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (record: IUser) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (record: any) => (
        <span>
          {statusActive(record.membershipExpiration)}
        </span>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (record: IUser) => (
        <span>
          <input onChange={changeDate(record.id)} className="date" type="date" value={dateFormat(record.membershipExpiration)} />
          <button style={styles} onClick={saveAction(record.id)}>Save</button>
          <button style={styles} onClick={deleteAction(record.id)}>Delete</button>
        </span>
      )
    }
  ];

  return (
    <div>
      <Table dataSource={usersBase} columns={columns} />
    </div>
  );
};

export { Membership };

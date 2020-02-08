/*import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import React, { useState } from 'react';
import { IStyles } from './IStyles';
import { IUser } from './IUser';
import { Modal } from "antd";
import styled, { AnyStyledComponent } from "styled-components";

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

// const lengthOptions = [
//   {
//     key: 'Semester',
//     text: 'Semester',
//     value: 'Semester'
//   },
//   {
//     key: 'Year',
//     text: 'Year',
//     value: 'Year'
//   }
// ];

const styles: IStyles = {
  display: 'inline-block',
  cursor: 'pointer',
  marginLeft: '9px'
<<<<<<< HEAD
};*/
=======
};

const EditInputs: AnyStyledComponent = styled.input`
  margin-left: 20px;
`;

const LengthDropdown: AnyStyledComponent = styled.select`
  margin-left: 20px;
`;

const EditCol: AnyStyledComponent = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
>>>>>>> non-functional edit tool

const Membership: React.FC<{}> = () => {
  const [userState, setUserState] = useState<IUser[]>(users);
  const usersBase: IUser[] = [...userState];
  const [confirmLoading] = useState(false);
  const [editMembershipVisible, setEditMembershipVisible] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleVisibility: () => any = (): any => {
    setEditMembershipVisible(true);
  };

  const handleCancel: () => void = (): void => {
    setEditMembershipVisible(false);
  };

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

  const name: Function = (id: string) => {
    for (let i = 0; i < usersBase.length; i++) {
      if (usersBase[i].id === id) {
        return usersBase[i].firstName + " " + usersBase[i].lastName;
      }
    }

    return "";
  }

  const email: Function = (id: string) => {
    for (let i = 0; i < usersBase.length; i++) {
      if (usersBase[i].id === id) {
        return usersBase[i].email;
      }
    }

    return "";
  }

  
<<<<<<< HEAD
  /*const dateFormat: (expirationDate: string | null) => string = (expirationDate: string | null) => {
    if(expirationDate === null) {
      return "N/A";
    }
    else {
      return expirationDate.toString().slice(0, 10);
    }
  }

  const decrementYear: (formattedDate: string | null) => string = (formattedDate: string | null) => {
    if(formattedDate === null) {
      return "null";
    }
    else {
      let startYear: any = parseInt(formattedDate.toString().slice(0,4)) - 1;
      if (isNaN(startYear))
        return "N/A";
      return startYear.toString() + formattedDate.toString().slice(4,10);
    }
  }
=======
  // const dateFormat: (expirationDate: string | null) => string = (expirationDate: string | null) => {
  //   if(expirationDate === null) {
  //     return "null";
  //   }
  //   else {
  //     return expirationDate.toString().slice(0, 10);
  //   }
  // }
>>>>>>> working modal
  
  // const saveAction: Function = (id: string) => {
  //   let dateInputs: any = document.getElementsByClassName("date");

  //   return (): void => {
  //     for (let i = 0; i < usersBase.length; i++) {
  //       if (usersBase[i].id === id) {
  //         usersBase[i].membershipExpiration = dateInputs[i].value;
  //         setUserState(usersBase);
  //         break;
  //       }
  //     }
  //   }
  // }
  
  const deleteAction: Function = (id: string) => {
    return (): void => {
      for (let i = 0; i < usersBase.length; i++) {
        if (usersBase[i].id == id) {
          usersBase.splice(i, 1);
          setUserState(usersBase);
          handleCancel();
          break;
        }
      }
    }
  }

  // const changeDate: Function = (id: string) => {
  //   let dateInputs: any = document.getElementsByClassName("date");

  //   return (): void => {
  //     for (let i = 0; i < usersBase.length; i++) {
  //       if (usersBase[i].id == id) {
  //         usersBase[i].membershipExpiration = dateInputs[i].value;
  //         setUserState(usersBase);
  //         break;
  //       }
  //     }
  //   }
  // }

  const columns: ColumnProps<IUser>[] = [
    {
      title: 'Name',
      key: 'id',
      render: (record: IUser) => (
        <span>
          {`${record.firstName} ${record.lastName}`}
        </span>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Activation',
      key: 'activation',
      width: '12%',
      render: (record: any) => (
        <span>
          {decrementYear(dateFormat(record.membershipExpiration))}
        </span>
      )
    },
    {
      title: 'Expiration',
      key: 'expiration',
      width: '12%',
      render: (record: any) => (
        <span>
          {dateFormat(record.membershipExpiration)}
        </span>
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: any) => (
        <span>
          {statusActive(record.membershipExpiration)}
        </span>
      )
    },
    {
<<<<<<< HEAD
      title: 'Edit Status',
      key: 'edit status',
      width: '15%',
      render: (record: IUser) => (
        <span>
          <input onChange={changeDate(record.id)} className="date" type="date" value={dateFormat(record.membershipExpiration)} />
          <button style={styles} onClick={saveAction(record.id)}>Save</button>
          <button style={styles} onClick={deleteAction(record.id)}>Delete</button>
        </span>
=======
      title: 'Action',
      key: 'action',
<<<<<<< HEAD
      // record: IUser
      render: () => (
        <button style={styles} onClick={handleVisibility}>Edit</button>
        // <span>
        //   <input onChange={changeDate(record.id)} className="date" type="date" value={dateFormat(record.membershipExpiration)} />
        //   <button style={styles} onClick={saveAction(record.id)}>Save</button>
        //   <button style={styles} onClick={deleteAction(record.id)}>Delete</button>
        // </span>
>>>>>>> working modal
=======
      render: (record: any) => (
        <button style={styles} onClick={() => {
          handleVisibility();
          setUserId(record.id);
        }}>Edit</button>
>>>>>>> non-functional edit tool
      )
    },
    {
      title: 'ACM Shirt',
      key: 'acm shirt',
    }
  ];
  return (
    <div>
      <Table dataSource={usersBase} columns={columns} />
      <Modal
        visible={editMembershipVisible}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
      >
        <div>
          <strong>{name(userId)}</strong>
        </div>
        <div>
          {email(userId)}
        </div>
        <hr />
        <div>
          {/* <input onChange={changeDate(userId)} className="date" type="date" value={dateFormat(record.membershipExpiration)} /> */}
          {/* <button style={styles} onClick={saveAction(userId)}>Save</button> */}
          <EditCol>
            <span>Picked Up Shirt:</span>
            <EditInputs type="checkbox" />
          </EditCol>

          <EditCol>
            <span>Membership Start Date:</span>
            <EditInputs className="date" type="date" />
          </EditCol>

          <EditCol>
            <span>Length: </span>
            <LengthDropdown>
              <option value="Semester">Semester</option>
              <option value="Year">Year</option>
            </LengthDropdown>
          </EditCol>
          <hr />
          <button style={styles} onClick={deleteAction(userId)}>Delete</button>
        </div>
      </Modal>
    </div>
  );
};

export { Membership };*/

import { Table, Input, Button, Icon } from 'antd';
import React, { useState } from 'react';
import { IStyles } from './IStyles';
import { IUser } from './IUser';
import Highlighter from 'react-highlight-words';

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
  const [searchText, setSearchText] = useState<string>('');
  const [searchedColumn, setSearchedColumn] = useState<string>(''); //at least, I think it's a string
  const [searchInput, setSearchInput] = useState<any>('');

  /*const statusActive: (expirationDate: string) => string = (expirationDate: string)=> {
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
  }*/
  
  const dateFormat: (expirationDate: string | null) => string = (expirationDate: string | null) => {
    if(expirationDate === null) {
      return "N/A";
    }
    else {
      return expirationDate.toString().slice(0, 10);
    }
  }
  
  /*const saveAction: Function = (id: string) => {
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
  }*/

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            setSearchInput(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text: { toString: () => string; }) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys: React.SetStateAction<string>[], confirm: () => void, dataIndex: React.SetStateAction<string>) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('')
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      ...getColumnSearchProps('name'),
      render: (record: IUser) => (
        <span>
          {`${record.firstName} ${record.lastName}`}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Activation',
      key: 'activation',
      render: (record: any) => (
        <span>
          
        </span>
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: any) => (
        <span>
          {statusActive(record.membershipExpiration)}
        </span>
      )
    },
    {
      title: 'Expiration',
      key: 'expiration',
      render: (record: any) => (
        <span>
          {dateFormat(record.membershipExpiration)}
        </span>
      )
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (/*record: IUser*/) => (
        <span>
          <button style={styles}>Edit</button>
        </span>
      )
    },
    {
      title: 'ACM Shirt',
      key: 'acm shirt',
    }
  ];

  return(
    <div>
       <Table columns={columns} dataSource={users} />;
    </div>
  );
}

export { Membership };
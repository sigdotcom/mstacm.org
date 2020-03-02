<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/*import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import React, { useState } from 'react';
=======
import { Table, Input, Button, Icon, Modal } from 'antd';
=======
import { Table, Input, Button, Icon, Modal, DatePicker } from 'antd';
>>>>>>> Various fixes
=======
import { Table, Input, Button, Icon, Modal, DatePicker, message } from 'antd';
>>>>>>> Added messages for loading/error of mutations and queries
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
>>>>>>> Made some progress integrating backend
import { IStyles } from './IStyles';
import { IUser } from './IUser';
import { Modal } from "antd";
=======
import Highlighter from 'react-highlight-words';
>>>>>>> Added confirm
import styled, { AnyStyledComponent } from "styled-components";
import { IStyles } from './IStyles';
import { IUser } from './IUser';
import { useUpdateExpirationDateMutation,
         useMembersQuery,
         useUpdateShirtReceivedMutation,
         useResetShirtReceivedMutation,
         useDeleteMemberMutation } from "../../../../generated/graphql";

const moment = require('moment');

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

const EditCol: AnyStyledComponent = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
>>>>>>> non-functional edit tool

const ConfirmButton: AnyStyledComponent = styled.button`
  margin-left: 20px;
`;

const DeleteYes: AnyStyledComponent = styled.button`
  margin-right: 10px;
`;

const DeleteConfirmation: AnyStyledComponent = styled.div`
  margin: 10px;
`;

const ShirtResetButton: AnyStyledComponent = styled.button`
  margin-bottom: 25px;
`;

const Membership: React.FC<{}> = () => {
<<<<<<< HEAD
  const [userState, setUserState] = useState<IUser[]>(users);
  const usersBase: IUser[] = [...userState];
=======
  const { loading: memberLoading, error: memberError, data: memberData }: any = useMembersQuery();

  const [
    updateExpirationDate,
    { loading: expirationLoading, error: expirationError, data: expirationData }
  ]: any = useUpdateExpirationDateMutation();

  const [
    updateShirtReceived,
    { loading: updateShirtLoading, error: updateShirtError, data: updateShirtData } 
  ]: any = useUpdateShirtReceivedMutation();

  const [
    updateDeleteMember,
    { loading: deleteMemberLoading, error: deleteMemberError, data: deleteMemberData }
  ]: any = useDeleteMemberMutation();

  const [
    updateResetShirts,
    { loading: resetShirtsLoading, error: resetShirtsError, data: resetShirtsData }
  ]: any = useResetShirtReceivedMutation();

  const [searchText, setSearchText] = useState<string>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const [searchInput, setSearchInput] = useState<any>('');

  const [userState, setUserState] = useState<IUser[]>([]);
>>>>>>> Made some progress integrating backend
  const [confirmLoading] = useState(false);
  const [editMembershipVisible, setEditMembershipVisible] = useState(false);

  const [userId, setUserId] = useState("");
  const [checkboxShirtStatus, setCheckboxShirtStatus] = useState(false);
  const [datePickerStatus, setDatePickerStatus] = useState<string>('');

  const [editMembershipVisibleDelete, setEditMembershipVisibleDelete] = useState(false);
  const [confirmLoadingDelete] = useState(false);

  const [getDateFromUsers, setDateFromUsers] = useState(true);
  const [getShirtStatusFromUsers, setShirtStatusFromUsers] = useState(true);

  let users: IUser[] = [];

  useEffect(() => {
    if (memberLoading) {
      //message.info("Member Data Loading");
    }
    else if (memberError) {
      message.info("An error occured loading member data.");
    }
    else if (memberData) {
      users = memberData.users;
      setUserState(users);
    }
  }, [memberData]);

  useEffect(() => {
    if (updateShirtLoading) {
      //message.info("Update Shirt Data Loading");
    }
    else if (updateShirtError) {
      message.info("An error occured loading shirt mutation data.");
    }
  }, [updateShirtData]);

  useEffect(() => {
    if (expirationLoading) {
      //message.info("Expiration Data Loading");
    }
    else if (expirationError) {
      message.info("An error occured loading expiration mutation data.");
    }
  }, [expirationData]);

  useEffect(() => {
    if (deleteMemberLoading) {
      //message.info("Delete Member Data Loading");
    }
    else if (deleteMemberError) {
      message.info("An error occured loading delete member mutation data.");
    }
  }, [deleteMemberData]);

  useEffect(() => {
    if (resetShirtsLoading) {
      //message.info("Shirt Reset Data Loading");
    }
    else if (resetShirtsError) {
      message.info("An error occured loading shirt reset mutation data.");
    }
  }, [resetShirtsData]);

  useEffect(() => {
    getShirtStatus();
  }, [userId]);

  const usersBase: IUser[] = [...userState];

  const createNameDataIndex = () => {
    for (let i = 0; i < usersBase.length; i++)
      usersBase[i].fullName = `${usersBase[i].firstName  } ${  usersBase[i].lastName}`;
  }

  const handleVisibility: () => void = (): void => {
    setEditMembershipVisible(true);
  };

  const handleCancel: () => void = (): void => {
    setDateFromUsers(true);
    setShirtStatusFromUsers(true);
    setEditMembershipVisible(false);
  };

  const handleVisibilityDelete: () => void = (): void => {
    setEditMembershipVisibleDelete(true);
  };

  const handleCancelDelete: () => void = (): void => {
    setEditMembershipVisibleDelete(false);
  };

  const statusActive: (expirationDate: string) => string = (expirationDate: string)=> {
    const currentDate: Date = new Date();
    const expDate: Date = new Date(expirationDate);
  
    if(expirationDate === null) {
      return "Not Member";
    }
    if(currentDate <= expDate) {
      return "Active";
    }
    
      return "Invalid";
    
  }

  const name: Function = (id: string) => {
    for (let i = 0; i < usersBase.length; i++) {
      if (usersBase[i].id === id) {
        return `${usersBase[i].firstName  } ${  usersBase[i].lastName}`;
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  /*const dateFormat: (expirationDate: string | null) => string = (expirationDate: string | null) => {
    if(expirationDate === null) {
=======
  const formatDateString: (expirationDate: string | null) => string = (expirationDate: string | null) => {
    if(expirationDate == "null" || expirationDate == null) {
>>>>>>> Changed default search bar message
      return "N/A";
    }
=======
  // const formatDateString: (expirationDate: string | null) => string = (expirationDate: string | null) => {
  //   if(expirationDate == "null" || expirationDate == null) {
  //     return "N/A";
  //   }
>>>>>>> Various fixes
    
  //     return expirationDate.toString().slice(0, 10);
    
<<<<<<< HEAD
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
=======
  const dateFormat: () => string | null = () => {
    for (let i = 0; i < usersBase.length; i++) {
      if (usersBase[i].id == userId.toString()) {
        if(usersBase[i].membershipExpiration == null)
          break;
        return usersBase[i].membershipExpiration.toString().slice(0, 10);
      }
    }
    return "";
  }
>>>>>>> membership expiration date works and changes state value
  
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
  
  const deleteUser: Function = (id: string) => {
    return (): void => {
      for (let i = 0; i < usersBase.length; i++) {
        if (usersBase[i].id == id) {
          updateDeleteMember(id);
          handleCancel();
          handleVisibilityDelete();
          usersBase.splice(i, 1);
          setUserState(usersBase);
          handleCancelDelete();
          break;
        }
      }
    }
  }
=======
  // }
=======
  const formatDateString: (expirationDate: string | null) => string = (expirationDate: string | null) => {
    if(expirationDate === "null" || expirationDate === null || expirationDate === "")
      return "N/A";
    return expirationDate;
    
  }
>>>>>>> Various fixes

  // const dateFormat: () => string | null = () => {
  //   for (let i = 0; i < usersBase.length; i++) {
  //     if (usersBase[i].id === userId.toString()) {
  //       if(usersBase[i].membershipExpiration === null)
  //         break;
  //       return usersBase[i].membershipExpiration.toString().slice(0, 10);
  //     }
  //   }
  //   return "";
  // }
>>>>>>> Various fixes

  const handleNo: Function = () => {
    return (): void => {
      handleCancelDelete();
      handleVisibility();
    }
  }

  const deleteAction: Function = () => {
    return (): void => {
      handleCancel();
      handleVisibilityDelete();
    }
  }

  const changeDate: Function = () => {
    let dateInputs: any = document.getElementsByClassName("date");
    return (): void => {
      for (let i = 0; i < usersBase.length; i++) {
<<<<<<< HEAD
        if (usersBase[i].id == userId.toString()) {
          usersBase[i].membershipExpiration = dateInputs[0].value;
=======
        if (usersBase[i].id === id) {
          updateDeleteMember(id);
          handleCancel();
          handleVisibilityDelete();
          usersBase.splice(i, 1);
>>>>>>> Fixed checkbox issue
          setUserState(usersBase);
          break;
        }
      }
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
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
            <span>Membership Expiration Date:</span>
            <EditInputs className="date" type="date" value={dateFormat()} onChange={changeDate()} />
          </EditCol>

          <hr />
          <button style={styles} onClick={deleteAction()}>Delete</button>
        </div>
      </Modal>
      <Modal
        visible={editMembershipVisibleDelete}
        confirmLoading={confirmLoadingDelete}
        footer={null}
        onCancel={handleCancelDelete}
      >
        <div>
          Are you sure you want to delete this user?
        </div>
        <DeleteConfirmation>
          <DeleteYes onClick={deleteUser(userId)}>Yes</DeleteYes>
          <button onClick={handleNo()}>No</button>
        </DeleteConfirmation>
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
=======
  const changeDate: Function = () => {
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> Removed unnecessary comments
=======
    console.log("change date called");
>>>>>>> Made some progress integrating backend
    let dateInputs: any = document.getElementsByClassName("date");

=======
    const dateInputs: any = document.getElementsByClassName("date");
>>>>>>> Added confirm
    return (): void => {
      for (let i = 0; i < usersBase.length; i++) {
<<<<<<< HEAD
        if (usersBase[i].id == id) {
          usersBase[i].membershipExpiration = null;
=======
        if (usersBase[i].id == userId.toString()) {
          usersBase[i].membershipExpiration = dateInputs[0].value;
          break;
        }
=======
  const changeDate: (date: any, dateString: string)=> void = (date: any, dateString: string) => {
    setDateFromUsers(false);

    setDatePickerStatus(date); //ignore this, date is required to be used by typescript
    setDatePickerStatus(dateString);
<<<<<<< HEAD
    console.log(datePickerStatus);

    for (let i = 0; i < usersBase.length; i++) {
      if (usersBase[i].id == userId.toString()) {
        usersBase[i].membershipExpiration = datePickerStatus;
        break;
>>>>>>> Various fixes
      }
    }
=======
>>>>>>> Fixed saveAction issue
  }

  const saveAction: Function = () => {
    return (): void => {
      for (let i = 0; i < usersBase.length; i++) {
<<<<<<< HEAD
        if (usersBase[i].id == userId.toString()) {
<<<<<<< HEAD
          updateShirtReceived(usersBase[i].shirtReceived, usersBase[i].id)
          break;
        }
      }

      for (let i = 0; i < usersBase.length; i++) {
        if (usersBase[i].id == userId.toString()) {
<<<<<<< HEAD
          updateExpirationDate(dateInputs[0].value, usersBase[i].id);
>>>>>>> Added mutations/fixed various backend issues
=======
=======
=======
        if (usersBase[i].id === userId.toString()) {
>>>>>>> Fixed checkbox issue
          updateShirtReceived(usersBase[i].shirtReceived, usersBase[i].id);
>>>>>>> Fixed saveAction issue
          updateExpirationDate(datePickerStatus);
>>>>>>> Various fixes
          setUserState(usersBase);
<<<<<<< HEAD
          dateInputs[i].value = "";
=======
          usersBase[i].membershipExpiration = datePickerStatus;
<<<<<<< HEAD
>>>>>>> Fixed saveAction issue
=======
          usersBase[i].shirtReceived = checkboxShirtStatus;
>>>>>>> Fixed checkbox issue
          break;
        }
      }

      handleCancel();
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  /*const changeShirtReceived: any = (newShirtReceived: boolean) => {
    updateShirtReceived({
      variables: {received: newShirtReceived, id: userId}
    })
=======
  const changeShirtReceived: any = () => {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log("change shirt received called");
>>>>>>> Made some progress integrating backend
=======
>>>>>>> Added confirm
=======
    setCheckboxShirtStatus(!checkboxShirtStatus);

>>>>>>> Various fixes
    for (let i = 0; i < usersBase.length; i++) {
      if (usersBase[i].id == userId)
      {
        usersBase[i].shirtReceived = !usersBase[i].shirtReceived;
      }
    }
=======
  const changeShirtReceived: Function = () => {
    setCheckboxShirtStatus(!checkboxShirtStatus);
    setShirtStatusFromUsers(false);
>>>>>>> Fixed checkbox issue
  }

<<<<<<< HEAD
  const displayShirtReceived: any = (shirtReceived: boolean) => {
    return (shirtReceived ? "Received" : "Not Received");
>>>>>>> Added mutations/fixed various backend issues
  }*/
=======
  const displayShirtReceived: Function = (shirtReceived: boolean) => {
    if(shirtReceived)
      return "Received";
    return "Not Received";
  }
>>>>>>> Made some progress integrating backend

  const resetAllShirts: Function = () => {
    updateResetShirts();
    for (let i = 0; i < usersBase.length; i++) {
      usersBase[i].shirtReceived = false;
    }
  }

  const getShirtStatus: Function = () => {
    for (let i = 0; i < usersBase.length; i++) {
      if(usersBase[i].id === userId)
        return usersBase[i].shirtReceived;
    }
    return false;
  }

  const getExpirationDate: Function = () => {
    for (let i = 0; i < usersBase.length; i++) {
      if(usersBase[i].id === userId)
        return usersBase[i].membershipExpiration;
    }
    return null;
  }

  const getValueForCheckbox: Function = () => {
    console.log("getShirtStatusFromUsers: " + getShirtStatusFromUsers);

    console.log("getShirtStatus(): " + getShirtStatus());

    if(getShirtStatusFromUsers)
      return getShirtStatus();
    else
      return checkboxShirtStatus;
  }

  const getValueForDatePicker: Function = () => {
    if(getDateFromUsers)
      if(!getExpirationDate === null)
        return moment(getExpirationDate());
      else
        return "";
    else
      return moment(datePickerStatus);
  }

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            setSearchInput(node);
          }}
          placeholder={`Search ${dataIndex === "fullName" ? "name" : dataIndex}`}
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
      ...getColumnSearchProps('fullName'),
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
<<<<<<< HEAD
<<<<<<< HEAD
          {dateFormat(record.membershipExpiration)}
=======
          {record.membershipExpiration}
>>>>>>> Various fixes
=======
          {formatDateString(record.membershipExpiration)}
>>>>>>> Various fixes
        </span>
      )
    },
    {
      title: 'Edit',
      key: 'edit',
<<<<<<< HEAD
      render: (/*record: IUser*/) => (
        <span>
          <button style={styles}>Edit</button>
        </span>
=======
      render: (record: any) => (
        <button
          style={styles}
          onClick={() => {
<<<<<<< HEAD
          handleVisibility();
          setUserId(record.id);
<<<<<<< HEAD
        }}>Edit</button>
>>>>>>> Added mutations/fixed various backend issues
=======
=======
            setUserId(record.id);
            handleVisibility();
>>>>>>> Various fixes
        }}
        >
          Edit
        </button>
>>>>>>> Added confirm
      )
    },
    {
      title: 'ACM Shirt',
      key: 'acm shirt',
      render: (record: any) => (
        <span>
          {displayShirtReceived(record.shirtReceived)}
        </span>
      )
    }
  ];

  return(
    <div>
<<<<<<< HEAD
<<<<<<< HEAD
       <Table columns={columns} dataSource={users} />;
=======
=======
      {createNameDataIndex()}

<<<<<<< HEAD
>>>>>>> Allowed for full name search
=======
      <ShirtResetButton style={styles} onClick={() => resetAllShirts()}>Reset Shirt Status</ShirtResetButton>

>>>>>>> Various fixes
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
          <EditCol>
            <span>Picked Up Shirt:</span>
            <EditInputs type="checkbox" checked={getValueForCheckbox()} onClick={changeShirtReceived} />
          </EditCol>

          <EditCol>
            <span>Membership Expiration Date: </span>
            <DatePicker onChange={changeDate} placeholder="Select Expiration Date" value={getValueForDatePicker()}/>
          </EditCol>

          <hr />

          <button style={styles} onClick={deleteAction()}>Delete</button>
          <ConfirmButton style={styles} onClick={saveAction()}>Confirm</ConfirmButton>
        </div>
      </Modal>
      <Modal
        visible={editMembershipVisibleDelete}
        confirmLoading={confirmLoadingDelete}
        footer={null}
        onCancel={handleCancelDelete}
      >
        <div>
          Are you sure you want to delete this user?
        </div>
        <DeleteConfirmation>
          <DeleteYes onClick={deleteUser(userId)}>Yes</DeleteYes>
          <button onClick={handleNo()}>No</button>
        </DeleteConfirmation>
      </Modal>
>>>>>>> Removed unnecessary comments
    </div>
  );
}

export { Membership };

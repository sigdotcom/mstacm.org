import React, { useState, useEffect } from "react";

import { Table, Input, Dropdown, Button, Menu, Modal, DatePicker, Checkbox, message } from "antd";
import { SearchOutlined, UserOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import styled, { AnyStyledComponent } from "styled-components";
import { CSVLink } from "react-csv";

import { IUser } from "./interfaces";
import {
  useUpdateExpirationDateMutation,
  useMembersQuery,
  useUpdateShirtReceivedMutation,
  useResetShirtReceivedMutation,
  useDeleteMemberMutation,
  User,
} from "../../generated/graphql";

const EditModalHeader: AnyStyledComponent = styled.div`
  margin-bottom: 15px;
`;

const EditCol: AnyStyledComponent = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DeleteYes: AnyStyledComponent = styled.button`
  margin-right: 10px;
`;

const DeleteConfirmation: AnyStyledComponent = styled.div`
  margin: 10px;
`;

const Membership: React.FC<{}> = () => {
  const {
    loading: memberLoading,
    error: memberError,
    data: memberData,
  }: any = useMembersQuery();

  const [
    updateExpirationDate,
    {
      error: expirationError
    },
  ]: any = useUpdateExpirationDateMutation();

  const [
    updateShirtReceived,
    {
      error: updateShirtError
    },
  ]: any = useUpdateShirtReceivedMutation();

  const [
    updateDeleteMember,
    {
      error: deleteMemberError
    },
  ]: any = useDeleteMemberMutation();

  const [
    updateResetShirts,
    {
      error: resetShirtsError
    },
  ]: any = useResetShirtReceivedMutation();

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [searchInput, setSearchInput] = useState<any>("");
  const [shirtReceivedLocked, setShirtReceivedLocked] = useState<boolean>(true);

  const [editMembershipVisible, setEditMembershipVisible] = useState(false);

  const [userId, setUserId] = useState("");

  const [
    editMembershipVisibleDelete,
    setEditMembershipVisibleDelete,
  ] = useState(false);

  const [curExpDate, setCurExpDate] = useState<string>("");
  const [curShirtStatus, setCurShirtStatus] = useState<boolean>(false);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    // Events for member data query
    if (memberError) {
      message.info("An error occured loading member data.");
    } else if (memberData) {
      const usersData: IUser[] = memberData.users.map((user: User) => ({
        ...user,
        key: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
      }));
      setUsers(usersData);
    }
  }, [memberData, memberLoading, memberError]);

  useEffect(() => {
    // Events for shirt update mutation
    if (updateShirtError) {
      message.info("An error occured loading shirt mutation data.");
    }
  }, [updateShirtError]);

  useEffect(() => {
    // Events for update expiration mutation
    if (expirationError) {
      message.info("An error occured loading expiration mutation data.");
    }
  }, [expirationError]);

  useEffect(() => {
    // Events for delete member mutation
    if (deleteMemberError) {
      message.info("An error occured loading delete member mutation data.");
    }
  }, [deleteMemberError]);

  useEffect(() => {
    // Events for resetting all shirts mutation
    if (resetShirtsError) {
      message.info("An error occured loading shirt reset mutation data.");
    }
  }, [resetShirtsError]);

  useEffect(() => {
    getShirtStatus();
    getExpirationDate();
    saveAction();
    setUserId("null");
  }, [userId]);

  const handleVisibility: () => void = (): void => {
    setEditMembershipVisible(true);
  };

  const handleCancel: () => void = (): void => {
    setEditMembershipVisible(false);
  };

  const handleVisibilityDelete: () => void = (): void => {
    setEditMembershipVisibleDelete(true);
  };

  const handleCancelDelete: () => void = (): void => {
    setEditMembershipVisibleDelete(false);
  };

  const handleShirtReceivedLocked: () => void = (): void => {
    setShirtReceivedLocked(!shirtReceivedLocked);
  }; 

  const statusActive: (expirationDate: string) => string = (
    expirationDate: string
  ) => {
    const currentDate: Date = new Date();
    const expDate: Date = new Date(expirationDate);

    if (expirationDate === null) {
      return "Not Member";
    }
    if (currentDate <= expDate) {
      return "Active";
    }

    return "Expired";
  };

  const name: Function = (id: string) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        if (users[i].fullName === "null null") {
          return "";
        }
        else {
          return users[i].fullName;
        }
      }
    }
    return "";
  };

  const email: Function = (id: string) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i].email;
      }
    }

    return "";
  };

  const deleteUser: Function = (id: string) => {
    return (): void => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          updateDeleteMember({
            variables: { id },
          });
          handleCancel();
          handleVisibilityDelete();
          users.splice(i, 1);
          setUsers(users);
          handleCancelDelete();
          break;
        }
      }
    };
  };

  const formatDateString: (expirationDate: string | null) => string = (
    expirationDate: string | null
  ) => {
    if (
      expirationDate === "null" ||
      expirationDate === null ||
      expirationDate === ""
    )
      return "N/A";
    try {
      return new Date(expirationDate).toLocaleDateString("en-US");
    } catch {
      return "N/A";
    }
  };

  const handleNo: Function = () => {
    return (): void => {
      handleCancelDelete();
    };
  };

  const changeDate: (date: any, dateString: string) => void = (
    _: moment.Moment,
    dateString: string
  ) => {
    if (dateString === null) return;
    try {
      new Date(dateString);
    } catch {
      return;
    }
    setCurExpDate(dateString);
  };

  const saveAction: Function = () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId.toString()) {
        users[i].shirtReceived = curShirtStatus;
        updateShirtReceived({
          variables: {
            received: curShirtStatus,
            id: userId,
          },
        });
        if (curExpDate != "null") {
          try {
            new Date(curExpDate);
            users[i].membershipExpiration = curExpDate.replaceAll("-", "/");
            updateExpirationDate({
              variables: { date: curExpDate, id: userId },
            });
          } catch {
            // means the date was invalid
          }
        }
        setUsers(users);
        break;
      }
    }

    handleCancel();
  };

  // const changeShirtReceived: Function = () => {
  //   setCurShirtStatus(!curShirtStatus);
  // };

  const resetAllShirts: Function = () => {
    updateResetShirts();
    for (let i = 0; i < users.length; i++) {
      users[i].shirtReceived = false;
    }
  };

  const downloadCSV = () => {
    const fileHeaders = [
      { label: "Name", key: "fullName" },
      { label: "Email", key: "email" },
      { label: "Status", key: "isActive"},
      { label: "Expiration", key: "membershipExpiration"},
      { label: "ACM Shirt", key: "shirtReceived"}
    ];
    const CSVLinkStyles = {
      color: "inherit"
    };
    const formattedUsers = users.map(row => ({
      ...row,
      isActive: statusActive(row.membershipExpiration)
    }))
    .map(row => ({
      ...row,
      membershipExpiration: moment(row.membershipExpiration).format("MM/DD/YYYY") === "Invalid date" ? "N/A" : moment(row.membershipExpiration).format("MM/DD/YYYY")
    }))
    .map(row => ({
      ...row,
      shirtReceived: row.shirtReceived ? "Received" : "Not Received"
    }));
    
    return <CSVLink style={CSVLinkStyles} data={formattedUsers} headers={fileHeaders} filename={"acm-members.csv"}>Download CSV</CSVLink>;
  };

  const getShirtStatus: Function = () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        setCurShirtStatus(users[i].shirtReceived);
        return;
      }
    }
    setCurShirtStatus(false);
  };

  const getExpirationDate: Function = () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        setCurExpDate(users[i].membershipExpiration);
        return;
      }
    }
    setCurExpDate("null");
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            setSearchInput(node);
          }}
          placeholder={`Search ${
            dataIndex === "fullName" ? "name" : dataIndex
          }`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text: { toString: () => string }) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys: React.SetStateAction<string>[],
    confirm: () => void,
    dataIndex: React.SetStateAction<string>
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      ...getColumnSearchProps("fullName"),
      render: (record: IUser) => (
        <span>{`${record.firstName === null ? "" : record.firstName} ${record.lastName === null ? "" : record.lastName}`}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Status",
      key: "status",
      render: (record: IUser) => {
        const status = statusActive(record.membershipExpiration);
        let color;
        if (status === "Active") {
          color = "green"
        }
        else if (status === "Expired") {
          color = "red"
        }
        return <span style={{color: color}}>{status}</span>
    },
    },
    {
      title: "Expiration",
      key: "expiration",
      render: (record: IUser) => (
        <span>{formatDateString(record.membershipExpiration)}</span>
      ),
    },
    {
      title: () => {
      return (<span>
        ACM Shirt 
        <LockOutlined onClick={handleShirtReceivedLocked} title="Locked" style={{display: (shirtReceivedLocked ? "inline-block" : "none"), cursor: "pointer", fontSize: "16px", marginLeft: "7px"}} />
        <UnlockOutlined onClick={handleShirtReceivedLocked} title="Unlocked" style={{display: (shirtReceivedLocked ? "none" : "inline-block"), cursor: "pointer", fontSize: "16px", marginLeft: "7px"}} />
      </span>)
      },
      key: "acm shirt",
      align: "center" as "center",
      render: (record: IUser) => (
        <Checkbox onClick={() => {
            setUserId(record.id);
            setCurShirtStatus(!record.shirtReceived);
        }} checked={record.shirtReceived} disabled={shirtReceivedLocked} />
      ),
    },
    {
      key: "edit",
      render: (record: IUser) => (
        <Dropdown.Button trigger={['click']} overlay={
          <Menu>
            <Menu.Item icon={<UserOutlined />} onClick={() => {
              setUserId(record.id);
              setCurShirtStatus(record.shirtReceived);
              setCurExpDate(record.membershipExpiration);
              handleVisibility();
            }}>
              Edit
            </Menu.Item>
            <Menu.Item icon={<UserOutlined />} style={{color: "red"}} onClick={() => {handleVisibilityDelete()}}>
              Delete
            </Menu.Item>
          </Menu>
        }></Dropdown.Button>
      ),
    },
  ];

  return (
    <div>
      <Button style={{marginBottom: "20px"}} onClick={() => resetAllShirts()}>
        Reset Shirt Status
      </Button>

      <Button style={{float: "right"}}>
        {downloadCSV()}
      </Button>

      <Table dataSource={users} columns={columns} />
      <Modal
        visible={editMembershipVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <EditModalHeader>
          <div>
            <strong>{name(userId)}</strong>
          </div>
          <div>
            {email(userId)}
          </div>
        </EditModalHeader>
        <hr />
        <div>
          <EditCol>
            <span>Membership Expiration Date: </span>
            <DatePicker
              value={curExpDate ? moment(curExpDate) : null}
              onChange={changeDate}
              placeholder="Select Expiration Date"
            />
          </EditCol>

          <hr />

          <Button onClick={() => {saveAction()}}>
            Confirm
          </Button>
        </div>
      </Modal>
      <Modal
        visible={editMembershipVisibleDelete}
        footer={null}
        onCancel={handleCancelDelete}
      >
        <div>Are you sure you want to delete this user?</div>
        <DeleteConfirmation>
          <DeleteYes onClick={deleteUser(userId)}>Yes</DeleteYes>
          <button onClick={handleNo()}>No</button>
        </DeleteConfirmation>
      </Modal>
    </div>
  );
};

export { Membership };

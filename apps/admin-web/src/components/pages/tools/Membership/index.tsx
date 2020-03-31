import React, { useState, useEffect } from "react";

import { Table, Input, Button, Icon, Modal, DatePicker, message } from "antd";
import Highlighter from "react-highlight-words";
import moment from "moment";
import styled, { AnyStyledComponent } from "styled-components";

import { IStyles } from "./IStyles";
import { IUser } from "./interfaces";
import {
  useUpdateExpirationDateMutation,
  useMembersQuery,
  useUpdateShirtReceivedMutation,
  useResetShirtReceivedMutation,
  useDeleteMemberMutation,
  User,
} from "../../../../generated/graphql";

const btnStyles: IStyles = {
  display: "inline-block",
  cursor: "pointer",
  marginLeft: "9px",
};

const EditInputs: AnyStyledComponent = styled.input`
  margin-left: 20px;
`;

const EditCol: AnyStyledComponent = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

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
  const {
    loading: memberLoading,
    error: memberError,
    data: memberData,
  }: any = useMembersQuery();

  const [
    updateExpirationDate,
    {
      loading: expirationLoading,
      error: expirationError,
      data: expirationData,
    },
  ]: any = useUpdateExpirationDateMutation();

  const [
    updateShirtReceived,
    {
      loading: updateShirtLoading,
      error: updateShirtError,
      data: updateShirtData,
    },
  ]: any = useUpdateShirtReceivedMutation();

  const [
    updateDeleteMember,
    {
      loading: deleteMemberLoading,
      error: deleteMemberError,
      data: deleteMemberData,
    },
  ]: any = useDeleteMemberMutation();

  const [
    updateResetShirts,
    {
      loading: resetShirtsLoading,
      error: resetShirtsError,
      data: resetShirtsData,
    },
  ]: any = useResetShirtReceivedMutation();

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [searchInput, setSearchInput] = useState<any>("");

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
    if (memberLoading) {
      message.info("Member Data Loading");
    } else if (memberError) {
      message.info("An error occured loading member data.");
    } else if (memberData) {
      const usersData: IUser[] = memberData.users.map((user: User) => ({
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
      }));
      setUsers(usersData);
      message.success("Member data loaded.");
    }
  }, [memberData, memberLoading, memberError]);

  useEffect(() => {
    // Events for shirt update mutation
    if (updateShirtLoading) {
      message.info("Update Shirt Data Loading");
    } else if (updateShirtError) {
      message.info("An error occured loading shirt mutation data.");
    } else if (updateShirtData) {
      message.success("Update shirt success.");
    }
  }, [updateShirtData, updateShirtError, updateShirtLoading]);

  useEffect(() => {
    // Events for update expiration mutation
    if (expirationLoading) {
      message.info("Expiration Data Loading");
    } else if (expirationError) {
      message.info("An error occured loading expiration mutation data.");
    } else if (expirationData) {
      message.success("Expiration date update success.");
    }
  }, [expirationData, expirationLoading, expirationError]);

  useEffect(() => {
    // Events for delete member mutation
    if (deleteMemberLoading) {
      message.info("Delete Member Data Loading");
    } else if (deleteMemberError) {
      message.info("An error occured loading delete member mutation data.");
    } else if (deleteMemberData) {
      message.success("Member deletion succeeded.");
    }
  }, [deleteMemberData, deleteMemberError, deleteMemberLoading]);

  useEffect(() => {
    // Events for resetting all shirts mutation
    if (resetShirtsLoading) {
      message.info("Shirt Reset Data Loading");
    } else if (resetShirtsError) {
      message.info("An error occured loading shirt reset mutation data.");
    } else if (resetShirtsData) {
      message.success("Shirt reset succeeded.");
    }
  }, [resetShirtsData, resetShirtsError, resetShirtsLoading]);

  useEffect(() => {
    getShirtStatus();
    getExpirationDate();
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
        return users[i].fullName;
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
          updateDeleteMember(id);
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
    return new Date(expirationDate).toLocaleDateString("en-US");
  };

  const handleNo: Function = () => {
    return (): void => {
      handleCancelDelete();
      handleVisibility();
    };
  };

  const deleteAction: Function = () => {
    return (): void => {
      handleCancel();
      handleVisibilityDelete();
    };
  };

  const changeDate: (date: any, dateString: string) => void = (
    _: moment.Moment,
    dateString: string
  ) => {
    setCurExpDate(dateString);
  };

  const saveAction: Function = () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId.toString()) {
        users[i].membershipExpiration = curExpDate;
        users[i].shirtReceived = curShirtStatus;
        updateShirtReceived({
          variables: {
            received: curShirtStatus,
            id: userId,
          },
        });
        updateExpirationDate({
          variables: { date: curExpDate, id: userId },
        });
        setUsers(users);
        break;
      }
    }

    handleCancel();
  };

  const changeShirtReceived: Function = () => {
    setCurShirtStatus(!curShirtStatus);
  };

  const resetAllShirts: Function = () => {
    updateResetShirts();
    for (let i = 0; i < users.length; i++) {
      users[i].shirtReceived = false;
    }
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
          icon="search"
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
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
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
        <span>{`${record.firstName} ${record.lastName}`}</span>
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
      render: (record: IUser) => (
        <span>{statusActive(record.membershipExpiration)}</span>
      ),
    },
    {
      title: "Expiration",
      key: "expiration",
      render: (record: IUser) => (
        <span>{formatDateString(record.membershipExpiration)}</span>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (record: IUser) => (
        <button
          style={btnStyles}
          onClick={() => {
            setUserId(record.id);
            handleVisibility();
          }}
        >
          Edit
        </button>
      ),
    },
    {
      title: "ACM Shirt",
      key: "acm shirt",
      render: (record: IUser) => (
        <span>{record.shirtReceived ? "Received" : "Not Received"}</span>
      ),
    },
  ];

  return (
    <div>
      <ShirtResetButton style={btnStyles} onClick={() => resetAllShirts()}>
        Reset Shirt Status
      </ShirtResetButton>

      <Table dataSource={users} columns={columns} />
      <Modal
        visible={editMembershipVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <div>
          <strong>{name(userId)}</strong>
        </div>
        <div>{email(userId)}</div>
        <hr />
        <div>
          <EditCol>
            <span>Picked Up Shirt:</span>
            <EditInputs
              type="checkbox"
              checked={curShirtStatus}
              onClick={changeShirtReceived}
            />
          </EditCol>

          <EditCol>
            <span>Membership Expiration Date: </span>
            <DatePicker
              value={moment(curExpDate)}
              onChange={changeDate}
              placeholder="Select Expiration Date"
            />
          </EditCol>

          <hr />

          <button style={btnStyles} onClick={deleteAction()}>
            Delete
          </button>
          <ConfirmButton style={btnStyles} onClick={saveAction}>
            Confirm
          </ConfirmButton>
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


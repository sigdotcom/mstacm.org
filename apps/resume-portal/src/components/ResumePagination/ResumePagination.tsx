import { Pagination } from "antd";
import React, { useGlobal } from "reactn";

export const ResumePagination: React.FC = () => {
  const [curPage, setCurPage] = useGlobal("curPage");
  const [displayPerPage, setDisplayPerPage] = useGlobal("displayPerPage");
  const [users] = useGlobal("users");

  const onChange = (page: number): void => {
    setCurPage(page);
  };

  const onShowSizeChange = (_: number, size: number): void => {
    setDisplayPerPage(size);
  };

  return (
    <div className="flex content-center justify-center items-center">
      <div className="p-3">
        <Pagination
          showSizeChanger={true}
          defaultCurrent={3}
          current={curPage}
          pageSize={displayPerPage}
          total={users.length}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </div>
  );
};

import { Pagination } from "antd";
import React, { useContext } from "react";

import { FavoritesContext } from "../../context/FavoritesContext";
import { PaginationContext } from "../../context/PaginationContext";

export const ResumePagination: React.FC = () => {
  const { users } = useContext(FavoritesContext);
  const { curPage, displayPerPage, setCurPage, setDisplayPerPage } = useContext(
    PaginationContext
  );

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

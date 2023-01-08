import React from "react";
import ReactPaginate from "react-paginate";

import style from "./Pagination.module.scss";

const Pagination = ({ total, onChangePage }) => {
  return (
    <div className={style.root}>
      <ReactPaginate
        className={style.pagination}
        breakLabel='...'
        nextLabel='>'
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={total}
        previousLabel='<'
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;

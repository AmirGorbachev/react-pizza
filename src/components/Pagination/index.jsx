import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";

import style from "./Pagination.module.scss";
import { setCurrentPage } from "../../store/slices/filterSlice";

const Pagination = () => {
  const { currentPage, totalPages } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onChangePage = (value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <div className={style.root}>
      <ReactPaginate
        className={style.pagination}
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        forcePage={currentPage - 1}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;

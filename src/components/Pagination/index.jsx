import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";

import style from "./Pagination.module.scss";
import { selectFilter, setCurrentPage } from "../../store/slices/filterSlice";
import { selectPizza } from "../../store/slices/pizzaSlice";

const Pagination = () => {
  const { currentPage } = useSelector(selectFilter);
  const { totalPages } = useSelector(selectPizza);
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

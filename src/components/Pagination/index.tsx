import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";

import { selectFilter } from "../../store/filter/selectors";
import { setCurrentPage } from "../../store/filter/slice";
import { selectPizza } from "../../store/pizza/selectors";

import style from "./Pagination.module.scss";

export const Pagination: React.FC = () => {
  const { currentPage } = useSelector(selectFilter);
  const { totalPages } = useSelector(selectPizza);
  const dispatch = useDispatch();

  const onChangePage = (value: number) => {
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
      />
    </div>
  );
};

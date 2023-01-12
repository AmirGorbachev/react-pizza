import React from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

import { selectFilter, setFilters } from "../store/slices/filterSlice";
import { loadPizzas, selectPizza } from "../store/slices/pizzaSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: pizzas, status: statusLoad } = useSelector(selectPizza);
  let hasUrlParams = React.useRef(false);
  let isMounted = React.useRef(false);

  // components
  const { category, sort, isOrderAsc, currentPage, searchBy } =
    useSelector(selectFilter);

  // При первом рендере сохранять параметры в сторе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          category: params.category,
          sort: params.sort,
          currentPage: params.currentPage,
          searchBy: params.searchBy,
          order: params.isOrderAsc,
        })
      );

      hasUrlParams.current = true;
    }
  }, [dispatch]);

  // При последующих рендерах записывать параметры в URL
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (isMounted.current) {
      const queryString = qs.stringify({
        category,
        sort: sort,
        searchBy,
        currentPage,
        isOrderAsc,
      });

      navigate(`?${queryString}`);
    }

    dispatch(loadPizzas());

    isMounted.current = true;
  }, [category, sort, isOrderAsc, searchBy, currentPage, dispatch, navigate]);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <div className='content__title-wrapper'>
        <h2 className='content__title'>Все пиццы</h2>
        <Search />
      </div>
      <div className='content__items'>
        {statusLoad === "loading"
          ? [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      {currentPage > 0 && <Pagination />}
    </>
  );
}

export default Home;

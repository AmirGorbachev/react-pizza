import React from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import Sort from "../components/Sort";
// import Categories from "../components/Categories";
// import PizzaBlock from "../components/PizzaBlock";
// import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
// import Search from "../components/Search";
// import Pagination from "../components/Pagination";

import {
  Sort,
  Categories,
  PizzaBlock,
  Skeleton,
  Search,
  Pagination,
} from "../components";

import { useAppDispatch } from "../store";
import { selectFilter } from "../store/filter/selectors";
import { setFilters } from "../store/filter/slice";
import { FilterParams } from "../store/filter/types";
import { loadPizzas } from "../store/pizza/asyncActions";
import { selectPizza } from "../store/pizza/selectors";
import { Status } from "../store/pizza/types";

type PizzaItem = {
  id: number | string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items: pizzas, status: statusLoad } = useSelector(selectPizza);
  let isMounted = React.useRef(false);

  const { category, sort, isOrderAsc, currentPage, searchBy } =
    useSelector(selectFilter);

  // При первом рендере сохранять параметры в сторе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          category: Number(params.category),
          sort: String(params.sort),
          currentPage: Number(params.currentPage),
          searchBy: String(params.searchBy),
          isOrderAsc: params.isOrderAsc !== "false",
        })
      );
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

    dispatch(loadPizzas({} as FilterParams));

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
        {statusLoad === Status.LOADING
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza: PizzaItem) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
      </div>
      {currentPage > 0 && <Pagination />}
    </>
  );
};

export default Home;

import React from "react";
import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setTotalPages, setFilters } from "../store/slices/filterSlice";

import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  let hasUrlParams = React.useRef(false);
  let isMounted = React.useRef(false);

  // components
  const { category, sort, isOrderAsc, currentPage, searchBy } = useSelector(
    (state) => state.filter
  );

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
          isOrderAsc: params.isOrderAsc,
        })
      );

      hasUrlParams.current = true;
    }
  }, [dispatch]);

  // При последующих рендерах записывать параметры в URL
  React.useEffect(() => {
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

    isMounted.current = true;
  }, [category, sort, isOrderAsc, searchBy, currentPage, navigate]);

  // Загрузка данных
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!hasUrlParams.current) {
      setIsLoading(true);

      const sortMask = `&sortBy=${sort}`;
      const orderMask = isOrderAsc ? "&order=acs" : "&order=desc";
      const categoryMask = category > 0 ? `&category=${category}` : "";
      const searchMask = searchBy !== "" ? `&search=${searchBy}` : "";

      axios
        .get(
          `https://63b84b4e6f4d5660c6d29fea.mockapi.io/pizzas?page=${currentPage}&limit=4${sortMask}${orderMask}${categoryMask}${searchMask}`
        )
        .then((data) => {
          setPizzas(data.data.items);
          dispatch(setTotalPages(Math.ceil(data.data.count / 4)));
          setIsLoading(false);
        });
    }

    hasUrlParams.current = false;
  }, [category, sort, isOrderAsc, searchBy, currentPage, dispatch]);

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
        {isLoading
          ? [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      {currentPage > 0 && <Pagination />}
    </>
  );
}

export default Home;

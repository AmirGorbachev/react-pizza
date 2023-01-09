import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

export const SearchContext = React.createContext();

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // components
  const { category, sort, isOrderAsc } = useSelector((state) => state.filter);

  const [searchBy, setSearchBy] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);

    const sortMask = `&sortBy=${sort.value}`;
    const orderMask = isOrderAsc ? "&order=acs" : "&order=desc";
    const categoryMask = category > 0 ? `&category=${category}` : "";
    const searchMask = searchBy !== "" ? `&search=${searchBy}` : "";

    axios
      .get(
        `https://63b84b4e6f4d5660c6d29fea.mockapi.io/pizzas?page=${page}&limit=4${sortMask}${orderMask}${categoryMask}${searchMask}`
      )
      .then((data) => {
        setPizzas(data.data.items);
        setTotalPages(Math.ceil(data.data.count / 4));
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [category, sort, isOrderAsc, searchBy, page]);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <div className='content__title-wrapper'>
        <h2 className='content__title'>Все пиццы</h2>
        <SearchContext.Provider value={{ searchBy, setSearchBy }}>
          <Search />
        </SearchContext.Provider>
      </div>
      <div className='content__items'>
        {isLoading
          ? [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      {page > 0 && (
        <Pagination
          total={totalPages}
          onChangePage={(value) => setPage(value)}
        />
      )}
    </>
  );
}

export default Home;

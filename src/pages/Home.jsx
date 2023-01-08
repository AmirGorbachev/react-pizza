import React from "react";

import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // components
  const [categoryId, setCategoryId] = React.useState(0);
  const sortList = [
    { title: "популярности", value: "rating" },
    { title: "цене", value: "price" },
    { title: "алфавиту", value: "title" },
  ];
  const [sortType, setSortType] = React.useState(sortList[0]);
  const [orderType, setOrderType] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    const sort = `sortBy=${sortType.value}`;
    const order = orderType ? "&order=acs" : "&order=desc";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";

    fetch(
      `https://63b84b4e6f4d5660c6d29fea.mockapi.io/pizzas?${sort}${order}${category}`
    )
      .then((data) => data.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderType]);

  return (
    <>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onSelectCategory={(id) => setCategoryId(id)}
        />
        <Sort
          sortType={sortType}
          sortList={sortList}
          orderType={orderType}
          onSelectSortType={(id) => setSortType(id)}
          onSelectOrderType={(id) => setOrderType(id)}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
}

export default Home;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../store/slices/filterSlice";

function Categories() {
  const value = useSelector((state) => state.filter.category);
  const dispatch = useDispatch();

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onClickCategory = (index) => {
    dispatch(setCategory(index));
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, index) => (
          <li
            key={item}
            onClick={() => onClickCategory(index)}
            className={value === index ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
      <ul></ul>
    </div>
  );
}

export default Categories;

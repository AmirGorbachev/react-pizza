import { useSelector, useDispatch } from "react-redux";
import { selectFilter, setCategory } from "../../store/slices/filterSlice";

const Categories: React.FC = () => {
  const { category: value } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onClickCategory = (index: number) => {
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
};

export default Categories;

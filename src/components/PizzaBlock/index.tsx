import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/cart/slice";
import { CartItem } from "../../store/cart/types";
import { selectPizzaByID } from "../../store/pizza/selectors";

type PizzaBlockProps = {
  id: number | string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const typeNames = ["Тонкое", "Традиционное"];

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSizeIndex, setActiveSizeIndex] = React.useState(0);
  const cartItem = useSelector(selectPizzaByID(id));
  const count = cartItem ? cartItem.count : 0;

  const dispatch = useDispatch();

  const onClickAddBtn = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: activeType,
      size: activeSizeIndex,
      count: 1,
    };

    dispatch(addItem(item));
  };

  return (
    <div className='pizza-block__wrapper'>
      <div className='pizza-block'>
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
        <h4 className='pizza-block__title'>{title}</h4>
        <div className='pizza-block__selector'>
          <ul>
            {types.map((type) => (
              <li
                key={type}
                className={activeType === type ? "active" : ""}
                onClick={() => setActiveType(type)}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={size}
                className={activeSizeIndex === index ? "active" : ""}
                onClick={() => setActiveSizeIndex(index)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <button
            className='button button--outline button--add'
            onClick={() => onClickAddBtn()}
          >
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Добавить</span>
            {count > 0 && <i>{count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

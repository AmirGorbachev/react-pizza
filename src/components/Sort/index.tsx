import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilter } from "../../store/filter/selectors";
import { setSort, setOrderAsc } from "../../store/filter/slice";

type SortItem = {
  title: string;
  value: string;
};

type PopupCLick = MouseEvent & {
  path: Node[];
};

const sortList = [
  { title: "популярности", value: "rating" },
  { title: "цене", value: "price" },
  { title: "алфавиту", value: "title" },
];

export const Sort: React.FC = () => {
  const { sort: sortType, isOrderAsc: orderType } = useSelector(selectFilter);

  const dispatch = useDispatch();

  const sortRef = React.useRef<HTMLDivElement>(null);

  const [isOpenList, setIsOpenList] = React.useState(false);
  const activeSort = sortList.find((item: SortItem) => item.value === sortType);

  const onSelectSortItem = (sortType: SortItem) => {
    dispatch(setSort(sortType.value));
    setIsOpenList(false);
  };

  const onSelectOrder = () => {
    dispatch(setOrderAsc(!orderType));
  };

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const _event = event as PopupCLick;

      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsOpenList(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpenList(!isOpenList)}>
          {activeSort?.title}
        </span>
        <svg
          className={orderType ? "down" : ""}
          onClick={() => onSelectOrder()}
          width='25'
          height='25'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='style=linear'>
            <g id='arrow-long-up'>
              <path
                id='vector'
                d='M11.9929 21.293L11.9929 2.79297'
                stroke='#fe5f1e'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
              <path
                id='vector_2'
                d='M4.99292 9.29297L11.2858 3.00008C11.6763 2.60955 12.3095 2.60955 12.7 3.00008L18.9929 9.29297'
                stroke='#fe5f1e'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </g>
          </g>
        </svg>
      </div>
      {isOpenList && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((sortItem: SortItem) => (
              <li
                key={sortItem.value}
                className={activeSort?.value === sortItem.value ? "active" : ""}
                onClick={() => onSelectSortItem(sortItem)}
              >
                {sortItem.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

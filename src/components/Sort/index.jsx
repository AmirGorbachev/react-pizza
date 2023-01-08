import React from "react";

function Sort({
  sortType,
  sortList,
  onSelectSortType,
  orderType,
  onSelectOrderType,
}) {
  const [isOpenList, setIsOpenList] = React.useState(false);

  const onSelectSortItem = (sortType) => {
    onSelectSortType(sortType);
    setIsOpenList(false);
  };

  const onSelectOrder = () => {
    onSelectOrderType(!orderType);
  };

  return (
    <div className='sort'>
      <div className='sort__label'>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpenList(!isOpenList)}>{sortType.title}</span>
        <svg
          className={orderType ? "" : "down"}
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
            {sortList.map((sortItem) => (
              <li
                key={sortItem.value}
                className={sortType.value === sortItem.value ? "active" : ""}
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
}

export default Sort;

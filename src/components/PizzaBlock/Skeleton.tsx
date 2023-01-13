import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <div className='pizza-block__wrapper'>
    <ContentLoader
      className='pizza-block'
      speed={2}
      width={280}
      height={469}
      viewBox='0 0 280 469'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      <circle cx='140' cy='130' r='125' />
      <rect x='0' y='270' rx='5' ry='5' width='280' height='25' />
      <rect x='0' y='315' rx='10' ry='10' width='280' height='88' />
      <rect x='0' y='430' rx='5' ry='5' width='95' height='30' />
      <rect x='147' y='422' rx='30' ry='30' width='130' height='45' />
    </ContentLoader>
  </div>
);

export default Skeleton;

import React from "react";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>&#128547;</span>
        <br />
        Ничего не найдено
      </h1>
    </div>
  );
};

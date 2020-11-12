import React from "react";
import styles from "./index.module.scss";
import { MoneyOff } from '@rimble/icons';
import { Avatar } from "rimble-ui";

function Main({ children }) {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <MoneyOff color="#fff" size={40} />
          <span className={styles.text}>Cook</span>
        </div>
        <div className={styles.user}>
          <span>GCK48...GCK</span>
          <Avatar />
        </div>
      </div>
      <div className={styles.main}>
        {children}
      </div>
    </>
  );
}

export default Main;

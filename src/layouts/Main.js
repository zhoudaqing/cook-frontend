import React from "react";
import styles from "./index.module.scss";
import { Avatar } from "rimble-ui";
import logo from '../img/logo.webp';

function Main({ children }) {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoWrap}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <span className={styles.text}>Cook</span>
        </div>
        <div className={styles.user}>
          <span>GCK48...GCK</span>
          <Avatar src="" />
        </div>
      </div>
      <div className={styles.main}>
        {children}
      </div>
    </>
  );
}

export default Main;

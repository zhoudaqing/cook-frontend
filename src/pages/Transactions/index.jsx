import styles from "./index.module.scss";
import React, { useState } from "react";
import { Button } from "rimble-ui";
import OpenLeverLeftPart from "./OpenLeverLeftPart";
import PayBackLeftPart from "./PayBackLeftPart";
import RightPart from "./RightPart";

// mock 列表模拟数据
const tableDatas = {
  remainingBalance: {
    value: 30800,
    list: [
      // 余额
      {
        asset: "BTC", // 资产
        count: 3, // 数量
        value: 30000, //  价值
      },
      {
        asset: "ETH", // 资产
        count: 2, // 数量
        value: 800, //  价值
      },
    ],
  },
  borrowing: {
    value: 30800,
    list: [
      // 借贷
      {
        // 余额
        asset: "BTC", // 资产
        count: 3, // 数量
        value: 30000, //  价值
        interest: "3.91%",
      },
      {
        // 余额
        asset: "ETH", // 资产
        count: 1, // 数量
        value: 400, //  价值
        interest: "2.9%",
      },
    ],
  },
};

const Transactions = () => {
  const [type, setType] = useState("openLever"); // 开杠杆（openLever） or 偿还（payBack）
  const [listData, setListData] = useState({
    remainingBalance: {
      value: 0,
    },
    borrowing: {
      value: 0,
    }, // 借贷
  }); // 右边列表余额、借贷

  // 执行回调
  const onSubmit = (params) => {
    setListData(tableDatas); // 更新右侧列表数据
  };

  return (
    <div className={styles.content}>
      <div className={styles.buttonWrap}>
        <div>
          <Button
            className={`${styles.button} ${styles.buttonLeft} ${
              type === "openLever" ? styles.buttonActive : ""
            }`}
            width={300}
            onClick={() => {
              setType("openLever");
            }}
          >
            开杠杠
          </Button>
          <Button
            className={`${styles.button} ${styles.buttonRight} ${
              type === "payBack" ? styles.buttonActive : ""
            }`}
            width={300}
            onClick={() => {
              setType("payBack");
            }}
          >
            偿还
          </Button>
        </div>
      </div>
      <div className={styles.main}>
        {type === "openLever" && (
          <OpenLeverLeftPart type={type} onSubmit={onSubmit} />
        )}
        {type === "payBack" && (
          <PayBackLeftPart type={type} onSubmit={onSubmit} />
        )}
        <RightPart listDatas={listData} />
      </div>
    </div>
  );
};

export default Transactions;

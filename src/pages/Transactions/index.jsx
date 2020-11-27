import styles from "./index.module.scss";
import React, {useState} from "react";
import {Button} from "rimble-ui";
import OpenLeverLeftPart from "./OpenLeverLeftPart";
import PayBackLeftPart from "./PayBackLeftPart";
import RightPart from "./RightPart";

// mock 列表模拟数据
const tableDatas = {
  balance: {
    value: 30800, // 余额
    assets: {
      "BTC": {
        count: 3,
        value: 3000,
      },
      "ETH": {
        count: 2,
        value: 800
      }
    }
  },
  debt: {
    value: 20400, // 借贷
    quota: 22500, // 借贷限额
    assets: {
      "BTC": {
        count: 3,
        value: 30000,
        interest: "3.91%"
      },
      "ETH": {
        count: 1,
        value: 400,
        interest: "2.9%"
      }
    }
  },
};

const Transactions = () => {
  const [type, setType] = useState("openLever"); // 开杠杆（openLever） or 偿还（payBack）
  const [operate, setOperate] = useState("long"); // 做多(long) or 做空(short)
  const [operateInfo, setOperateInfo] = useState({
    collateral: 0,
    leverage: 0
  });
  const [accountData, setAccountData] = useState({
    balance: {
      value: 0, // 余额
      assets: {
        "BTC": {
          count: 0,
          value: 0,
        },
        "ETH": {
          count: 0,
          value: 0
        }
      }
    },
    debt: {
      value: 0, // 借贷
      quota: 0, // 借贷限额
      assets: {
        "BTC": {
          count: 0,
          value: 0,
          interest: "3.91%"
        },
        "ETH": {
          count: 0,
          value: 0,
          interest: "2.9%"
        }
      }
    },
  }); // 右边列表余额、借贷
  const [targetAccountData, setTargetAccountData] = useState(JSON.parse(JSON.stringify(accountData)));

  // 执行回调
  const onSubmit = (params) => {
    setAccountData(tableDatas); // 更新右侧列表数据
  };
  // console.log(targetAccountData);
  return (
    <div className={styles.content}>
      <div className={styles.buttonWrap}>
        <div>
          <Button
            className={`${styles.button} ${styles.buttonLeft} ${
              type === "openLever"
                ? operate === "short"
                ? styles.buttonEnable
                : styles.buttonActive
                : ""
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
          <OpenLeverLeftPart
            type={type}
            operate={operate}
            setOperate={setOperate}
            operateInfo={operateInfo}
            setOperateInfo={setOperateInfo}
            accountData={accountData}
            targetAccountData={targetAccountData}
            setTargetAccountData={setTargetAccountData}
            onSubmit={onSubmit}
          />
        )}
        {type === "payBack" && (
          <PayBackLeftPart type={type} onSubmit={onSubmit}/>
        )}
        <RightPart operate={operate} targetAccountData={targetAccountData}/>
      </div>
    </div>
  );
};

export default Transactions;

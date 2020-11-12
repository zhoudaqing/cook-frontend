import styles from "./index.module.scss";
import React from "react";
import { Button, Table } from "rimble-ui";

const RightPart = ({ listDatas }) => {
  // 提取代币
  const withdraw = () => {
    console.log("提取COMP代币");
  };

  return (
    <div className={styles.rightPart}>
      {listDatas.remainingBalance.value == 0 && (
        <div className={styles.zero}>
          <div style={{ marginBottom: 30 }}>余额：$0.0 </div>
          <div>借贷：$0.0 </div>
        </div>
      )}
      {listDatas.remainingBalance.value != 0 && (
        <div className={styles.tableWrap}>
          <div style={{ marginBottom: 20 }}>
            余额：${listDatas.remainingBalance.value}{" "}
          </div>
          <Table>
            <thead>
              <tr>
                <th>资产</th>
                <th>数量</th>
                <th>价值（$)</th>
              </tr>
            </thead>
            <tbody>
              {listDatas.remainingBalance.list.map(
                ({ asset, count, value }, index) => {
                  return (
                    <tr key={index}>
                      <td>{asset}</td>
                      <td>{count}</td>
                      <td>{value}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </div>
      )}
      {listDatas.borrowing.value != 0 && (
        <div className={styles.tableWrap} style={{ marginTop: 60 }}>
          <div style={{ marginBottom: 20 }}>
            借贷：${listDatas.borrowing.value}{" "}
          </div>
          <Table>
            <thead>
              <tr>
                <th>资产</th>
                <th>数量</th>
                <th>价值（$)</th>
                <th>年利息</th>
              </tr>
            </thead>
            <tbody>
              {listDatas.borrowing.list.map(
                ({ asset, count, value, interest }, index) => {
                  return (
                    <tr key={index}>
                      <td>{asset}</td>
                      <td>{count}</td>
                      <td>{value}</td>
                      <td>{interest}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </div>
      )}
      {listDatas.borrowing.value != 0 && (
        <div className={styles.bottomTips}>
          *请注意当您借贷达到借贷限额时，会被平仓，请保留一定安全边际
        </div>
      )}
      {listDatas.borrowing.value != 0 && (
        <div className={styles.bottomButton}>
          <Button className={styles.withdrawBit} onClick={withdraw}>
            提取COMP代币
          </Button>
        </div>
      )}
    </div>
  );
};

export default RightPart;

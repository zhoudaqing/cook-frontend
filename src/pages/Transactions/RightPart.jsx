import styles from "./index.module.scss";
import React from "react";
import { Button, Table } from "rimble-ui";
import { formatNum } from "../../utils/utils";

const RightPart = ({ operate, targetAccountData }) => {
  // 提取代币
  const withdraw = () => {
    console.log("提取COMP代币");
  };
  console.log(targetAccountData);
  return (
    <div className={styles.rightPart}>
      {targetAccountData.balance.value === 0 && (
        <div className={styles.zero}>
          <div style={{ marginBottom: 30 }}>余额：$0.0 </div>
          <div>借贷：$0.0 </div>
        </div>
      )}
      {targetAccountData.balance.value !== 0 && (
        <div className={styles.tableWrap}>
          <div style={{ marginBottom: 20 }}>
            余额：${formatNum(targetAccountData.balance.value)}
          </div>
          <Table>
            <thead>
              <tr>
                <th width="20%">资产</th>
                <th width="23%">数量</th>
                <th>价值（$)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(targetAccountData.balance.assets).map(asset => {
                return (
                  <tr key={asset}>
                    <td>{asset}</td>
                    <td>{targetAccountData.balance.assets[asset].count}</td>
                    <td>{formatNum(targetAccountData.balance.assets[asset].value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {targetAccountData.debt.value !== 0 && (
        <div className={styles.tableWrap} style={{ marginTop: 60 }}>
          <div className={styles.borrowingHeader}>
            <span>借贷：${formatNum(targetAccountData.debt.value)}</span>
            <span>借贷限额：${formatNum(targetAccountData.debt.quota)}</span>
          </div>
          <Table>
            <thead>
              <tr>
                <th width="20%">资产</th>
                <th width="23%">数量</th>
                <th>价值（$)</th>
                <th>年利息</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(targetAccountData.debt.assets).map(asset => {
                return (
                  <tr key={asset}>
                    <td>{asset}</td>
                    <td>{targetAccountData.debt.assets[asset].count}</td>
                    <td>{formatNum(targetAccountData.debt.assets[asset].value)}</td>
                    <td>{targetAccountData.debt.assets[asset].interest}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {targetAccountData.debt.value !== 0 && (
        <div className={styles.bottomTips}>
          *请注意当您借贷达到借贷限额时，会被平仓，请保留一定安全边际
        </div>
      )}
      {targetAccountData.debt.value !== 0 && (
        <div className={styles.bottomButton}>
          <Button
            className={`${styles.withdrawBit} ${
              operate === "short" ? styles.withdrawBitEnable : ""
            }`}
            onClick={withdraw}
          >
            提取COMP代币
          </Button>
        </div>
      )}
    </div>
  );
};

export default RightPart;

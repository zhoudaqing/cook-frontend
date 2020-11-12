import styles from "./index.module.scss";
import React, { useState } from "react";
import { Button, Input } from "rimble-ui";
import { Select } from "rimble-ui";

const OpenLeverLeftPart = ({ type, onSubmit }) => {
  const [operate, setOperate] = useState("long"); // 做多(long) or 做空(short)
  const [currencyType, setCurrencyType] = useState("BTC"); //  货币类型下拉框值: BTC or DAI
  const [mortgage, setMortgage] = useState("0.0"); // 抵押 or 用 输入框值
  const [forLong, setForLong] = useState("0.0"); // 做多 or 做空 or 还输入框值

  // 货币类型下拉列表值变化
  const onCurrencyTypeChange = (e) => {
    setCurrencyType(e.target.value);
  };

  // 抵押输入框值变更
  const onMortgageChange = (e) => {
    setMortgage(e.target.value);
  };

  // 做空 or 做多输入值变更
  const onForLongChange = (e) => {
    setForLong(e.target.value);
  };

  // 执行
  const submit = () => {
    console.log(
      `type=${type};operate=${operate};currencyType=${currencyType};mortgage=${mortgage};forLong=${forLong}`
    );

    onSubmit({
      type,
      operate,
      currencyType,
      mortgage,
      forLong,
    });
  };

  return (
    <div className={styles.leftPart}>
      <div>
        <Button
          className={`${styles.tabButton} ${
            operate === "long" ? styles.activeTabButton : ""
          }`}
          width={300}
          onClick={() => {
            setOperate("long");
          }}
        >
          做多
        </Button>
        <Button
          className={`${styles.tabButton} ${
            operate === "short" ? styles.activeTabButton : ""
          }`}
          width={300}
          onClick={() => {
            setOperate("short");
          }}
        >
          做空
        </Button>
        <Select
          bg="#070707"
          color="#fff"
          fontSize={18}
          fontWeight={700}
          border="1"
          borderColor="rgba(255, 255, 255, 0.1)"
          borderRadius={5}
          value={currencyType}
          onChange={onCurrencyTypeChange}
          options={[
            { value: "BTC", label: "BTC" },
            { value: "DAI", label: "DAI" },
          ]}
        />
      </div>
      <div className={styles.inputRow} style={{ margin: " 54px 0" }}>
        <span>抵押</span>
        <Input
          ml={22}
          mr={22}
          type="text"
          required
          width={320}
          bg="#070707"
          color="rgba(255, 255, 255, 0.2)"
          fontSize={30}
          fontWeight={400}
          border="1"
          borderColor="rgba(255, 255, 255, 0.1)"
          borderRadius={5}
          onChange={onMortgageChange}
          value={mortgage}
        />
        <span>{currencyType}</span>
      </div>
      <div className={styles.inputRow} style={{ marginBottom: 54 }}>
        <span>{operate === "long" ? "做多" : "做空"}</span>
        <Input
          ml={22}
          mr={22}
          type="text"
          required
          width={320}
          bg="#070707"
          color="rgba(255, 255, 255, 0.2)"
          fontSize={30}
          fontWeight={400}
          border="1"
          borderColor="rgba(255, 255, 255, 0.1)"
          borderRadius={5}
          onChange={onForLongChange}
          value={forLong}
        />
        <span>{currencyType}</span>
      </div>
      <Button className={styles.exeButton} onClick={submit}>
        执行
      </Button>
    </div>
  );
};

export default OpenLeverLeftPart;

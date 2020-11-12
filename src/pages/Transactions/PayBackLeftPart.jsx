import styles from "./index.module.scss";
import React, { useState } from "react";
import { Button, Input } from "rimble-ui";
import { Select } from "rimble-ui";

// 货币类型
const coinType = [
  { value: "BTC", label: "BTC" },
  { value: "DAI", label: "DAI" },
];

const PayBackLeftPart = ({ type, onSubmit }) => {
  const [value1, setValue1] = useState("0.0"); // 用
  const [unit1, setUnit1] = useState("BTC"); //  货币类型下拉框值: BTC or DAI
  const [value2, setValue2] = useState("0.0"); // 还
  const [unit2, setUnit2] = useState("BTC"); //  货币类型下拉框值: BTC or DAI

  // 用
  const onValue1Change = (e) => {
    setValue1(e.target.value);
  };

  // 用 单位
  const onUnit1Change = (e) => {
    setUnit1(e.target.value);
  };

  // 还
  const onValue2Change = (e) => {
    setValue2(e.target.value);
  };

  // 还 单位
  const onUnit2Change = (e) => {
    setUnit2(e.target.value);
  };

  // 执行
  const submit = () => {
    console.log(
      `value1=${value1};unit1=${unit1};value2=${value2};unit2=${unit2};`
    );

    onSubmit({
      value1,
      unit1,
      value2,
      unit2,
    });
  };

  return (
    <div className={styles.leftPart}>
      <div className={styles.inputRow} style={{ margin: " 54px 0" }}>
        <span>用</span>
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
          onChange={onValue1Change}
          value={value1}
        />
        <Select
          bg="#070707"
          color="#fff"
          fontSize={18}
          fontWeight={700}
          border="1"
          borderColor="rgba(255, 255, 255, 0.1)"
          borderRadius={5}
          value={unit1}
          onChange={onUnit1Change}
          options={coinType}
        />
      </div>
      <div className={styles.inputRow} style={{ marginBottom: 54 }}>
        <span>还</span>
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
          onChange={onValue2Change}
          value={value2}
        />
        <Select
          bg="#070707"
          color="#fff"
          fontSize={18}
          fontWeight={700}
          border="1"
          borderColor="rgba(255, 255, 255, 0.1)"
          borderRadius={5}
          value={unit2}
          onChange={onUnit2Change}
          options={coinType}
        />
      </div>
      <Button className={styles.exeButton} onClick={submit}>
        执行
      </Button>
    </div>
  );
};

export default PayBackLeftPart;

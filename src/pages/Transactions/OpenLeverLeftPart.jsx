import styles from "./index.module.scss";
import React, {useState} from "react";
import {Button, Input} from "rimble-ui";
import {Select} from "rimble-ui";

const OpenLeverLeftPart = ({type, operate, setOperate, operateInfo, setOperateInfo, accountData, btcPrice, ethPrice, btcInterest, ethInterest,targetAccountData, setTargetAccountData, onSubmit}) => {
  const [asset, setAsset] = useState("BTC"); //  货币类型下拉框值: BTC or DAI

  const updatedTargetAccount = (newOperateInfo, asset) => {
    let newAccountData = JSON.parse(JSON.stringify(accountData));
    const collateral = newOperateInfo.collateral === "" ? 0 : parseFloat(newOperateInfo.collateral);
    const leverage = newOperateInfo.leverage === "" ? 0 : parseFloat(newOperateInfo.leverage);
    newAccountData.balance.assets[asset].count += collateral + leverage;
    newAccountData.balance.value = 1;
    newAccountData.debt.value = 1;
    newAccountData.debt.assets[asset].count += leverage;
    return newAccountData;
  }

  // 货币类型下拉列表值变化
  const onCurrencyTypeChange = (e) => {
    setAsset(e.target.value);
    setTargetAccountData(updatedTargetAccount(operateInfo, e.target.value));
  };

  // 抵押输入框值变更
  const onCollateralChange = (e) => {
    let newOperateInfo = {...operateInfo};
    newOperateInfo.collateral = e.target.value;
    setOperateInfo(newOperateInfo);
    setTargetAccountData(updatedTargetAccount(newOperateInfo, asset));
  };

  // 做空 or 做多输入值变更
  const onLeverageChange = (e) => {
    let newOperateInfo = {...operateInfo};
    newOperateInfo.leverage = e.target.value;
    setOperateInfo(newOperateInfo);
    setTargetAccountData(updatedTargetAccount(newOperateInfo, asset));

    let newAccountData = {...accountData};
    newAccountData.balance.assets.BTC.value = btcPrice;
    newAccountData.balance.assets.ETH.value = ethPrice;
    newAccountData.debt.assets.BTC.value = btcPrice;
    newAccountData.debt.assets.ETH.value = ethPrice;

    newAccountData.debt.assets.BTC.interest = (btcInterest * 100).toFixed(2) + '%';
    newAccountData.debt.assets.ETH.interest = (ethInterest * 100).toFixed(2) + '%';

    setTargetAccountData(newAccountData);
  };

  // 执行
  const submit = () => {
    console.log(
      `type=${type};operate=${operate};currencyType=${asset};collateral=${operateInfo.collateral};leverage=${operateInfo.leverage}`
    );

    onSubmit({
      type,
      operate,
      currencyType: asset,
      collateral: operateInfo.collateral,
      leverage: operateInfo.leverage,
    });
  };

  return (
    <div className={styles.leftPart}>
      <div>
        <Button
          className={`${styles.tabButton} ${
            operate === "long" ? styles.activeTabButton : styles.enableTabButton
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
            operate === "short" ? styles.activeShortTabButton : ""
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
          value={asset}
          onChange={onCurrencyTypeChange}
          options={[
            {value: "BTC", label: "BTC"},
            {value: "ETH", label: "ETH"},
          ]}
        />
      </div>
      <div className={styles.inputRow} style={{margin: " 54px 0"}}>
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
          placeholder="0.0"
          onChange={onCollateralChange}
          value={operateInfo.collateral}
        />
        <span>{asset}</span>
      </div>
      <div className={styles.inputRow} style={{marginBottom: 54}}>
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
          placeholder="0.0"
          onChange={onLeverageChange}
          value={operateInfo.leverage}
        />
        <span>{asset}</span>
      </div>
      <Button
        className={`${styles.exeButton} ${
          operate === "short" ? styles.exeEnableButton : ""
        }`}
        onClick={submit}
      >
        执行
      </Button>
    </div>
  );
};

export default OpenLeverLeftPart;

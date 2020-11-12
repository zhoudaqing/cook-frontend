import styles from "./index.module.scss";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button, MetaMaskButton } from "rimble-ui";

const Index = () => {
  const history = useHistory();

  const onButtonClick = () => {
    history.push("/createWallet");
  };

  return (
    <div className={styles.content}>
      <span className={styles.title}>欢迎访问库克杠杆交易平台</span>
      <span className={styles.subTitle}>连接您的钱包开始交易</span>
      <div className={styles.buttonWrap}>
        <MetaMaskButton
          className={styles.button}
          width={300}
          onClick={onButtonClick}
        >
          Metamask
        </MetaMaskButton>
        <Button className={styles.button} width={300} onClick={onButtonClick}>
          Im Token
        </Button>
      </div>
    </div>
  );
};

export default Index;

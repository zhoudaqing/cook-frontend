import styles from "./index.module.scss";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button, MetaMaskButton } from "rimble-ui";
import {useStateValue} from "../../contexts";

const Index = () => {
  const history = useHistory();
  const {connectAndValidateAccount} = useStateValue();

  const onButtonClick = () => {
    connectAndValidateAccount(result => {
      if (result === "success") {
        // success
        console.log("Callback SUCCESS");
      } else if (result === "error") {
        // error
        console.log("Callback ERROR");
      }
    });
    // history.push("/createWallet");
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
          ImToken
        </Button>
      </div>
    </div>
  );
};

export default Index;

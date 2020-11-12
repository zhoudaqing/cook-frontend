import styles from "./index.module.scss";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "rimble-ui";

const CreateWallet = () => {
  const history = useHistory();
  const onButtonClick = () => {
    history.push("/transactions");
  };

  return (
    <div className={styles.content}>
      <Button className={styles.button} width={300} onClick={onButtonClick}>
        创建智能合约钱包
      </Button>
    </div>
  );
};

export default CreateWallet;

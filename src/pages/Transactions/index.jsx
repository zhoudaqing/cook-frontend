import styles from "./index.module.scss";
import React, {useState} from "react";
import {Button} from "rimble-ui";
import OpenLeverLeftPart from "./OpenLeverLeftPart";
import PayBackLeftPart from "./PayBackLeftPart";
import RightPart from "./RightPart";

import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import axios from 'axios';

// get ETH and WBTC price information from Uniswap
export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})

const BTC_QUERY = gql`
  query pairs {pairs(where: { id: "0x004375dff511095cc5a197a54140a24efef3a416" }) {
    token1Price
  }}
`

const ETH_PRICE_QUERY = gql`
  query pairs {pairs(where: { id: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc" }) {
    token0Price
  }}
`

// mock 列表模拟数据
const tableDatas = {
  balance: {
    value: 30800, // 余额
    assets: {
      "BTC": {
        count: 3,
        value: 30000,
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
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: btcLoading, data: btcPriceData } = useQuery(BTC_QUERY)

  const btcPriceInUSD = btcPriceData && btcPriceData.pairs[0].token1Price
  const ethPriceInUSD = ethPriceData && ethPriceData.pairs[0].token0Price

  const [rates, setRate] = useState({
    "WBTC":{
      interest:0
    },
    "ETH":{
      interest:0
    },
    "USDT":{
      interest:0
    }
  }); // WBTC and ETH interest rates

  // get WBTC and ETH interest rates from Compound
  axios.get(`https://api.compound.finance/api/v2/ctoken`)
  .then(res => {
    const interest_rate = res.data.cToken.filter(function (token) {
        return (token.underlying_symbol === "WBTC" || token.underlying_symbol === "ETH" || token.underlying_symbol === "USDT")
    });

    Object.keys(interest_rate).forEach(function (key){
      if (interest_rate[key].underlying_symbol === "WBTC"){
        rates.WBTC.interest = interest_rate[key].borrow_rate.value
      }
      else if (interest_rate[key].underlying_symbol === "ETH"){
        rates.ETH.interest = interest_rate[key].borrow_rate.value
      }
      else if(interest_rate[key].underlying_symbol === "USDT"){
        rates.USDT.interest = interest_rate[key].borrow_rate.value
      } 
    })

  })


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
          value: btcPriceInUSD,
        },
        "ETH": {
          count: 0,
          value: ethPriceInUSD,
        }
      }
    },
    debt: {
      value: 0, // 借贷
      quota: 0, // 借贷限额
      assets: {
        "BTC": {
          count: 0,
          value: btcPriceInUSD,
          interest: (rates.WBTC.interest * 100).toFixed(2) + '%'
        },
        "ETH": {
          count: 0,
          value: ethPriceInUSD,
          interest: (rates.ETH.interest * 100).toFixed(2) + '%'
        }
      }
    },
  }); // 右边列表余额、借贷
  const [targetAccountData, setTargetAccountData] = useState(JSON.parse(JSON.stringify(accountData)));

  // 执行回调
  const onSubmit = (params) => {
    tableDatas.balance.assets.BTC.value = tableDatas.balance.assets.BTC.count*btcPriceInUSD;
    tableDatas.balance.assets.ETH.value = tableDatas.balance.assets.ETH.count*ethPriceInUSD;
    tableDatas.debt.assets.BTC.value = tableDatas.debt.assets.BTC.count*btcPriceInUSD;
    tableDatas.debt.assets.ETH.value = tableDatas.debt.assets.ETH.count*ethPriceInUSD;

    tableDatas.debt.assets.BTC.interest = (rates.WBTC.interest * 100).toFixed(2) + '%';
    tableDatas.debt.assets.ETH.interest = (rates.ETH.interest * 100).toFixed(2) + '%';


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
            btcPrice={btcPriceInUSD}
            ethPrice={ethPriceInUSD}
            btcInterest={rates.WBTC.interest}
            ethInterest={rates.ETH.interest}
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

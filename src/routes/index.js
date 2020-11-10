import Index from "../pages/Index";
import CreateWallet from "../pages/CreateWallet";
import Transactions from "../pages/Transactions";

export const main = [{
  id: "index",
  path: "/",
  component: Index,
  children: null
}, {
  id: "createWallet",
  path: "/createWallet",
  component: CreateWallet,
  children: null
}, {
  id: "transactions",
  path: "/transactions",
  component: Transactions,
  children: null
},];


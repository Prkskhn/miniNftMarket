import { BrowserRouter, Route, Routes } from "react-router-dom";
import Web3 from "web3";
import Header from "./components/Header";
import ExchangeABI from "./abi/exchangeABI.json";
import MintNftABI from "./abi/mintNftABI.json";
import ShTokenABI from "./abi/shTokenABI.json";
import Main from "./pages/main";
import { createContext, useState } from "react";
import Detail from "./pages/detail";

export const AppContext = createContext();

export default function App() {
  const [account, setAccount] = useState("");
  const web3 = new Web3(process.env.REACT_APP_PROVIDER);
  const exchange_c_address = "0xB13C3f88734e08c48C02D74025Cf6699bA1f59d0";
  const mintNft_c_address = "0x21AAa296b817D361Ad0389b4Dce24B4389664b58";
  const shToken_c_address = "0x7fdeD157CE1294eF67A7960BE59D16072e5c4d66";

  const exchange_c_abi = ExchangeABI;
  const mintNft_c_abi = MintNftABI;
  const shToken_c_abi = ShTokenABI;

  const exchange_contract = new web3.eth.Contract(
    exchange_c_abi,
    exchange_c_address
  );
  const mintNft_contract = new web3.eth.Contract(
    mintNft_c_abi,
    mintNft_c_address
  );
  const shToken_contract = new web3.eth.Contract(
    shToken_c_abi,
    shToken_c_address
  );

  return (
    <BrowserRouter>
      <div className="bg-gray-900 min-h-screen  ">
        <Header account={account} setAccount={setAccount} />
        <AppContext.Provider
          value={{
            account,
            setAccount,
            exchange_c_address,
            mintNft_c_address,
            shToken_c_address,
            exchange_contract,
            mintNft_contract,
            shToken_contract,
          }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:tokenId" element={<Detail />} />
          </Routes>
        </AppContext.Provider>
      </div>
    </BrowserRouter>
  );
}

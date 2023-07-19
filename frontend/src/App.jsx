import { BrowserRouter, Route, Routes } from "react-router-dom";
import Web3 from "web3";
import Header from "./components/Header";
import CONTRACT_ABI from "./abi/contractABI.json";
import TOKEN_CONTRACT_ABI from "./abi/tokenABI.json";
import Main from "./pages/main";
import { createContext, useState } from "react";
import Detail from "./pages/detail";

export const AppContext = createContext();

export default function App() {
  const [account, setAccount] = useState("");
  const web3 = new Web3(process.env.REACT_APP_PROVIDER);
  const c_address = "0x90Dd0737E64C3bA91277b547D0ce01d3620F82F9";
  const c_abi = CONTRACT_ABI;
  const token_c_address = "0xE7e5099aa128BB2c16d413afBfF502940f096f89";
  const token_c_abi = TOKEN_CONTRACT_ABI;
  const contract = new web3.eth.Contract(c_abi, c_address);
  const tokenContract = new web3.eth.Contract(token_c_abi, token_c_address);

  return (
    <BrowserRouter>
      <div className="bg-gray-900 min-h-screen  ">
        <Header account={account} setAccount={setAccount} />
        <AppContext.Provider
          value={{
            c_address,
            contract,
            account,
            setAccount,
            tokenContract,
            token_c_address,
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

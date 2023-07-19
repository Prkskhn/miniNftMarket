import Intro from "../components/Intro";
import { useContext, useEffect, useState } from "react";
import Nft from "../components/Nft";
import { AppContext } from "../App";

const Main = () => {
  const { account, contract, tokenContract } = useContext(AppContext);
  console.log("컨트랙트주소", contract);

  const [totalNft, setTotalNft] = useState(0);
  const [mintedNft, setMintedNft] = useState(0);
  const [myNft, setMyNft] = useState(0);
  const [token, setToken] = useState(0);

  const getTotalNft = async () => {
    try {
      const response = await contract.methods.totalNft().call();
      setTotalNft(response);
      //console.log("총nft", response);
    } catch (error) {
      console.error(error);
    }
  };

  const getMintedNft = async () => {
    try {
      const response = await contract.methods.totalSupply().call();
      setMintedNft(response);
      //console.log("민팅nft", response);
    } catch (error) {
      console.error(error);
    }
  };

  const getMyNft = async () => {
    try {
      if (!account) return;
      const response = await contract.methods.balanceOf(account).call();
      setMyNft(response);
      //console.log("나의nft11", response);
    } catch (error) {
      console.error(error);
    }
  };
  const getToken = async () => {
    try {
      if (!account) return;
      const response = await tokenContract.methods.balanceOf(account).call();
      setToken(response);
      console.log("나의잔액11", response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalNft();
    getMintedNft();
    getMyNft();
    getToken();
  });
  useEffect(() => {
    getMyNft();
  }, [account]);

  return (
    <div className="max-w-screen-xl mx-auto bg-gray-900  ">
      <Intro
        totalNft={totalNft}
        mintedNft={mintedNft}
        myNft={myNft}
        token={token}
      />
      <Nft totalNft={totalNft} mintedNft={mintedNft} />
    </div>
  );
};
export default Main;

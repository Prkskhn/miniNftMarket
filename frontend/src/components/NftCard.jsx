import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const NftCard = ({ tokenId, metadata, mintedNft }) => {
  const { contract, account, c_address } = useContext(AppContext);
  const [ownerAccount, setOwnerAccount] = useState("");
  const [cansold, setCanSold] = useState(false);

  const getCanSold = async () => {
    try {
      const response = await contract.methods.sold(tokenId).call();
      setCanSold(response);
    } catch {}
  };

  const onClickMint = async () => {
    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: c_address,
            data: contract.methods.mintNft(tokenId).encodeABI(),
            gas: "100000",
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };
  const onClickBuy = async () => {
    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: c_address,
            data: contract.methods.buyNFT(tokenId, account, 10).encodeABI(),
            gas: "100000",
          },
        ],
      });
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: c_address,
            data: contract.methods.setTokenSold(tokenId, false).encodeABI(),
            gas: "100000",
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getOwnerOf = async () => {
    try {
      const response = await contract.methods.ownerOf(tokenId).call();
      setOwnerAccount(response);
    } catch {}
  };

  const onClickSold = async () => {
    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: c_address,
            data: contract.methods.setTokenSold(tokenId, true).encodeABI(),
            gas: "100000",
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };
  const onClickNoSold = async () => {
    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: c_address,
            data: contract.methods.setTokenSold(tokenId, false).encodeABI(),
            gas: "100000",
            ok: true,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOwnerOf();
    getCanSold();
  });
  useEffect(() => {}, [account]);
  console.log("계정어카운트", account, tokenId);
  console.log("오너어카운트", ownerAccount, tokenId);
  return (
    <div className="">
      <div className="relative">
        {!ownerAccount && (
          <div className="absolute bg-gray-900 bg-opacity-80 text-white w-40 h-40 flex justify-center items-center">
            <button
              className="hover:bg-white hover:text-black px-3 py-1 rounded-md hover:bg-opacity-70  "
              onClick={onClickMint}
            >
              Go Minted
            </button>
          </div>
        )}
        <img
          className=" w-40 h-40 rounded-[10px] "
          src={`${metadata.image}`}
          alt=""
        />
        {account && ownerAccount.toLowerCase() === account.toLowerCase() ? (
          <div className="bg-white w-8 h-4 absolute top-2 right-2 flex justify-center items-center px-2 py-3 rounded-md font-bold">
            <button>MY</button>
          </div>
        ) : (
          <div></div>
        )}
        <Link to={`/${tokenId}`}>
          {!ownerAccount ? (
            <button
              disabled={parseInt(mintedNft) < tokenId}
              className="absolute bottom-0 right-24 m-1 bg-gray-900 bg-opacity-80 px-3 py-1 rounded-[10px] text-sm text-gray-500"
            >
              No Detail
            </button>
          ) : (
            <button
              disabled={!ownerAccount}
              className="absolute bottom-0 right-24 m-1 bg-white px-3 py-1 rounded-[10px] text-sm"
            >
              Detail
            </button>
          )}
        </Link>
      </div>
      <div className="text-white">{tokenId}</div>
      <div className="text-white">{metadata.name}</div>
      <div className="text-white relative">
        <div>price: 13 SH</div>
        {account && ownerAccount.toLowerCase() === account.toLowerCase() ? (
          cansold ? (
            <div
              className={`bg-blue-500 w-8 h-4 absolute bottom-0 right-0 flex justify-center items-center px-8 py-3 rounded-md font-bold text-white `}
            >
              <button onClick={onClickNoSold}>no sold</button>
            </div>
          ) : (
            <div
              className={`bg-red-500 w-8 h-4 absolute bottom-0 right-0 flex justify-center items-center px-8 py-3 rounded-md font-bold text-white `}
            >
              <button onClick={onClickSold}>sold</button>
            </div>
          )
        ) : cansold ? (
          <div
            className={`bg-blue-500 w-8 h-4 absolute bottom-0 right-0 flex justify-center items-center px-8 py-3 rounded-md font-bold text-white `}
          >
            <button onClick={onClickBuy}>buy</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default NftCard;

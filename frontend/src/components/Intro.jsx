import { useContext } from "react";
import { AppContext } from "../App";

const Intro = ({ totalNft, mintedNft, myNft, token }) => {
  const ranNum = Math.floor(Math.random() * 27 + 1);
  const imgSrc = `${process.env.REACT_APP_IMAGE_URL}/${ranNum}.png`;

  const { account, tokenContract, token_c_address } = useContext(AppContext);

  const onClickTokenMint = async () => {
    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: token_c_address,
            data: tokenContract.methods.MintToken(100).encodeABI(),
            gas: "100000",
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };
  // console.log("인트로 총nft", totalNft);
  // console.log("인트로 민트nft", mintedNft);
  // console.log("인트로 나의nft", myNft);
  console.log("인트로 나의토큰", token);
  return (
    <div className="max-w-screen-xl mx-auto bg-gray-900 flex  justify-center items-center ">
      <div className="mr-16">
        <img
          src={imgSrc}
          alt=""
          className="w-[200px] h-[200px] rounded-full border-[5px]  border-gray-300"
        />
      </div>
      <div className="flex flex-col justify-center items-center m-2 text-white">
        <div className="font-bold">총 NFT</div>
        <div>{Number(totalNft)}</div>
      </div>
      <div className="flex flex-col justify-center items-center m-2 text-white">
        <div className="font-bold">발행된 NFT</div>
        <div>{Number(mintedNft)}</div>
      </div>
      <div className="flex flex-col justify-center items-center m-2 text-white">
        <div className="font-bold">나의 NFT</div>
        <div>{Number(myNft)}</div>
      </div>
      <div className="flex flex-col justify-center items-center ml-8">
        <div className="flex flex-col justify-center items-center m-2 px-4 py-2 rounded-md bg-purple-500 text-white ">
          <button onClick={onClickTokenMint}> SH코인 무료 충전하기</button>
        </div>
        <div className="bg-white w-48 h-8 px-4 flex justify-between  items-center rounded-md">
          <div>잔액:</div> <div>{Number(token)} SH</div>
        </div>
      </div>
    </div>
  );
};
export default Intro;

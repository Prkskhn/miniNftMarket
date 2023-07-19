import axios from "axios";
import { useEffect, useState } from "react";
import NftCard from "./NftCard";

const Nft = ({ totalNft, mintedNft }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [nft, setNft] = useState();

  const getNft = async (p) => {
    try {
      let nftArray = [];
      setNft();
      for (let i = 0; i < 10; i++) {
        const tokenId = i + 1 + (p - 1) * 10;

        if (tokenId <= parseInt(totalNft)) {
          let response = await axios.get(
            `${process.env.REACT_APP_JSON_URL}/${tokenId}.json`
          );
          nftArray.push({ tokenId, metadata: response.data });
        }

        // console.log(nftArray);
      }
      // console.log(nftArray);
      setNft(nftArray);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickPage = (p) => () => {
    setSelectedPage(p);
    getNft(p);
  };

  const pageComp = () => {
    const page = parseInt((parseInt(totalNft) - 1) / 10) + 1;
    let pages = [];
    for (let i = 0; i < page; i++) {
      pages.push(
        <button
          key={i}
          className={`m-2 ${
            i + 1 === selectedPage ? "bg-gray-500" : "bg-gray-900"
          } text-white font-bold px-2 py-1 rounded`}
          onClick={onClickPage(i + 1)}
        >
          {i + 1}
        </button>
      );
    }

    return pages;
  };

  useEffect(() => {
    getNft(1);
  }, [totalNft]);

  useEffect(() => {
    console.log(nft);
  }, [nft]);

  return (
    <>
      <div className="bg-gray-900 flex justify-center items-center py-10 mt-10 border-t-4 border-gray-100 border-opacity-30">
        {pageComp()}
      </div>

      <div className="pb-10 grid grid-cols-3 xl:grid-cols-5 justify-items-center gap-8">
        {nft ? (
          nft.map((v, i) => {
            return (
              <NftCard
                key={i}
                mintedNft={mintedNft}
                tokenId={v.tokenId}
                metadata={v.metadata}
              />
            );
          })
        ) : (
          <div>로딩중입니다</div>
        )}
      </div>
    </>
  );
};
export default Nft;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { tokenId } = useParams();
  const [metadata, setMetadata] = useState();

  const getNft = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_JSON_URL}/${tokenId}.json`
      );

      setMetadata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNft();
  }, []);

  useEffect(() => console.log(metadata), [metadata]);
  return (
    <div className=" min-h-screen flex justify-center items-center text-white">
      {metadata ? (
        <>
          <img src={`${metadata.image}`} alt="" />
          <div className="ml-8">
            <div className="mb-4 font-bold text-2xl">{`${metadata.name}`}</div>
            <div>
              {metadata.attributes.map((v, i) => {
                return (
                  <div key={i} className="my-2">
                    <span className="font-semibold">{v.trait_type}</span>
                    <span> : {v.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        "로딩중입니다"
      )}
    </div>
  );
};
export default Detail;

import { AiFillCustomerService, AiFillGitlab } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = ({ account, setAccount }) => {
  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-900 py-4">
      <div className="max-w-screen-xl mx-auto  flex justify-between items-center ">
        <Link to={"/"}>
          <div className="flex justify-center items-center">
            <AiFillCustomerService size={30} className="text-white mr-2" />
            <div className="font-bold text-white text-[22px]">Yalralloo</div>
          </div>
        </Link>
        {account ? (
          <div
            onClick={onClickAccount}
            className="bg-white rounded-full flex justify-center' items-center px-4 py-2 text-gray-900 font-bold"
          >
            {account.substring(0, 4)}...{account.substring(account.length - 4)}
          </div>
        ) : (
          <div
            onClick={onClickAccount}
            className="bg-white rounded-full flex justify-center' items-center px-3 py-1 hover:bg-gray-500"
          >
            <div className="bg-gray-900 w-8 h-8 rounded-full flex justify-center items-center">
              <AiFillGitlab size={20} className="text-white" />
            </div>
            <div className="text-gray-900 ml-2 font-bold ">Connect</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SHToken is ERC20("SH_COIN", "SH") {
    constructor(uint totalSupply) {
        _mint(msg.sender, totalSupply);
    }

    function MintToken(uint _amount) public {
        _mint(msg.sender, _amount);
    }

    function decimals() public pure override returns(uint8) {
        return 0;
    }

    function getBalance(address _account)external view returns(uint){
        return balanceOf(_account);
    }
    function buyNftWithErc20(address from,address to, uint amount)external {
        _transfer(from, to, amount);
    }

    receive() external payable{}
}
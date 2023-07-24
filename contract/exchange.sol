// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./mintpage721.sol";
import "./mintpage20.sol";

contract Exchange{
    MintNft public mintNft;
    SHToken public  shToken;
    address public mintNftAddress;
    constructor(address _MintNftAddress,address payable  _SHTokenAddress){
        mintNft=MintNft(_MintNftAddress);
        shToken=SHToken(_SHTokenAddress);
        mintNftAddress=_MintNftAddress;
    }


    function buyNft(uint _tokenId, uint _coinAmount)public {
        address tokenOwner = mintNft.ownerOf(_tokenId);
        mintNft.safeTransferFrom(tokenOwner, msg.sender, _tokenId);
        shToken.buyNftWithErc20(msg.sender, tokenOwner, _coinAmount);
    }
}
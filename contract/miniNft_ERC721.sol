// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./miniToken_ERC20.sol";

contract MintNft is ERC721Enumerable {
    string public metadataUri;
    uint public totalNft;
    uint public mintedNft;
    mapping(uint=>bool) public sold;
    SHToken shToken;

    constructor(
        string memory _name, 
        string memory _symbol, 
        string memory _metadataUri, 
        uint _totalNft,
        address _tokenContract

    ) ERC721(_name, _symbol) {
        metadataUri = _metadataUri;
        totalNft = _totalNft;
        shToken=SHToken(payable (_tokenContract));
    }




    function mintNft(uint _tokenId) public {
        require(totalNft > mintedNft, "No more mint.");

        mintedNft++;
        sold[_tokenId]=false;
        _mint(msg.sender, _tokenId);
    }

    function setTokenSold(uint _tokenId, bool _bool)public {
        sold[_tokenId]=_bool;
    }

    

    function tokenURI(uint _tokenId) public override view returns(string memory) {
        return string(abi.encodePacked(metadataUri, '/', Strings.toString(_tokenId), '.json'));
    }

    function burnNFT(uint _tokenId) public {
        require(msg.sender == ownerOf(_tokenId), "Caller is not token owner.");

        _burn(_tokenId);
    }


    function buyNFT(uint _tokenId,address _to, uint _coinAmount) public {
        //shToken.transfer( _to, _coinAmount);
        shToken.buyNftWithErc20(msg.sender, ownerOf(_tokenId), _coinAmount);
        // Execute transferFrom
        _transfer(ownerOf(_tokenId),_to, _tokenId);
    }
    
    
    function getBalance()public view returns(uint){
        return shToken.balanceOf(msg.sender);
    }

    

}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "./AbstractAnimalHouseEntity.sol";
import "./ERC1155.sol";

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;
        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        return c;
    }
}

contract AnimalHouse is ERC1155, AbstractAnimalHouseEntity {
  using SafeMath for uint256;
  // Token name
  string private _name;

  // Token symbol
  string private _symbol;
  uint256 private _contentId;

  /*NFT SECTION */

  /* NFT data type enum */
  enum NftDataType {TEXT, IMAGE, AUDIO, VIDEO}

  /* NFT content struct */
  struct NftContent {
    address owner;
    NftDataType dataType;
    uint256 timestamp;
    uint256 value;
    string ipfsAddress;
  }

  mapping(uint256 => NftContent) private _idToNftContent;
  mapping(string => bool) private _ipfsAddressUsed;

  event NewNft(address creator, uint256 contentId, uint256 timestamp, NftDataType dataType, string ipfsAddress);

  modifier validContentId(uint256 id){  
    require(id != 0 && id <= _contentId, "AnimalHouse : Provided id is not available.");
    _;
  }

  constructor(string memory name_, string memory symbol_, address adminAddr) 
    ERC1155("")
  {
    _name = name_;
    _symbol = symbol_;
    _admin = adminAddr;
    _contentId = 0;
  }

  /* return name */
  function name() public view returns (string memory) {
    return _name;
  }
  
  /* return symbol */
  function symbol() public view returns (string memory) {
      return _symbol;
  }

  /* NFTS (public/ external section) */
  /*
    @param
    id
    ipfsAddress
    dataType
    amount
  */

  function createContent(string memory ipfsAddress, NftDataType dataType, uint amount) external {
    require(!_ipfsAddressUsed[ipfsAddress], "AnimalHouse: IPFS Address has already been used by this collection.");

    /* mint the NFT */
    NftContent memory content = NftContent({
                                    owner: address(this),
                                    dataType: dataType,
                                    timestamp: block.timestamp,
                                    value: 0,
                                    ipfsAddress: ipfsAddress
                                });
    
    _contentId = _contentId + 1;
    _mint(address(this), _contentId, amount, "");
    _idToNftContent[_contentId] = content;
    _ipfsAddressUsed[ipfsAddress] = true;

    emit NewNft(address(this), _contentId, block.timestamp, dataType, ipfsAddress);
  }

  /* Amount of content NFTs. The value is also the id of the last content NFT minted. */
  function contentCount() external view returns (uint256){
    return _contentId;
  }
  
  /* Get content data of the provided id */
  function getContent(uint256 id) external view validContentId(id) returns (address, NftDataType, uint256, uint256, string memory) {
      NftContent memory content = _idToNftContent[id];
    address owner = content.owner;
    return (owner, content.dataType, content.timestamp, content.value, content.ipfsAddress);
  }

  /* Claim NFT by id */
  function claim(uint id) public payable validContentId(id) {
    require(balanceOf(_msgSender(), id) < 1, "You already had claimed!");
    require(balanceOf(address(this), id) > 0, "Out of NFT stock!");
    _safeTransferFrom(address(this), _msgSender(), id, 1, "");
  }
  
  function receive() external payable {
        
  }

  /* Transfer NFT by id */  
  function buyNFT(uint256 contentId, address payable ownerAddr, address payable to, uint256 price, uint256 amount) external{
    _safeTransferFrom(address(this), to, contentId, amount, "");
    uint256 amounts = price * amount;
   
    uint256 ethValue = address(this).balance;

    uint256 adminFee = ethValue.mul(5).div(100); // 5%
    uint256 ownerValue = ethValue - adminFee;

    //send money to admin from address(this)
    ownerAddr.transfer(adminFee);

    address payable NFTOwner = payable(_admin);
    NFTOwner.transfer(ownerValue);
  }
}
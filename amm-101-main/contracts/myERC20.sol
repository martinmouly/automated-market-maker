// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract myERC20 is ERC20 {
  constructor(string memory name, string memory symbol,uint256 totalSupply) public ERC20(name, symbol) {
		_mint(msg.sender,totalSupply);
    approve(msg.sender,totalSupply);
    }

  function getSomeTokens(address receiver,uint freeTokens) public payable{
    _mint(receiver,freeTokens*(10**18));
  }


}

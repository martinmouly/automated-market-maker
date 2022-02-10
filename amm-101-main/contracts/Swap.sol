pragma solidity >=0.6.2 <0.9.0;
import "./IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./myERC20.sol";

contract Swap {
    IUniswapV2Router02 public uniRouter02;
    myERC20 public myToken;
    address[] public addressArray;
    address public myTokenAdd;
    address public Weth;
    address public dummyToken;
    uint256 public deadline;

    constructor(IUniswapV2Router02 _uniRouter02) public payable  {
            uniRouter02=_uniRouter02;
            //myToken=_myToken;
            myTokenAdd=0x9E9BA9C234F6B4f8B1852E0dFF1Dc71abA37d741;
            Weth=0xc778417E063141139Fce010982780140Aa0cD5Ab;
            dummyToken=0xbc3b69d1abD5A39f55a9Ba50C7a2aDd933952123; 
            //deadline=9999999999999999999999999999;
            
    }
    fallback () external payable 
	{}

	receive () external payable 
	{}

    function addLiquidity() external {
        uniRouter02.addLiquidityETH(myTokenAdd, 1000*(10**18), 1, 1, address(this), 9999999999999999999999999999);
    }

	function withdrawLiquidity() external{
        uniRouter02.removeLiquidityETH(myTokenAdd, 10*(10**18),0, 0, address(this),deadline);
    }

	function swapYourTokenForDummyToken() external{
        addressArray.push(myTokenAdd);
        addressArray.push(dummyToken);
        uniRouter02.swapExactTokensForTokens(10*(10**18),0,addressArray,address(this),deadline);

    }

	function swapYourTokenForEth() external{
        addressArray.push(myTokenAdd);
        addressArray.push(Weth);
        uniRouter02.swapExactTokensForETH(100*(10**18), 0, addressArray,address(this),deadline);
    }

    
}
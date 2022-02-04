pragma solidity >=0.6.2 <0.9.0;
import '@uniswap/v2-periphery/contracts/UniswapV2Router02.sol';

contract Swap  {
    IUniswapV2Router02 refContract;
    constructor(IUniswapV2Router02 _UniswapV2Router02) public  {
		refContract=_UniswapV2Router02;
    }

    function addLiquidity() external{

    }

	function withdrawLiquidity() external{

    }

	function swapYourTokenForDummyToken() external{

    }

	function swapYourTokenForEth() external{
        refContract.swapTokensForExactETH(1, 10, ["0x01530ab334db53887d84dfb4ef1737bc6d9f3e05",WETH()],address(this), 1000);
    }
}
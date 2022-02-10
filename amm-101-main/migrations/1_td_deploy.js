const Str = require('@supercharge/strings')
//const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20 = artifacts.require("DummyToken.sol"); 
var evaluator = artifacts.require("Evaluator.sol");
var token = artifacts.require("myERC20.sol");
var swap = artifacts.require("Swap.sol");
var uniswapV2Router02 = artifacts.require("IUniswapV2Router02.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        //await deployTDToken(deployer, network, accounts); 
        //await deployEvaluator(deployer, network, accounts); 
		console.log("let's goooo")
		await deployMyToken(deployer,network,accounts);
		await deploySwap(deployer, network, accounts)
		await exercices(deployer,network,accounts)
    });
};
async function deployMyToken(deployer,network,accounts){
	myToken = await token.at("0x9E9BA9C234F6B4f8B1852E0dFF1Dc71abA37d741")
	//myToken = await token.new("AAATOKEN","AAA",web3.utils.toBN("515455145000000000000000000"))
	console.log(myToken.address)

}
async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-AMM-101","TD-AMM-101",web3.utils.toBN("20000000000000000000000000000"))
	dummyToken = await ERC20.new("dummyToken", "DTK", web3.utils.toBN("2000000000000000000000000000000"))
	uniswapV2FactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"
	wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab"
}

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.at("0x89a2Faa44066e94CE6B6D82927b0bbbb8709eEd7")
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
	randomSupplies = []
	randomTickers = []
	for (i = 0; i < 20; i++)
		{
		randomSupplies.push(Math.floor(Math.random()*1000000000))
		randomTickers.push(Str.random(5))
		// randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
		// randomTickers.push(Str.random(5))
		}

	console.log(randomTickers)
	console.log(randomSupplies)
	// console.log(web3.utils)
	// console.log(type(Str.random(5)0)
	await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("dummyToken " + dummyToken.address)
	console.log("Evaluator " + Evaluator.address)
}
async function deploySwap(deployer, network, accounts){
	//mySwap=await swap.new("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
	mySwap=await swap.at("0xd6fcbF83ea0594aeA5850Ba078c6FFd9Ac524eb7")
	console.log(mySwap.address)
}

async function exercices(deployer, network, accounts){
	//await Evaluator.submitErc20(myToken.address)
	//await Evaluator.ex6b_testErc20TickerAndSupply()
	//await Evaluator.submitExercice(mySwap.address)
	//await myToken.approveSwap(mySwap.address,"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
	await myToken.getSomeTokens(mySwap.address,1000000)
	await mySwap.addLiquidity()
	//await Evaluator.ex8_contractCanSwapVsEth()
	//await Evaluator.ex9_contractCanSwapVsDummyToken()
	//await Evaluator.ex10_contractCanProvideLiquidity()
	//await Evaluator.ex11_contractCanWithdrawLiquidity()
}





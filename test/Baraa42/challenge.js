const { expect } = require('chai');
const { waffle} = require("hardhat");
 

describe("Challenge Baraa42", function () {
    let deployer, attacker; 

    before(async function() {

        [deployer, attacker] = await hre.ethers.getSigners()

        //deploy casino contract 
        const casinoFactory = await hre.ethers.getContractFactory("Casino", deployer)

        this.casino = await casinoFactory.deploy()


    })

    it("exploit", async function() {
        console.log(this.casino.address)
    })

    after( async function() {
        const provider = waffle.provider;
        const casinoAddress = this.casino.address; 
        //TODO UNDERSTAND HOW TO USE OR CONDITION IN CHAI
        expect(await provider.getBalance(casinoAddress)).to.eq(1000)
        expect(true).to.satisfy(() => {
            const gameOn = this.casino.gameOn();
            if (gameOn && await provider.getBalance(casinoAddress)) return true
            else return false;
        });
    })

})
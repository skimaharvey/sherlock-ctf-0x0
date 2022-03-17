const { ethers, upgrades, waffle } = require('hardhat');
const { expect } = require('chai');

describe('[Challenge] BowTiedPickle', function () {
    let deployer, attacker; 

    before(async function () {
        [deployer, attacker] = await ethers.getSigners();

         
        const PadlockFactory = await ethers.getContractFactory("Padlock", deployer);
        const password = "\u9027616" //unicode encoded
        //deploy contract
        this.padlock = await PadlockFactory.deploy(password)
    })

    it("Exploit", async function() {
        await this.padlock.pick1("\u9027616")

        await this.padlock.pick2({value: 33})
       
        await this.padlock.pick3('0x69420000000000000000000000000000')

        await this.padlock.open()

    })
    
    after( async function() {
        expect(await this.padlock.opened()).to.eq(true)
    })
    //deploy contract 
    
})
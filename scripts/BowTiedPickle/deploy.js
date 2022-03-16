async function main() {
    
    const PadlockFactory = await ethers.getContractFactory("Padlock");

    const password = "\u9027616"
    const padlock = await PadlockFactory.deploy(password);
    

    await padlock.deployed();
  
    console.log("Padlock deployed to:", padlock.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
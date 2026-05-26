const { ethers } = require("hardhat");

async function main() {


  const address = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
  const CHIKA = await ethers.getContractFactory('ChikaToken');
  const chika = CHIKA.attach(address);

  const value = await chika.totalSupply();
  console.log('CHIKA value is', value.toString());

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
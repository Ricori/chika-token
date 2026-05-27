const { ethers } = require("hardhat");

async function main() {

  const address = '0x06a8290Bbbe82953150551d8697cB87c1A6a2b3F';
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
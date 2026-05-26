const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ChikaToken", function () {
  let token, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const ChikaToken = await ethers.getContractFactory("ChikaToken");
    token = await ChikaToken.deploy(owner.address);
  });

  it("should have correct name and symbol", async function () {
    expect(await token.name()).to.equal("CHIKA");
    expect(await token.symbol()).to.equal("CHIKA");
  });

  it("should mint 1,000,000 CHIKA to deployer", async function () {
    const expected = ethers.parseEther("1000000");
    expect(await token.totalSupply()).to.equal(expected);
    expect(await token.balanceOf(owner.address)).to.equal(expected);
  });

  it("owner can mint additional tokens", async function () {
    const amount = ethers.parseEther("500");
    await token.mint(addr1.address, amount);
    expect(await token.balanceOf(addr1.address)).to.equal(amount);
  });

  it("non-owner cannot mint", async function () {
    await expect(
      token.connect(addr1).mint(addr1.address, ethers.parseEther("1"))
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });

  it("token holder can burn their own tokens", async function () {
    const burnAmount = ethers.parseEther("1000");
    const initialSupply = await token.totalSupply();
    await token.burn(burnAmount);
    expect(await token.totalSupply()).to.equal(initialSupply - burnAmount);
  });

  it("can transfer tokens", async function () {
    const amount = ethers.parseEther("100");
    await token.transfer(addr1.address, amount);
    expect(await token.balanceOf(addr1.address)).to.equal(amount);
  });
});

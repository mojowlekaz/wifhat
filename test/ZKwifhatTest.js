// test/ZkWifhat.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZkWifhat", function () {
  let zkWifhat;
  let owner;
  let user1;
  let user2;

  beforeEach(async () => {
    const ZkWifhat = await ethers.getContractFactory("ZkWifhat");
    [owner, user1, user2] = await ethers.getSigners();

    zkWifhat = await ZkWifhat.deploy(owner.address);
    await zkWifhat.deployed();
  });

  it("should allow referring and claiming referral rewards", async () => {
    // Referring user1
    await zkWifhat.connect(user1).Refer(owner.address);

    // Claiming referral rewards for user1
    await expect(zkWifhat.connect(user1).ClaimReferalReward())
      .to.emit(zkWifhat, "Withdrawn")
      .withArgs(user1.address, referamount);

    // Ensure referral rewards are set to 0 after claiming
    expect(await zkWifhat.userProfiles(user1.address)).to.have.property(
      "Refferalrewards",
      0
    );
  });

  it("should allow claiming airdrop", async () => {
    // Claiming airdrop for user1
    await expect(zkWifhat.connect(user1).claimAirdrop())
      .to.emit(zkWifhat, "Withdrawn")
      .withArgs(user1.address, airdropamount);

    // Ensure userclaimStatus is set to true after claiming airdrop
    expect(await zkWifhat.userclaimStatus(user1.address)).to.equal(true);
  });

  it("should allow the owner to withdraw funds", async () => {
    // Send some Ether to the contract
    await owner.sendTransaction({
      to: zkWifhat.address,
      value: ethers.utils.parseEther("1.0"),
    });

    // Get initial balance
    const initialBalance = await ethers.provider.getBalance(owner.address);

    // Withdraw all funds
    await expect(zkWifhat.connect(owner).withdrawAll())
      .to.emit(zkWifhat, "Withdrawn")
      .withArgs(owner.address, ethers.utils.parseEther("1.0"));

    // Check if the owner's balance has increased
    const finalBalance = await ethers.provider.getBalance(owner.address);
    expect(finalBalance).to.be.gt(initialBalance);
  });

  // Add more test cases as needed

  // ...
});

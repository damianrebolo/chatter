import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Chatter", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployChatter() {
    // Contracts are deployed using the first signer/account by default
    const [_] = await hre.ethers.getSigners();

    const Chatter = await hre.ethers.getContractFactory("Chatter");
    const chatter = await Chatter.deploy();

    return { chatter, _ };
  }

  it("Should emit an event on chat", async function () {
    const { chatter, _ } = await loadFixture(deployChatter);

    const message = "Hello, world!";
    await expect(chatter.chat(message))
      .to.emit(chatter, "NewMessage")
      .withArgs(_.address, message);
  });
});

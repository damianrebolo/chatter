import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ChatterModule = buildModule("ChatterModule", (m) => {
  const chatter = m.contract("Chatter", [], {});

  return { chatter };
});

export default ChatterModule;

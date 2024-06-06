export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "NewMessage",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "chat",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

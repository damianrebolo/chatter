"use client";

import { useEffect, useState } from "react";
import { useWriteContract, useWatchContractEvent, useAccount } from "wagmi";
import { Log } from "viem";
import { abi } from "@/contracts";
import JazziconImage from "./components/Icon";

const chatterAddress = "0xfe91fB5c18689B8a51d3659708E0d3c106FD124C";
const fromBlock = BigInt(6055894);

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Log[]>([]);
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();

  useWatchContractEvent({
    address: chatterAddress,
    abi,
    eventName: "NewMessage",
    fromBlock: fromBlock,
    batch: false,
    syncConnectedChain: true,
    onLogs: (logs) => {
      setMessages(logs);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  const onMessageSend = async () => {
    writeContractAsync({
      abi: abi,
      address: chatterAddress,
      functionName: "chat",
      args: [message],
    }).then((tx) => {
      console.log("Transaction", tx);
      setMessage("");
    });
  };

  return (
    <main className="flex min-h-screen max-w-screen-sm m-auto flex-col items-center justify-between p-2">
      <w3m-button />
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col py-5 px-2 w-full h-full overflow-y-auto scrollbar-thumb-blue scrollbar-track-blue scrollbar-w-2 scrollbar-track-blue-lighter scrolling-touch">
          {messages.map((log, i) => {
            return (
              <div
                key={i}
                className={[
                  "flex flex-row items-center gap-2 py-1",
                  address === log.args.user ? "justify-end" : "",
                ].join(" ")}
              >
                <JazziconImage
                  address={log.args.user}
                  className={[
                    "w-6 h-6 rounded-full",
                    address == log.args.user ? "order-2" : "",
                  ].join(" ")}
                />
                <div
                  className={[
                    "px-4 py-2 rounded-lg",
                    log.args.user == address
                      ? "rounded-br-none bg-blue-600 text-white"
                      : "rounded-bl-none bg-gray-300 text-gray-700",
                  ].join(" ")}
                >
                  {log.args.message}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-between items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi There..."
            className="w-full mr-2 border rounded-md border-gray-300 p-2 text-sm"
          />
          <button type="button" onClick={onMessageSend}>
            ✉️
          </button>
        </div>
      </div>
    </main>
  );
}

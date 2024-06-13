import { useState } from "react";

export default function SendMessage() {
  const [message, setMessage] = useState<string>("");

  const onMessageSend = async () => {
    // writeContractAsync({
    //   abi: abi,
    //   address: chatterAddress,
    //   functionName: "chat",
    //   args: [message],
    // }).then((tx) => {
    //   console.log("Transaction", tx);
    //   setMessage("");
    // });
  };
  return (
    <div className="flex flex-col w-full h-full">
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
  );
}

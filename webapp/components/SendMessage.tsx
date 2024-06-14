import { useState } from 'react'

export default function SendMessage() {
  const [message, setMessage] = useState<string>('')

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
  }
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Hi There..."
          className="mr-2 w-full rounded-md border border-gray-300 p-2 text-sm"
        />
        <button type="button" onClick={onMessageSend}>
          ✉️
        </button>
      </div>
    </div>
  )
}

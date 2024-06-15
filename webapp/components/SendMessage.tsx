import { accountClientOptions, accountType, gasManagerConfig } from '@/config/alchemy';
import { useSmartAccountClient, useSendUserOperation } from '@alchemy/aa-alchemy/react';
import { MouseEvent, useState } from 'react';
import { Hex, encodeFunctionData } from 'viem';
import { OpStatus } from './OpStatus';
import { abi } from '@/contracts';

export default function SendMessage() {
  const [message, setMessage] = useState<string>('');

  // [!region sending-user-op]
  // use config values to initialize our smart account client
  const { client } = useSmartAccountClient({
    type: accountType,
    gasManagerConfig,
    opts: accountClientOptions
  });

  // provide the useSendUserOperation with a client to send a UO
  // this hook provides us with a status, error, and a result
  const {
    sendUserOperation,
    sendUserOperationResult,
    isSendingUserOperation,
    error: isSendUserOperationError
  } = useSendUserOperation({ client, waitForTxn: true });

  const send = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    const uoCallData = encodeFunctionData({
      abi: abi,
      functionName: 'chat',
      args: [message]
    });

    // send the user operation
    sendUserOperation({
      uo: { target: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Hex, data: uoCallData as Hex }
    });
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Hi There..."
          className="mr-2 w-full rounded-md border border-gray-300 p-2 text-sm"
        />
        <button type="button" onClick={send}>
          ✉️
        </button>
      </div>
      <div className="">
        <OpStatus
          sendUserOperationResult={sendUserOperationResult}
          isSendingUserOperation={isSendingUserOperation}
          isSendUserOperationError={isSendUserOperationError}
        />
      </div>
    </div>
  );
}

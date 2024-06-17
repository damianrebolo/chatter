import { Log, parseAbiItem } from 'viem';
import JazziconImage from './Icon';
import { useEffect, useState } from 'react';
import { useWatchContractEvent } from 'wagmi';
import { abi, chatterAddress, fromBlock } from '@/contracts/chatter';
import { publicClient } from '@/config/viem';
import { accountType } from '@/config/alchemy';
import { useSmartAccountClient } from '@alchemy/aa-alchemy/react';
import { GetEventArgs } from 'viem';

type EventArgs = GetEventArgs<typeof abi, 'NewMessage', { IndexedOnly: false }>;

interface ContractLog extends Log {
  args: EventArgs;
}
export default function MessageHistory() {
  const [messages, setMessages] = useState<ContractLog[]>([]);
  const { address } = useSmartAccountClient({
    type: accountType
  });
  useEffect(() => {
    async function getLogs() {
      const logs = await publicClient.getLogs({
        address: chatterAddress,
        event: parseAbiItem('event NewMessage(address indexed user, string message)'),
        fromBlock: fromBlock,
        strict: true
      });
      return logs;
    }
    getLogs().then((logData: ContractLog[]) => {
      setMessages(logData.reverse() as ContractLog[]);
    });
  }, []);

  useWatchContractEvent({
    address: chatterAddress,
    abi,
    eventName: 'NewMessage',
    batch: false,
    syncConnectedChain: true,
    strict: true,
    onLogs: (logs: Log[]) => {
      if (logs.length > 0) {
        setMessages(preLogs => preLogs.concat(preLogs, logs as ContractLog[]));
      }
    },
    onError(error) {
      console.log('Error', error);
    }
  });

  return (
    <div className="mx-2 mb-2 mt-8 flex h-full w-full flex-grow flex-col-reverse items-end overflow-y-auto">
      {messages.map((log, i) => {
        const { args } = log;
        return (
          <div
            key={i}
            className={['flex flex-row items-center gap-2 py-1', address === args?.user ? 'justify-end' : ''].join(' ')}
          >
            <JazziconImage
              address={args?.user!}
              className={['h-6 w-6 rounded-full', address == args.user ? 'order-2' : ''].join(' ')}
            />
            <div
              className={[
                'rounded-lg px-4 py-2',
                args?.user! == address
                  ? 'rounded-br-none bg-blue-600 text-white'
                  : 'rounded-bl-none bg-gray-300 text-gray-700'
              ].join(' ')}
            >
              {args?.message!}
            </div>
          </div>
        );
      })}
    </div>
  );
}

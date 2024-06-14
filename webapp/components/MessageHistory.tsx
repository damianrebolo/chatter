import { Log } from 'viem'
import JazziconImage from './Icon'
import { useState } from 'react'
import { useAccount, useWatchContractEvent } from 'wagmi'
import { abi } from '@/contracts'

const chatterAddress = '0xfe91fB5c18689B8a51d3659708E0d3c106FD124C'
// const fromBlock = BigInt(6055894);

export default function MessageHistory() {
  const [messages, setMessages] = useState<Log[]>([])
  const { address } = useAccount()

  useWatchContractEvent({
    address: chatterAddress,
    abi,
    eventName: 'NewMessage',
    // fromBlock: fromBlock,
    batch: false,
    syncConnectedChain: true,
    onLogs: logs => {
      setMessages(logs)
    },
    onError(error) {
      console.log('Error', error)
    }
  })

  return (
    <div className="scrollbar-thumb-blue scrollbar-track-blue scrollbar-w-2 scrollbar-track-blue-lighter scrolling-touch flex h-full w-full flex-col overflow-y-auto px-2 py-5">
      {messages.map((log, i) => {
        return (
          <div
            key={i}
            className={['flex flex-row items-center gap-2 py-1', address === log.args.user ? 'justify-end' : ''].join(
              ' '
            )}
          >
            <JazziconImage
              address={log.args.user}
              className={['h-6 w-6 rounded-full', address == log.args.user ? 'order-2' : ''].join(' ')}
            />
            <div
              className={[
                'rounded-lg px-4 py-2',
                log.args.user == address
                  ? 'rounded-br-none bg-blue-600 text-white'
                  : 'rounded-bl-none bg-gray-300 text-gray-700'
              ].join(' ')}
            >
              {log.args.message}
            </div>
          </div>
        )
      })}
    </div>
  )
}

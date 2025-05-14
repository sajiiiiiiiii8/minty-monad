import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const contract = '0x85dcc4acf953436be7c41986560d1bdb144a4bbe'

  const res = await fetch(`https://testnet-rpc.monad.xyz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_sendTransaction',
      params: [
        {
          from: '0x0000000000000000000000000000000000000000',
          to: contract,
          data: '0x1249c58b', // mint()
          gas: '0x30D40' // 200000
        },
      ],
    }),
  })

  const data = await res.json()

  return new Response(
    JSON.stringify({
      message: 'Mint transaction sent',
      tx: data.result,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

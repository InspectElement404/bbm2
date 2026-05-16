"use client "

import React , {useEffect, useState}from 'react'


type cName = {
  disabled: boolean
}

type MarketProps = {
  marketprops: string, 
  setMarketprops: React.Dispatch<React.SetStateAction<string>>,
  immobilize: cName
}

export default function MarketFilter({marketprops, setMarketprops, immobilize}: MarketProps) {

    const [result, setResult] = useState([]);
    const [mercado, setMercado] = useState("")
    

    async function fetchMarketData(region: string) {
        const dataresult = await fetch(`/api/filters/market?region=${region}`)
        const parsed = await dataresult.json()
        const formatted = parsed.message?.map((items: any) => items.market)
        return formatted
    }

    useEffect(()=> {
        fetchMarketData(marketprops).then((res) => setResult(res))
    }, [marketprops])

    useEffect(()=> {
      setMarketprops(mercado)
    }, [mercado])

  return (
    <div className="flex flex-col">
      <label htmlFor='set-market'>
        Select Market
      </label>
      <select id='set-market' value={mercado} onChange={(e) => setMercado(e.target.value)} {...cName}>
        <option value=""> -- </option>
        {result.map((item, index) => (
            <option value={item} key={index}> {item}</option>
        ))}
      </select>
    </div>
  )
}

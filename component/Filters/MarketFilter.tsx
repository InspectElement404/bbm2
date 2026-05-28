"use client "

import { Capitalism } from '@/services/helper';
import React , {useEffect, useState}from 'react'

type MarketProps = {
  marketprops: string, 
  setMarketprops: React.Dispatch<React.SetStateAction<string>>,
  disabled: boolean
  marketing: string

}

export default function MarketFilter({marketprops, setMarketprops, disabled, marketing} : MarketProps) {

    const [result, setResult] = useState([]);

    

    async function fetchMarketData(region: string) {
        const dataresult = await fetch(`/api/filters/market?region=${region}`)
        const parsed = await dataresult.json()
        const formatted = (parsed.success) ? parsed.message.map((items: any) => Capitalism(items.market)) : []
        return formatted
    }

    useEffect(()=> {
        fetchMarketData(marketprops).then((res) => setResult(res))
    }, [marketprops])



  return (
    <div className="flex flex-col">
      <label htmlFor='set-market'>
        Select Market
      </label>
      <select id='set-market' disabled={disabled} value={marketing} onChange={(e) => setMarketprops(e.target.value)} >
        <option value=""> -- </option>
        {result.map((item, index) => (
            <option value={item} key={index}> {item}</option>
        ))}
      </select>
    </div>
  )
}

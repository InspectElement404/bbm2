"use client"

import React, { useEffect, useState } from 'react'

function TypeFilter() {

    const [result, setResult] = useState([])
    const [selected, setSelected] = useState("")

    async function getTypes({region, market}: {region: string, market: string}) {

        const fetching = await fetch(`/api/filters/type?region=${region}&market=${market}`)
        const parsed = await fetching.json() 
        const formatted = parsed.message.map((item: any) => item.type)
        return formatted 
    }

    useEffect(()=> {
        getTypes({region: "R1", market: "Badoc public market"}).then((res) => setResult(res))
    }, [])

  return (
    <div className="flex flex-col">
      <label htmlFor='select-type'>Select Type</label>
      <select id='select-type' value={selected} onChange={(e)=> setSelected(e.target.value)}>
        <option value=""> --</option>
        {result.map((item, index) => (
            <option value={item} key={index}>{item}</option>
        ))}
      </select>
    </div>
  )
}

export default TypeFilter

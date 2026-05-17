"use client"

import { RegionState } from '@/datatype/typing';
import { Capitalism } from '@/services/helper';
import React, { useEffect, useState} from 'react'

type RegionProps = {
    regprops: string, 
    setRegprops: React.Dispatch<React.SetStateAction<string>>
}


function RegionFilter({regprops, setRegprops}: RegionProps) {
    const [region, setRegion] = useState([]);

    
    async function getMessage() {
        const data = await fetch(`/api/filters/region`)
        const parsed = await data.json() 
        const formatted = parsed.message
        const mapped = formatted.map((item: any) => Capitalism(item.region))
        return mapped
    }

    useEffect(() => {
        getMessage().then((items) => setRegion(items))
    }, [])
  return (
    <div className="flex flex-col">
      <label htmlFor="select-region">Select Region</label>
      <select id="select-region" value={regprops} onChange={(event) => setRegprops(event.target.value)}  >
        <option value="">--</option>
        {region.map((item, index) => (
            <option value={item} key={index}> {item}</option>
        ))}
      </select>
    </div>
  )
}

export default RegionFilter

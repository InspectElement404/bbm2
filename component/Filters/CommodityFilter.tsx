"use client"

import React, { useState, useEffect } from 'react'

function CommodityFilter() {

    const [commodity, setCommodity] = useState([]);
    const [selected, setSelected] = useState("");

    async function getCommsData(typing: string) {
        const fetched =  await fetch(`/api/filters/commodity?type=${typing}`)
        const jsonified = await fetched.json() 
        console.log(jsonified)
        return jsonified.data
    }

    useEffect(()=> {
        getCommsData('Fish').then((value) => setCommodity(value))
    }, [])
  return (
    <div className="flex flex-col">
        <label htmlFor="select-commodity">Select Commodity</label>
        <select id="select-commodity" value={selected} onChange={(event) => setSelected(event.target.value)}>
            <option value="">--</option>
            {commodity.map((items, index) => (
                <option value={items} key={index}>{items}</option>
            ))}
        </select>
      
    </div>
  )
}

export default CommodityFilter

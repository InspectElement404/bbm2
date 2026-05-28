"use client"

import React, { useState, useEffect } from 'react'


type TypeProps = {
    regprops: string,
    marketprops: string,
    typeprops: string,
    commprops: string,
    setComm: React.Dispatch<React.SetStateAction<string>>

}

function CommodityFilter({ regprops, marketprops, typeprops, commprops, setComm }: TypeProps

) {

    const [commodity, setCommodity] = useState([]);


    async function getCommsData({ region, market, type }: { region: string, market: string, type: string }) {
        // console.log(`Region: ${region} Market: ${market} Type: ${type}`)
        const fetched = await fetch(`/api/filters/commodity?type=${type}&region=${region}&market=${market}`)
        const jsonified = await fetched.json()
        const beautified = jsonified.success ? jsonified.message.map((i: any) => i.commodity) : []
        return beautified
    }

    useEffect(() => {
        getCommsData({
            region: regprops,
            market: marketprops,
            type: typeprops
        })
            .then((value) => setCommodity(value))
    }, [typeprops])
    return (
        <div className="flex flex-col">
            <label htmlFor="select-commodity">Select Commodity</label>
            <select id="select-commodity" value={commprops} onChange={(event) => setComm(event.target.value)}>
                <option value="">--</option>
                {commodity.map((items, index) => (
                    <option value={items} key={index}>{items}</option>
                ))}
            </select>

        </div>
    )
}

export default CommodityFilter

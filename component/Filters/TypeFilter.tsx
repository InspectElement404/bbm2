"use client"

import React, { useEffect, useState } from 'react'

type TypeProps = {
    regprops: string,
    marketprops: string,
    setTypeProps: React.Dispatch<React.SetStateAction<string>>,
    disabled: boolean,
    typeValue: string

}

function TypeFilter({ regprops, marketprops, setTypeProps, disabled, typeValue }: TypeProps) {

    const [result, setResult] = useState([])
    const [selected, setSelected] = useState("")


    async function getTypes({ region, market }: { region: string, market: string }) {
        //  console.log(`Region: ${region} \n Market: ${market}`)
        const fetching = await fetch(`/api/filters/type?region=${region}&market=${market}`)
        const parsed = await fetching.json()
        const formatted = parsed.success ? parsed.message.map((i: any) => i.type) : []
        return formatted
    }

    useEffect(() => {
        getTypes({ region: regprops, market: marketprops }).then((res) => setResult(res))
    }, [marketprops])

    return (
        <div className="flex flex-col">
            <label htmlFor='select-type'>Select Type</label>
            <select id='select-type' disabled={disabled} value={typeValue} onChange={(e) => setTypeProps(e.target.value)}>
                <option value=""> --</option>
                {result.map((item, index) => (
                    <option value={item} key={index}>{item}</option>
                ))}
            </select>
        </div>
    )
}

export default TypeFilter

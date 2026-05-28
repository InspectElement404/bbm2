"use client"

import React from 'react'
import MarketFilter from './Filters/MarketFilter'
import RegionFilter from './Filters/RegionFilter'
import CommodityFilter from './Filters/CommodityFilter'
import TypeFilter from './Filters/TypeFilter'
import { RegionHolder } from '@/datatype/typing'
import { useState, useEffect } from 'react'
import { ChildDefinition } from './All'


type MainProps = {
    datum: ChildDefinition
    setDatum: React.Dispatch<React.SetStateAction<ChildDefinition>>
}

function MainFilters({ datum, setDatum }: MainProps) {
    const [regData, setReg] = useState("")
    const [marketData, setMarketData] = useState("")
    const [typeData, setTypeData] = useState("");
    const [commData, setCommData] = useState("");

    const marketControl = regData ? false : true
    const typeControl = (regData && marketData) ? false : true
    // console.log(`Type Control: ${typeControl}`)



    useEffect(() => {
        setMarketData("");
        setTypeData("")
    }, [regData])

    useEffect(() => {
        setCommData("")
    }, [typeData])

    useEffect(() => {
        setCommData("")
        setTypeData("")
        setDatum({
            region: regData,
            market: marketData,
            type: typeData,
            commodity: commData
        })
    }, [marketData])


    return (

        <div className="flex">

            <div className="flex flex-col flex-1 ">
                <form method='POST'>
                    <RegionFilter regprops={regData} setRegprops={setReg} />
                    <MarketFilter marketprops={regData} setMarketprops={setMarketData} marketing={marketData} disabled={marketControl} />
                    <TypeFilter typeValue={typeData} regprops={regData} marketprops={marketData} setTypeProps={setTypeData} disabled={typeControl} />
                    <CommodityFilter regprops={regData} marketprops={marketData} typeprops={typeData} commprops={commData} setComm={setCommData} />
                    <button type='submit'> Submit Form </button>
                </form>
            </div>

            <div className='flex flex-col flex-5'>
                <p> Fetched Region:  {regData}</p>
                <p> Fetched Market: {marketData}</p>
                <p> Fetched Type: {typeData}</p>
                <p>Fetched Commodity: {commData}</p>
            </div>
        </div >


    )
}

export default MainFilters

"use client"

import React from 'react'
import MarketFilter from './Filters/MarketFilter'
import RegionFilter from './Filters/RegionFilter'
import CommodityFilter from './Filters/CommodityFilter'
import TypeFilter from './Filters/TypeFilter'
import { RegionHolder } from '@/datatype/typing'
import { useState, useEffect } from 'react'

function MainFilters() {
    const [regData, setReg] = useState("")
    const [marketData, setMarketData] = useState("")
    const [typeData, setTypeData] = useState("");
    const [commData, setCommData] = useState(""); 

    const marketControl = regData ? false:  true
    const typeControl = (regData && marketData) ? false : true
    console.log(`Type Control: ${typeControl}`)

    useEffect(()=> {
        setMarketData("");
        setTypeData("")
    }, [regData])

    useEffect(()=> {
        setCommData("")
    }, [typeData])

    useEffect(()=> {
        setCommData("")
        setTypeData("")
    }, [marketData])
   

  return (

    <div className="flex">
    <div className="flex flex-col flex-1 ">
      <RegionFilter regprops={regData} setRegprops={setReg}/>
     <MarketFilter marketprops={regData} setMarketprops={setMarketData} disabled={marketControl} /> 
     <TypeFilter typeValue={typeData} regprops={regData} marketprops = {marketData} setTypeProps = {setTypeData} disabled={typeControl}/>
     <CommodityFilter regprops={regData} marketprops={marketData} typeprops={typeData} commprops={commData} setComm = {setCommData} />

     
    
    </div>
    <div className='flex flex-col flex-5'>
        <p> Fetched Region:  {regData}</p>
        <p> Fetched Market: {marketData}</p>
        <p> Fetched Type: {typeData}</p>
        <p>Fetched Commodity: {commData}</p>
    </div>
    </div>

    
  )
}

export default MainFilters

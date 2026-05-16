"use client"

import React from 'react'
import MarketFilter from './Filters/MarketFilter'
import RegionFilter from './Filters/RegionFilter'
import CommodityFilter from './Filters/CommodityFilter'
import TypeFilter from './Filters/TypeFilter'
import { RegionHolder } from '@/datatype/typing'
import { useState } from 'react'

function MainFilters() {
    const [regData, setReg] = useState("")
    const [marketData, setMarketData] = useState("")

   

  return (

    <div className="flex">
    <div className="flex flex-col flex-1 ">
      <RegionFilter regprops={regData} setRegprops={setReg}/>
      {regData &&  <MarketFilter marketprops={regData} setMarketprops={setMarketData} immobilize={disabled: false} /> }
     
    
    </div>
    <div className='flex flex-col flex-5'>
        <p> Fetched Region:  {regData}</p>
        <p> Fetched Market: {marketData}</p>
    </div>
    </div>

    
  )
}

export default MainFilters

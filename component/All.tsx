"use client"

import React, { useEffect } from 'react'
import MainFilters from './MainFilters';
import { useState } from 'react';


export type ChildDefinition = {
    region?: string,
    market?: string,
    commodity?: string,
    type?: string
}

function All() {

    const [myData, setData] = useState<ChildDefinition>({
        region: "",
        market: "",
        commodity: "",
        type: ""
    });



    async function datafetching({ region, market, commodity, type }: ChildDefinition) {
        const dataset = await fetch(`/api/dataset/lahat?region=${region}&market=${market}&commodity=${commodity}&type=${type}`)
        console.log(`Entering Dataset: Region: ${region}`)
        const resulting = await dataset.json()
        const parcel = resulting.success
        //   console.log(`Parcel: ${parcel}`)
        return parcel
    }


    /*  useEffect(() => {
          datafetching({ region: myData.region, market: myData.market, commodity: myData.commodity, type: myData.type })
      }, [myData])
  */
    return (
        <div>
            <MainFilters datum={myData} setDatum={setData} />
        </div>
    )
}

export default All

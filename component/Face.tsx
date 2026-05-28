"use client"

import React, { useState } from 'react'
import SampleGrid from './SampleGrid';
import AI from './AI';



function Face() {

    const [region, setRegion] = useState("");
    const [pressed, setPressed] = useState(false)

    return (
        <div>
            <SampleGrid regData={region} setRegdata={setRegion} tuldok={pressed} setTuldok={setPressed} />
            <AI regData={region} setRegdata={setRegion} tuldok={pressed} setTuldok={setPressed} />


        </div>
    )
}

export default Face

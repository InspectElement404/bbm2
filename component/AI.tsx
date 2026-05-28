"use client"

import React from 'react'
import { useEffect } from 'react'
import { SampleProps } from './SampleGrid'



function AI({ regData, setRegdata, tuldok, setTuldok }: SampleProps) {

    async function getSummary(input: string) {
        const result = await fetch(`/api/summarizer/ai?input=${input}`)
        const { success, message } = await result.json()
        return message
    }



    useEffect(() => {
        const my_args = `Act as an expert travel guide and geographer specializing in the Philippines. Write a concise, engaging "Quick Facts" summary about the ${regData}
CRITICAL INSTRUCTIONS:
1. Output EXACTLY ONE (1) continuous paragraph. Do not use line breaks, bullet points, introductory fluff (like "Here are some quick facts:"), or closing text.
2. The paragraph must be between 3 to 5 sentences long.
3. Content Scope: Explicitly mention the full meaning of the region's acronym/name (if applicable), its location or key geography within the Philippines, its regional center/major city, and its primary economic or tourist identifiers (e.g., world-famous beaches, agricultural nicknames, or distinct biodiversity).`
        getSummary(my_args).then((msg) => {
            console.log(msg)
        })
    }, [tuldok])

    return (
        <div>

        </div>
    )
}

export default AI

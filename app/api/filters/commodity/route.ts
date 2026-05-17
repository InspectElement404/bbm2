import React from 'react'
import { NextResponse } from 'next/server'
import pool from '@/services/database'
import { Capitalism } from '@/services/helper'

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const typeValue = searchParams.get("type")
    const regionValue = searchParams.get("region")
    const marketValue = searchParams.get("market")
    console.log(`Type: ${typeValue}\n Region: ${regionValue}\n Market: ${marketValue}`)
    
    
    try {
        if (typeValue && regionValue && marketValue) {
            console.log("Inside the commodity value plus")
            const resulting = await pool.query(`SELECT DISTINCT commodity FROM public.master_prices where type ILIKE '${typeValue}' AND region ILIKE '${regionValue}' AND market ILIKE '${marketValue}'`)
            const formatted = await resulting.rows 
            
            return NextResponse.json({
                success: true, 
                message: formatted
            })
            
        } else {
            console.log("negaaa")
           return  NextResponse.json({
                success: false, 
                message: []
            })
        }

    } catch (error) {
        return NextResponse.json({
            success: false, 
            message: error

        })
    }

}

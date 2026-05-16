import React from 'react'
import { NextResponse } from 'next/server'
import pool from '@/services/database'

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const typeValue = searchParams.get("type")
    
    try {
        if (typeValue) {
            const resulting = await pool.query(`SELECT DISTINCT commodity FROM public.master_prices where type='${typeValue}'`)
            const formatted = resulting.rows 
            const beautified = formatted.map((rawr) => rawr.commodity)
            return NextResponse.json({
                success: true, 
                data: beautified
            })
            
        }

    } catch (error) {
        return NextResponse.json({
            success: false, 
            message: error

        })
    }

}

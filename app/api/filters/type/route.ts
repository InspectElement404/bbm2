import { NextResponse } from "next/server"
import pool from "@/services/database"

export async function GET(req: Request) {

    const {searchParams} = new URL(req.url)
    const region = searchParams.get('region')
    const market = searchParams.get('market')
    console.log(`Region: ${region} \n Market: ${market}`)
    
    try {
        if (region && market) {
            console.log('inside region and market')
            const querying = await pool.query(
                `SELECT DISTINCT type from public.master_prices where region ILIKE '${region}' and market ILIKE'${market}'`
            ); 
            const rowed = await querying.rows 
            return NextResponse.json({
                success: true, 
                message: rowed
            })
        } else {
            console.log("falseeeee")
            return NextResponse.json({
                success: false, 
                message: "Please provide region and market data"
            })
        }

    } catch (error) {
        return NextResponse.json({
            success: false, 
            message: error
        })
    }

}
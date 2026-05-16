import { NextResponse } from "next/server"
import pool from "@/services/database"

export async function GET(req: Request) {

    const {searchParams} = new URL(req.url)
    const region = searchParams.get('region')
    const market = searchParams.get('market')
    
    try {
        if (region && market) {
            const querying = await pool.query(
                `SELECT DISTINCT type from public.master_prices where region='${region}' and market='${market}'`
            ); 
            const rowed = await querying.rows 
            return NextResponse.json({
                success: true, 
                message: rowed
            })
        } else {
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
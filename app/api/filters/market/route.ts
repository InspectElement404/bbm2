import { NextResponse } from "next/server"
import pool from "@/services/database"


export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const params = searchParams.get("region")

    try {
        if (params) {
            const querying = await pool.query(
                `SELECT DISTINCT market from public.master_prices WHERE region='${params}';`
            )
            const rowing = await querying.rows 
            return NextResponse.json({
                success: true, 
                message: rowing
            })
        }

    }
    catch (error) {
        return NextResponse.json({
            success: false, 
            message: error
        })
    }
   
}
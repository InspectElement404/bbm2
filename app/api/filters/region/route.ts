import { NextResponse } from "next/server";
import pool from "@/services/database";


export async function GET(request: Request) {


    try {
        console.log(`Inside region:`)
        const querying = await pool.query(
            `SELECT DISTINCT region from public.master_prices;`
        )
        const parsed = await querying.rows
        return NextResponse.json({
            success: true,
            message: parsed
        })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error
        })
    }


}
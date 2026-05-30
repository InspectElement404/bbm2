import pool from "@/services/database";
import { NextResponse } from "next/server";
import React from "react";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const params = searchParams.get("region")
    // console.log(params)
    const searchResult = await pool.query(`
        SELECT DISTINCT ON (commodity) region, type, commodity, specifications, market, price from public.master_prices
        WHERE region = '${params}' and price is not null
        LIMIT 100;
        `)
    /*
        const searchResult = await pool.query(`
            SELECT DISTINCT ON (region) region, type, commodity, specifications, market, price FROM public.master_prices
            WHERE price is not null
            ORDER BY region, price desc;`)
    */
    const rowing = searchResult.rows

    if (rowing.length > 1) {
        console.log(`Row Length: ${rowing.length}`)
        return NextResponse.json({
            success: true,
            data: rowing
        })
    } else {
        console.log(`No rows satisfied the condition. `)
        return NextResponse.json({
            success: false,
            data: []
        })
    }
}

import pool from "@/services/database"
import { expensiveType } from "@/services/queryBuilder"
import React from "react"
import { NextResponse } from "next/server"
import { aiQueers } from "@/services/aiquerybuilder"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const regionals = searchParams.get("region")
    const interpret = searchParams.get("interpretation")
    const finalized_query = expensiveType(regionals);
    const database_call = await pool.query(finalized_query);
    const db_rows = database_call.rows

    const prompting = aiQueers({
        interpret: interpret!,
        region: regionals!,
        result: db_rows!
    })

    if (db_rows) {
        return NextResponse.json({
            success: true,
            message: db_rows,
            salita: prompting
        })
    }
    return null


}
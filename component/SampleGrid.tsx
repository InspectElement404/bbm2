"use client"

import React from "react"
import { useState } from "react"
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid"
import { listRegions, listProvinces } from "@jobuntux/psgc"
import { regMapper } from "@/services/helper"
import { GridSuperProps } from "./Face"

type DataResult = {
    commodity: string
    market: string
    price: number | string
    region: string
    specifications: string | null
    type: string
}

export default function SampleGrid({
    Reg,
    Pressed,
    Loadprops,
    ProProps
}: GridSuperProps) {
    const { regData, setRegdata } = Reg
    const { setTuldok } = Pressed
    const { setLoading } = Loadprops
    const { setMyprompt } = ProProps

    const [status, setStatus] = useState(false)
    const [gridding, setGridding] = useState<GridRowsProp>([])

    const columns: GridColDef[] = [
        { field: "region", headerName: "Region", flex: 1 },
        { field: "type", headerName: "Type", flex: 1 },
        { field: "commodity", headerName: "Commodity", flex: 1 },
        { field: "market", headerName: "Market", flex: 1 },
        {
            field: "specifications",
            headerName: "Specifications",
            flex: 1,
        },
        { field: "price", headerName: "Price", flex: 1 },
    ]

    async function fetchData(province: string) {
        const searchRegex = new RegExp(province, "i")

        const matchedProvince = listProvinces().find((province) =>
            searchRegex.test(province.provName)
        )

        if (!matchedProvince) return null

        const regionName = listRegions().find(
            (region) => region.regCode === matchedProvince.regCode
        )?.regionName

        if (!regionName) return null

        const mappedRegion = regMapper(regionName)

        const [datasetResponse, summaryResponse] =
            await Promise.all([
                fetch(
                    `/api/dataset/lahat?region=${mappedRegion}`
                ),
                fetch(
                    `/api/summarizer/extractor?region=${mappedRegion}&interpretation=${'expensive'}`
                ),
            ])

        const dataset =
            await datasetResponse.json()

        const summary = await summaryResponse.json()

        return {
            dataset: dataset.data,
            summary: summary.message,
            words: summary.salita
        }
    }

    function handleInput(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        setRegdata(e.target.value)
    }

    async function handleClick() {
        try {
            // setLoading(true)

            const result = await fetchData(regData)

            if (!result) return
            const { dataset, summary, words } = result

            const formattedRows = dataset.map(
                (row: DataResult, index: number) => ({
                    ...row,
                    id: index + 1,
                })
            )
            const mappers = summary.map((regina: any) => regina)
            // console.log(`Jesus: ${words}`)
            setMyprompt(words);
            setGridding(formattedRows)
            setStatus(true)
            setRegdata("")
        } catch (error) {
            console.error(error)
        }
    }

    function handlePress(
        e: React.KeyboardEvent<HTMLInputElement>
    ) {
        if (e.key === "Enter") {
            handleClick()
            setTuldok((prev) => !prev)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Commodity Price Search
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Search provinces to view commodity
                        pricing data
                    </p>
                </div>

                <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <label
                        htmlFor="search"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Search Province
                    </label>

                    <input
                        id="search"
                        type="search"
                        value={regData}
                        onChange={handleInput}
                        onKeyDown={handlePress}
                        placeholder="e.g. Bulacan, Laguna, Pampanga"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                {status && (
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="h-[600px] w-full">
                            <DataGrid
                                rows={gridding}
                                columns={columns}
                                pageSizeOptions={[10, 25, 50]}
                                disableRowSelectionOnClick
                                sx={{
                                    border: 0,
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: "#f8fafc",
                                        borderBottom:
                                            "1px solid #e5e7eb",
                                    },
                                    "& .MuiDataGrid-cell": {
                                        borderBottom:
                                            "1px solid #f1f5f9",
                                    },
                                    "& .MuiDataGrid-row:hover": {
                                        backgroundColor: "#f8fafc",
                                    },
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
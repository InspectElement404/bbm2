"use client"

import React, { useState } from 'react'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { listRegions, listProvinces, listMuncities, listBarangays } from '@jobuntux/psgc'
import { regMapper } from '@/services/helper'

type dataResult = {
    commodity: string,
    market: string,
    price: number | string,
    region: string,
    specifications: string | null,
    type: string
}

export type SampleProps = {
    regData: string,
    setRegdata: React.Dispatch<React.SetStateAction<string>>
    tuldok: boolean,
    setTuldok: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SampleGrid({ regData, setRegdata, tuldok, setTuldok }: SampleProps) {

    const [status, setStatus] = useState(false)
    const [myResult, setResult] = useState<dataResult[]>([])
    const [gridding, setGridding] = useState<GridRowsProp>([])





    const columns: GridColDef[] = [
        { field: "region", headerName: "Region" },
        { field: "type", headerName: "Type" },
        { field: "commodity", headerName: "Commodity" },
        { field: "market", headerName: "Market" },
        { field: "specifications", headerName: "Specifications" },
        { field: "price", headerName: "Price" },
    ]

    async function fetching(sup: string) {
        const searchers = new RegExp(sup, 'i');
        const probinsya = listProvinces()
        console.log(listRegions().map((obj) => obj.regionName))
        const passers = probinsya.filter((obj) => searchers.test(obj.provName))
        let regionalistic: string | null = null
        if (passers.length > 0) {
            const regionals = listRegions().filter((obj) => obj.regCode == passers[0].regCode)[0].regionName

            regionalistic = regionals;
        } else {
            regionalistic = null
        }
        console.log(`${sup} is in ${regionalistic}`)
        if (regionalistic) {
            const recta = regMapper(regionalistic);
            const datum = await fetch(`/api/dataset/lahat?region=${recta}`)
            const { success, data } = await datum.json()
            return data
        }
        return null


    }

    function handleInput(e: any) {
        setRegdata(e.target.value)

    }

    const handlePress = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key == 'Enter') {
            handleClick()
            setTuldok((prev) => !prev)
            console.log(`Tuldok: ${tuldok}`)
        }

    }

    function handleClick() {
        fetching(regData).
            then((resulta) => {
                const new_val = resulta.map((rowena: dataResult, index: number) => ({
                    ...rowena,
                    id: index + 1
                }))
                setStatus(true);
                setGridding(new_val)
                setRegdata("");
            })

    }



    return (

        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Commodity Price Search
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Search provinces to view commodity pricing data
                    </p>
                </div>

                {/* Search Card */}
                <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <label
                        htmlFor="search"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Search Province
                    </label>

                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        <input
                            value={regData}
                            onChange={handleInput}
                            onKeyDown={handlePress}
                            type="search"
                            id="search"
                            placeholder="e.g. Bulacan, Laguna, Pampanga"
                            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>
                </div>

                {/* Table */}
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
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: '#f8fafc',
                                        borderBottom: '1px solid #e5e7eb',
                                        fontWeight: 700,
                                    },
                                    '& .MuiDataGrid-cell': {
                                        borderBottom:
                                            '1px solid #f1f5f9',
                                    },
                                    '& .MuiDataGrid-row:hover': {
                                        backgroundColor: '#f8fafc',
                                    },
                                    '& .MuiDataGrid-footerContainer': {
                                        borderTop:
                                            '1px solid #e5e7eb',
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

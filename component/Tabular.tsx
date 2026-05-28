"use client"

import React from 'react'
import { ColumnDef, useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table'

type Student = {
    name: string,
    id: number,
    year: number
    age: number
}

function Tabular() {

    const data: Student[] = [
        {
            name: "Mark",
            id: 12211,
            year: 2000,
            age: 23
        },
        {
            name: "Marvin",
            id: 3311,
            year: 1999,
            age: 26
        }]

    const columnar: ColumnDef<Student>[] = [
        {
            accessorKey: "name",
            header: "Name"
        },
        {
            accessorKey: "id",
            header: "ID"
        }, {
            accessorKey: "year",
            header: "Year"
        },
        {
            accessorKey: "age",
            header: "Age"
        }
    ]

    const table = useReactTable({
        data,
        columns: columnar,
        getCoreRowModel: getCoreRowModel()
    })
    //  console.log(`Tans: ${table.getRowModel().rows[0].id}`)

    return (
        <div className="flex justify-center align-center mt-10 w-full">

            <table className='w-[1/2] h-1/2 border border-collapse border-gray-300'>
                <thead>
                    {
                        table.getHeaderGroups().map((headerGroups) => (
                            <tr key={headerGroups.id}>
                                {
                                    headerGroups.headers.map((header) => (
                                        <th key={header.id} className='border border-collapse border-gray-300'>
                                            {
                                                flexRender(
                                                    header.column
                                                        .columnDef.
                                                        header,
                                                    header.getContext()
                                                )
                                            }

                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }

                </thead>
                <tbody>
                    {table.getRowModel().rows.map(
                        (row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells()
                                    .map((cell) =>
                                    (
                                        <td key={cell.id} className='p-3 border border-collapse border-gray-300'>
                                            {
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            }
                                        </td>
                                    )
                                    )}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Tabular

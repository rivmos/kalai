import { useState } from 'react'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import { useAppSelector, OrderHistory } from '../store'
import dayjs from 'dayjs'
import { Education, UserDataState } from '@/views/web/company/AboutUs/store'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const statusColor: Record<string, string> = {
    paid: 'bg-emerald-500',
    pending: 'bg-amber-400',
}

const columnHelper = createColumnHelper<Education>()

const columns = [
    // columnHelper.accessor('id', {
    //     header: 'Reference',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div>
    //                 <span className="cursor-pointer">{row.id}</span>
    //             </div>
    //         )
    //     },
    // }),
    columnHelper.accessor('school_institute', {
        header: 'Institute',
    }),
    columnHelper.accessor('document_type', {
        header: 'Education',
    }),
    columnHelper.accessor('board_university', {
        header: 'Board',
    }),
    columnHelper.accessor('year_passing', {
        header: 'Year',
        // cell: (props) => {
        //     const row = props.row.original
        //     return (
        //         <div className="flex items-center">
        //             <Badge className={statusColor[row.status]} />
        //             <span className="ml-2 rtl:mr-2 capitalize">
        //                 {row.status}
        //             </span>
        //         </div>
        //     )
        // },
    }),
    columnHelper.accessor('parcentage', {
        header: 'Percentage',
        // cell: (props) => {
        //     const row = props.row.original[0]
        //     return (
        //         <div className="flex items-center">
        //             {/* {dayjs.unix(row.date).format('MM/DD/YYYY')} */}
        //             {JSON.stringify(row)}
        //         </div>
        //     )
        // },
    }),
    // columnHelper.accessor('amount', {
    //     header: 'Amount',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div className="flex items-center">
    //                 <NumericFormat
    //                     displayType="text"
    //                     value={(Math.round(row.amount * 100) / 100).toFixed(2)}
    //                     prefix={'$'}
    //                     thousandSeparator={true}
    //                 />
    //             </div>
    //         )
    //     },
    // }),
]

const EducationDetails = () => {
    const data = useAppSelector(
        (state) => state.userProfile.data.profileData.userEductions
    )

    const [sorting, setSorting] = useState<
        {
            id: string
            desc: boolean
        }[]
    >([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="mb-8">
            <h6 className="mb-4">Education Details</h6>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })}
                </TBody>
            </Table>
        </div>
    )
}

export default EducationDetails

import { useCallback } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import useThemeClass from '@/utils/hooks/useThemeClass'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'

type Order = {
    sno: number;
    id: number;
    name: string;
    is_manual_log: number;
    is_meeting_log: number;
    milestone_id: number;
    spent_time_minutes: string;
    percent_disaprove: string;
    final_hr: number;
    maxxstation_time: null | string;
    user: string;
    taskname: string;
    remarks: string;
    created_at: number;
    performance: number;
    deduction: number;
    wage_per_hour: string;
    total_wages: number;
    performance_retention: string;
    net_total: string;
    tax_deduction: string;
    net_payable: string;
    balance_payable: string;
    status: number;
}

type LatestOrderProps = {
    data?: Order[]
    className?: string
}

type OrderColumnPros = {
    row: Order
}

const { Tr, Td, TBody, THead, Th } = Table

const orderStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    
    0: {
        label: 'Pending',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    1: {
        label: 'Paid',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    2: { label: 'Failed', dotClass: 'bg-red-500', textClass: 'text-red-500' },
}

const OrderColumn = ({ row }: OrderColumnPros) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row.id}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            #{row.id}
        </span>
    )
}

const columnHelper = createColumnHelper<Order>()

const columns = [
    /* columnHelper.accessor('id', {
        header: 'Order',
        cell: (props) => <OrderColumn row={props.row.original} />,
    }), */
    
    columnHelper.accessor('name', {
        header: 'Project Name',
    }),
    columnHelper.accessor('total_wages', {
        header: 'Total Wages',
        cell: (props) => {
            const { total_wages } = props.row.original
            return (
                <NumericFormat
                    displayType="text"
                    value={(Math.round(total_wages * 100) / 100).toFixed(2)}
                    prefix={'$'}
                    thousandSeparator={true}
                />
            )
        },
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (props) => {
            const { status } = props.row.original
            return (
                <div className="flex items-center">
                    <Badge className={orderStatusColor[status].dotClass} />
                    <span
                        className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
                    >
                        {orderStatusColor[status].label}
                    </span>
                </div>
            )
        },
    }),
    columnHelper.accessor('created_at', {
        header: 'Date',
        cell: (props) => {
            const row = props.row.original
            return <span>{dayjs.unix(row.created_at).format('DD/MM/YYYY')}</span>
        },
    }),
]

const LatestOrder = ({ data = [], className }: LatestOrderProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-6">
                <h4>Previous Wages</h4>
                {/* <Button size="sm">View Orders</Button> */}
            </div>
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
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
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
        </Card>
    )
}

export default LatestOrder

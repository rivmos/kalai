import { useState, useEffect, useCallback } from 'react'
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
import reducer, { useAppSelector } from '../store';
import { injectReducer, useAppDispatch } from '@/store';
import { SalesDashboardState, getSalesDashboardData, } from '../store/salesDashboardSlice';

injectReducer('salesDashboard', reducer)

type Order = {
    id: string
    date: number
    customer: string
    status: number
    paymentMehod: string
    paymentIdendifier: string
    totalAmount: number
}

type LatestOrderProps = {
    data?: Order[]
    className?: string
}

type OrderColumnPros = {
    row: Order
}

const { Tr, Td, TBody, THead, Th } = Table

const latestOrderData = [
    {
        id: '95954',
        date: 1660132800,
        customer: 'Ron Vargas',
        status: 0,
        paymentMehod: 'visa',
        paymentIdendifier: '•••• 6165',
        totalAmount: 168,
    },
    {
        id: '95423',
        date: 1659132800,
        customer: 'Carolyn Hanso',
        status: 0,
        paymentMehod: 'visa',
        paymentIdendifier: '•••• 7128',
        totalAmount: 523,
    },
    {
        id: '92903',
        date: 1658132800,
        customer: 'Gabriella May',
        status: 1,
        paymentMehod: 'paypal',
        paymentIdendifier: '••••@gmail.com',
        totalAmount: 81,
    },
    {
        id: '92627',
        date: 1657332800,
        customer: 'Tara Fletcher',
        status: 2,
        paymentMehod: 'master',
        paymentIdendifier: '•••• 0921',
        totalAmount: 279,
    },
    {
        id: '89332',
        date: 1654132800,
        customer: 'Eileen Horton',
        status: 0,
        paymentMehod: 'paypal',
        paymentIdendifier: '••••@gmail.com',
        totalAmount: 597,
    },
    {
        id: '86497',
        date: 1647632800,
        customer: 'Lloyd Obrien',
        status: 2,
        paymentMehod: 'visa',
        paymentIdendifier: '•••• 0443',
        totalAmount: 189,
    },
    {
        id: '86212',
        date: 1646832800,
        customer: 'Tara Fletcher',
        status: 0,
        paymentMehod: 'paypal',
        paymentIdendifier: '••••@gmail.com',
        totalAmount: 672,
    },
];

const orderStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: 'Paid',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Pending',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
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
    columnHelper.accessor('id', {
        header: 'Id',
        cell: (props) => <OrderColumn row={props.row.original} />,
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
    columnHelper.accessor('date', {
        header: 'Date',
        cell: (props) => {
            const row = props.row.original
            return <span>{dayjs.unix(row.date).format('DD/MM/YYYY')}</span>
        },
    }),
    columnHelper.accessor('customer', {
        header: 'Task Name',
    }),
    columnHelper.accessor('totalAmount', {
        header: 'Estimated Time',
        cell: (props) => {
            const { totalAmount } = props.row.original
            return (
                <NumericFormat
                    displayType="text"
                    value={(Math.round(totalAmount * 100) / 100).toFixed(2)}
                    prefix={'$'}
                    thousandSeparator={true}
                />
            )
        },
    }),
]

const LatestOrder = ({ data = latestOrderData, className }: LatestOrderProps) => {

    const dispatch = useAppDispatch()
    const dashboard = useAppSelector(
        (state) => state.salesDashboard?.data?.dashboardData
    )
    console.log("dasboard", dashboard);

    useEffect(() => {
        dispatch(getSalesDashboardData())
    }, [dispatch])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-6">
                <h4>Latest Activity</h4>
            </div>
            <Table className="w-full">
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

import { useEffect, useCallback, useMemo, useRef } from 'react'
import Badge from '@/components/ui/Badge'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
    getOrders,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'

type Order = {
    id: string
    date: number
    customer: string
    status: number
    paymentMehod: string
    paymentIdendifier: string
    totalAmount: number
}
const ordersData = [
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
        status: 0,
        paymentMehod: 'paypal',
        paymentIdendifier: '••••@gmail.com',
        totalAmount: 81,
    },
    {
        id: '92627',
        date: 1657332800,
        customer: 'Tara Fletcher',
        status: 0,
        paymentMehod: 'master',
        paymentIdendifier: '•••• 0921',
        totalAmount: 279,
    },
    {
        id: '92509',
        date: 1656232800,
        customer: 'Joyce Freeman',
        status: 1,
        paymentMehod: 'visa',
        paymentIdendifier: '•••• 1232',
        totalAmount: 831,
    },
    {
        id: '91631',
        date: 1655532800,
        customer: 'Brittany Hale',
        status: 0,
        paymentMehod: 'visa',
        paymentIdendifier: '•••• 4597',
        totalAmount: 142,
    },
    {
        id: '90963',
        date: 1654932800,
        customer: 'Luke Cook',
        status: 0,
        paymentMehod: 'master',
        paymentIdendifier: '•••• 3881',
        totalAmount: 232,
    },
    {
        id: '89332',
        date: 1654132800,
        customer: 'Eileen Horton',
        status: 1,
        paymentMehod: 'paypal',
        paymentIdendifier: '••••@gmail.com',
        totalAmount: 597,
    },
    {
        id: '89107',
        date: 1650132800,
        customer: 'Frederick Adams',
        status: 2,
        paymentMehod: 'visa',
        paymentIdendifier: '•••• 3356',
        totalAmount: 72,
    },
    {
        id: '89021',
        date: 1649832800,
        customer: 'Lee Wheeler',
        status: 0,
        paymentMehod: 'master',
        paymentIdendifier: '•••• 9564',
        totalAmount: 110,
    },
    {
        id: '88911',
        date: 1649432800,
        customer: 'Gail Barnes',
        status: 0,
        paymentMehod: 'visa',
        paymentIdendifier: '•••• 1357',
        totalAmount: 59,
    },
    {
        id: '87054',
        date: 1647932800,
        customer: 'Ella Robinson',
        status: 0,
        paymentMehod: 'visa',
        paymentIdendifier: '•••• 3561',
        totalAmount: 238,
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
]
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

const PaymentMethodImage = ({
    paymentMehod,
    className,
}: {
    paymentMehod: string
    className: string
}) => {
    switch (paymentMehod) {
        case 'visa':
            return (
                <img
                    className={className}
                    src="/img/others/img-8.png"
                    alt={paymentMehod}
                />
            )
        case 'master':
            return (
                <img
                    className={className}
                    src="/img/others/img-9.png"
                    alt={paymentMehod}
                />
            )
        case 'paypal':
            return (
                <img
                    className={className}
                    src="/img/others/img-10.png"
                    alt={paymentMehod}
                />
            )
        default:
            return <></>
    }
}

const OrderColumn = ({ row }: { row: Order }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        //navigate(`/app/sales/order-details/${row.id}`)
        navigate(`/app/pin/payments-in-invoice-overview`)
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

const ActionColumn = ({ row }: { row: Order }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow([row.id]))
    }

    const onView = useCallback(() => {
        //navigate(`/app/sales/order-details/${row.id}`)
        navigate(`/app/pin/payments-in-invoice-overview`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </Tooltip>
        </div>
    )
}

const OrdersTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesOrderList.data.tableData
    )
    const loading = useAppSelector((state) => state.salesOrderList.data.loading)

    const data = useAppSelector((state) => state.salesOrderList.data.orderList)

    const fetchData = useCallback(() => {
        console.log('{ pageIndex, pageSize, sort, query }', {
            pageIndex,
            pageSize,
            sort,
            query,
        })
        dispatch(getOrders({ pageIndex, pageSize, sort, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<Order>[] = useMemo(
        () => [
            {
                header: 'Transaction Id',
                accessorKey: 'id',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },
            {
                header: 'Date',
                accessorKey: 'date',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>{dayjs.unix(row.date).format('DD/MM/YYYY')}</span>
                    )
                },
            },
            {
                header: 'Client/Agency',
                accessorKey: 'customer',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={orderStatusColor[status].dotClass}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
                            >
                                {orderStatusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },
            // {
            //     header: 'Payment Method',
            //     accessorKey: 'paymentMehod',
            //     cell: (props) => {
            //         const { paymentMehod, paymentIdendifier } =
            //             props.row.original
            //         return (
            //             <span className="flex items-center">
            //                 <PaymentMethodImage
            //                     className="max-h-[20px]"
            //                     paymentMehod={paymentMehod}
            //                 />
            //                 <span className="ltr:ml-2 rtl:mr-2">
            //                     {paymentIdendifier}
            //                 </span>
            //             </span>
            //         )
            //     },
            // },
            {
                header: 'Total',
                accessorKey: 'totalAmount',
                cell: (props) => {
                    const { totalAmount } = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            value={(
                                Math.round(totalAmount * 100) / 100
                            ).toFixed(2)}
                            prefix={'$'}
                            thousandSeparator={true}
                        />
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    const onRowSelect = (checked: boolean, row: Order) => {
        if (checked) {
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<Order>[]) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds: string[] = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.id)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <DataTable
            ref={tableRef}
            selectable
            columns={columns}
            data={ordersData}
            //loading={loading}
            pagingData={{
                total: tableData.total as number,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
            onCheckBoxChange={onRowSelect}
            onIndeterminateCheckBoxChange={onAllRowSelect}
        />
    )
}

export default OrdersTable

import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getWages,
    setTableData,
    setSelectedProduct,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import WagesDeleteConfirmation from './WagesDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import type { DataState } from '../store'


//import { injectReducer, useAppDispatch } from '@/store';
//import { getWages, TaskWages } from '../store';
//import { getWages,Wages } from '../store'
//import type { Project } from '../store'

const inventoryStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: 'In Stock',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Limited',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: {
        label: 'Out of Stock',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const ActionColumn = ({ row }: { row: DataState }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/sales/product-edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const WagesColumn = ({ row }: { row: DataState }) => {
   
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.sno}</span>
        </div>
    )
}

const TaskColumn = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.user}</span>
        </div>
    )
}
const ProjectName = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}
const TaskEventType = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.taskname}</span>
        </div>
    )
}
const TotalTimeLogged = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.spent_time_minutes}</span>
        </div>
    )
}
const Final_hr = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.final_hr}</span>
        </div>
    )
}
const NonBillabeTime = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.percent_disapprove}</span>
        </div>
    )
}
const PerformanceBonus = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.performance}</span>
        </div>
    )
}
const PerformanceDeduction = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.deduction}</span>
        </div>
    )
}
const WagesPerHours = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.wage_per_hour}</span>
        </div>
    )
}
const TotalWages = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.total_wages}</span>
        </div>
    )
}

const NetTotal = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.net_total}</span>
        </div>
    )
}
const TaxDeduction = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.tax_deduction}</span>
        </div>
    )
}
const NetPayable = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.net_payable}</span>
        </div>
    )
}
const BalancePayable = ({ row }: { row: DataState }) => {  
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.balance_payable}</span>
        </div>
    )
}

const WagesTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.reportsanalysisWagesList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.reportsanalysisWagesList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.reportsanalysisWagesList.data.loading
    )

    const data = useAppSelector(
        (state) => state.reportsanalysisWagesList.data.productList
    )
    //console.log(data , 'herer')
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getWages({ pageIndex, pageSize, sort, query, filterData }))
    }

    const columns: ColumnDef<DataState>[] = useMemo(
        () => [
            {
                header: 'S.NO',
                accessorKey: 'sno',
                cell: (props: any) => {
                    const row = props.row.original
                    return <WagesColumn row={row} />
                },
            },
            {
                header: 'User',
                accessorKey: 'user',
                cell: (props: any) => {
                    const row = props.row.original
                    return <TaskColumn row={row} />
                },
            },
            {
                header: 'Project/Event',
                accessorKey: 'projectname',
                cell: (props: any) => {
                    const row = props.row.original
                    return <ProjectName row={row} />
                },
            },
            {
                header: 'Task/Event Type',
                accessorKey: 'taskeventtype',
                cell: (props: any) => {
                    const row = props.row.original
                    return <TaskEventType row={row} />
                },
            },
            {
                header: 'Total Time Logged',
                accessorKey: 'spent_time_minutes',
                cell: (props: any) => {
                    const row = props.row.original
                    return <TotalTimeLogged row={row} />
                },
            },
            {
                header: 'Billable',
                accessorKey: 'final_hr',
                cell: (props: any) => {
                    const row = props.row.original
                    return <Final_hr row={row} />
                },
            },
            {
                header: 'Non Billable Time',
                accessorKey: 'percent_disapprove',
                cell: (props: any) => {
                    const row = props.row.original
                    return <NonBillabeTime row={row} />
                },
            },
            {
                header: 'Performance Bonus',
                accessorKey: 'performance',
                cell: (props: any) => {
                    const row = props.row.original
                    return <PerformanceBonus row={row} />
                },
            },
            {
                header: 'Performance Deduction',
                accessorKey: 'deduction',
                cell: (props: any) => {
                    const row = props.row.original
                    return <PerformanceDeduction row={row} />
                },
            },
            {
                header: 'Wages Per Hours',
                accessorKey: 'wages_per_hours',
                cell: (props: any) => {
                    const row = props.row.original
                    return <WagesPerHours row={row} />
                },
            },
            {
                header: 'Total Wages',
                accessorKey: 'total_wages',
                cell: (props: any) => {
                    const row = props.row.original
                    return <TotalWages row={row} />
                },
            },
           
            {
                header: 'Net Total',
                accessorKey: 'net_total',
                cell: (props: any) => {
                    const row = props.row.original
                    return <NetTotal row={row} />
                },
            },
            {
                header: 'Tax Deduction',
                accessorKey: 'tax_deduction',
                cell: (props: any) => {
                    const row = props.row.original
                    return <TaxDeduction row={row} />
                },
            },
            {
                header: 'Net Payable',
                accessorKey: 'net_payable',
                cell: (props: any) => {
                    const row = props.row.original
                    return <NetPayable row={row} />
                },
            },
            {
                header: 'Balance Payable',
                accessorKey: 'balance_payable',
                cell: (props: any) => {
                    const row = props.row.original
                    return <BalancePayable row={row} />
                },
            },
           /*  {
                header: 'Quantity',
                accessorKey: 'stock',
                sortable: true,
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props: any) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    inventoryStatusColor[status].dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}
                            >
                                {inventoryStatusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Price',
                accessorKey: 'price',
                cell: (props: any) => {
                    const { price } = props.row.original
                    return <span>${price}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props: any) => <ActionColumn row={props.row.original} />,
            }, */
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

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <WagesDeleteConfirmation />
        </>
    )
}

export default WagesTable

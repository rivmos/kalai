import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getTasks,
    setTableData,
    setSelectedTask,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import TaskDeleteConfirmation from './TaskDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'



type Product = {
    sno: number;
    logged_time: number;
    billable_time: number;
    task_id: number;
    task_name: string;
    project_name: string;
    description: string;
    start_date: string;
    assigned_to: string;
    due_date: string;
    created_at: string;
    progress: number;
    status: number;
    approved_hour: string;
    task_progress_status:number;
    quantify:number;
}

const inventoryStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: 'To Do',        
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    1: {
        label: 'To Do',        
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: {
        label: 'In Progress',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
       
    },
    3: {
        label: 'Completed',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
    4: {
        label: 'Approved By Lead',        
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    5: {
        label: 'QA Testing',        
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
}
const inventoryQuantifyColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: 'Non-quantified',  
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',      
        
    },
    1: {
        label: 'Quantified',        
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    }   
}
/* const ActionColumn = ({ row }: { row: Product }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/sales/product-edit/${row.task_id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedTask(row.task_id))
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
 */
const ProductColumn = ({ row }: { row: Product }) => {
   

    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.task_name}</span>
        </div>
    )
}

const ProductTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.taskList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.taskList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.taskList.data.loading
    )

    const data = useAppSelector(
        (state) => state.taskList.data.taskList
    )
    console.log(data)
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
        dispatch(getTasks({ pageIndex, pageSize, sort, query, filterData }))
    }

    const columns: ColumnDef<Product>[] = useMemo(
        () => [
            {
                header: 'Task Name',
                accessorKey: 'task_name',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            {
                header: 'Project Name',
                accessorKey: 'project_name',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.project_name}</span>
                },
            },
            {
                header: 'Start Date',
                accessorKey: 'start_date',
                sortable: true,
            },
            {
                header: 'Due Date',
                accessorKey: 'due_date',
                sortable: true,
            },
            {
                header: 'Estimated Time',
                accessorKey: 'approved_hour',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.approved_hour}</span>
                },
            },
            {
                header: 'Assigned To',
                accessorKey: 'assigned_to',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.assigned_to}</span>
                },
            },
            {
                header: 'Status',
                accessorKey: 'task_progress_status',
                cell: (props) => {
                    const { task_progress_status } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    inventoryStatusColor[task_progress_status].dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${inventoryStatusColor[task_progress_status].textClass}`}
                            >
                                {inventoryStatusColor[task_progress_status].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Quantify',
                accessorKey: 'quantify',
                cell: (props) => {
                    const { quantify } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    inventoryQuantifyColor[quantify].dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${inventoryQuantifyColor[quantify].textClass}`}
                            >
                                {inventoryQuantifyColor[quantify].label}
                            </span>
                        </div>
                    )
                },
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
            <TaskDeleteConfirmation />
            
        </>
    )
}

export default ProductTable

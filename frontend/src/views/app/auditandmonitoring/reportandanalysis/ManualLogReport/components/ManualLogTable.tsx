import { useState } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import Pagination from '@/components/ui/Pagination'
import Table from '@/components/ui/Table'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
} from '@tanstack/react-table'
import {
    getManualLogList,
    setTableData,
    setSelectedProduct,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import Dropdown from '@/components/ui/Dropdown'
import EllipsisButton from '@/components/shared/EllipsisButton'
import DatePicker from '@/components/ui/DatePicker'
import {
    HiDownload,
    HiOutlineSearch,
    HiOutlineTrash,
    HiOutlineFilter,
    HiOutlineSwitchHorizontal,
    HiOutlinePencil,
    HiOutlineFlag,
    HiOutlineCog,
} from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import ManualLogDeleteConfirmation from './ManualLogDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
const { DatePickerRange } = DatePicker 
import Input from '@/components/ui/Input'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnDef, FilterFn, ColumnFiltersState } from '@tanstack/react-table'
import type { InputHTMLAttributes } from 'react'
import Select from '@/components/ui/Select'
import 'react-datepicker/dist/react-datepicker.css';
import {
    apiGetManualLogLists,    
} from '@/services/ReportsAnalysis'



interface DebouncedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'prefix'> {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
}

type ManualLog = {
    sno: number;
    id: number; 
    project: string; 
    billable: string; 
    nonbillable: string; 
    meeting_agenda: string; 
    meeting_type: string; 
    participant: string; 
    meeting_date: string; 
    start_time: string; 
    end_time: string; 
    spent_time_minutes: string; 
    created_by: number; }[]
type Option = {
    value: number
    label: string
}
/* type StartDate = {
    StartDate : string
}
type EndDate = {
    EndDate : string
} */
const ActionColumn = ({ row }: { row: ManualLog }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/rna/manual-log-edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }
    const onApprove = () => {
        //dispatch(toggleDeleteConfirmation(true))
        //dispatch(setSelectedProduct(row.id))
    }
    const onDisapprove = () => {
        //dispatch(toggleDeleteConfirmation(true))
        //dispatch(setSelectedProduct(row.id))
    }
    return (
        <div className="flex justify-end text-lg">                    
            {/* <span className="cursor-pointer p-2 hover:${textTheme}"  onClick={onApprove}> <HiOutlineSwitchHorizontal /> Approve</span>
            <span className="ml-2 rtl:mr-2" onClick={onDisapprove}><HiOutlineCog /> Disapprove</span> */}
            <span className="cursor-pointer p-2 hover:${textTheme}"  onClick={onEdit}> <HiOutlinePencil /> Edit</span>
            <span className="ml-2 rtl:mr-2" onClick={onDelete}><HiOutlineTrash /> Delete</span>                    
        </div>
    )
}
const columns: ColumnDef<ManualLog>[] = [
    {
        header: 'Meeting Type',
        accessorKey: 'meeting_type',
    },
    {
        header: 'Project Name',
        accessorKey: 'project',
    },
    {
        header: 'Meeting Agenda',
        accessorKey: 'meeting_agenda',
    },
    {
        header: 'Participant',
        accessorKey: 'participant',
    },
    {
        header: 'Start Date Time',
        accessorKey: 'start_time',
    },
    {
        header: 'End Date Time',
        accessorKey: 'end_time',
    },
    {
        header: 'Billable',
        accessorKey: 'billable',
    },
    {
        header: 'Non Billable',
        accessorKey: 'nonbillable',
    },
    {
        header: 'Action',
        id: 'action',
        cell: (props) => {
            //const row = props.row.original
            return  <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
            <ActionColumn row={props.row.original} />
        </Dropdown>
        },
    },
   
]
const { Tr, Th, Td, THead, TBody, Sorter } = Table



function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <div className="flex justify-end">
            <div className="flex items-center mb-4">
                <span className="mr-2">Search:</span>
                <Input
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}
/* const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
] */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}
const ProductTable = () => {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const columns = useMemo<ColumnDef<ManualLog>[]>(
        () => [
            {
                header: 'Meeting Type',
                accessorKey: 'meeting_type',
            },
            {
                header: 'Project Name',
                accessorKey: 'project',
            },
            {
                header: 'Meeting Agenda',
                accessorKey: 'meeting_agenda',
            },
            {
                header: 'Participant',
                accessorKey: 'participant',
            },
            {
                header: 'Start Date Time',
                accessorKey: 'start_time',
            },
            {
                header: 'End Date Time',
                accessorKey: 'end_time',
            },
            {
                header: 'Billable',
                accessorKey: 'billable',
            },
            {
                header: 'Non Billable',
                accessorKey: 'nonbillable',
            },
            {
                header: 'Action',
                id: 'action',
                cell: (props) => {
                    //const row = props.row.original
                    return  <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
                    <ActionColumn row={props.row.original} />
                </Dropdown>
                },
            },
        ],
        []
    )
   
    const data = useAppSelector(
        //(state) => state.ManualLogList.data.manualLogList
        (state) => state.ManualLogList.data.manualLogList
    )
    //console.log(data)
    const tableData = (): ManualLog[] => {
        const arr = []
        for (let i = 0; i < data.length; i++) {
            arr.push({
                sno: i,
                id: i,
                project: `${i}`,
                billable: `${i}`,
                nonbillable: `${i}`,
                meeting_agenda: `${i}`,
                meeting_type: `${i}`,
                participant: `${i}`,
                meeting_date: `${i}`,
                start_time: `${i}`,
                end_time: `${i}`,
                spent_time_minutes: `${i}`,
                created_by: i,
            })
        }
        return arr
    }
    const totalData = tableData().length
    //const [data] = useState(() => data10)

    

    const dispatch = useAppDispatch()
    const [sorting, setSorting] = useState<ColumnSort[]>([])

    useEffect(() => {
        fetchData()
    }, [])  

    const fetchData = () => {
        dispatch(getManualLogList(data))
    }
    const [filterdata, setFilterData] = useState();
    console.log(filterdata)
    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
            sorting,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugHeaders: true,
        debugColumns: false,
    })

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }
    
 
    return (
        <>
       
            <DebouncedInput
                value={globalFilter ?? ''}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search all columns..."
                onChange={(value) => setGlobalFilter(String(value))}
            />
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
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={totalData}
                    onChange={onPaginationChange}
                />
                {/* <div style={{ minWidth: 130 }}>
                    <Select<Option>
                        size="sm"
                        isSearchable={false}
                        value={pageSizeOption.filter(
                            (option) =>
                                option.value ===
                                table.getState().pagination.pageSize
                        )}
                        options={pageSizeOption}
                        onChange={(option) => onSelectChange(option?.value)}
                    />
                </div> */}
            </div>
        </>
    )
}

export default ProductTable
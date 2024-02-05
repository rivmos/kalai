import { useState, useEffect, useMemo, useRef ,useCallback } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Dropdown from '@/components/ui/Dropdown'
import DataTable from '@/components/shared/DataTable'
import EllipsisButton from '@/components/shared/EllipsisButton'
import Drawer from '@/components/ui/Drawer'
import DatePicker from '@/components/ui/DatePicker'
import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import type { MouseEvent } from 'react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Upload from '@/components/ui/Upload'
import { CSVLink } from 'react-csv';
import { } from 'react-icons/hi'
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
import { FiPackage } from 'react-icons/fi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import Dialog from '@/components/ui/Dialog'
import type {
    DataTableResetHandle,
    OnSortParam,
    // ColumnDef,
} from '@/components/shared/DataTable'
import moment from 'moment';
import reducer, { useAppSelector } from './store';
import { injectReducer, useAppDispatch } from '@/store';
import { LogsListState, LogsFilterListState, getflaglist, getFilterFlagelist } from './store/flageSlice';
import { apiGetFlageListFilter } from '@/services/WebService';
import { apiGetComment, apiAddFlag } from '@/services/Audit';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'
import type { ColumnDef, ColumnSort } from '@tanstack/react-table'

injectReducer('flagedata', reducer)

type FlagList = {
    id: string
    user: string
    image: string
    projectevent: string
    taskevent: string
    totaltimelogged: number
    billabletime: string
    estimatedtime: number
    comments: string
    status: number
    reason: string
    urgency: string
    project_id: number
    user_id: number
    project_task_id: number
    project_log_time_id: number
    action: string
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
const { Tr, Th, Td, THead, TBody, Sorter } = Table
const FlagColumn = ({ row }: { row: FlagList }) => {
    const avatar = row.image ? (
        <Avatar src={row.image} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.user}</span>
        </div>
    )
}

const dropdownList = [
    { label: 'Dispute', value: 6, action: 'status', icon: <HiOutlineSwitchHorizontal /> },
];

const ItemDropdown = ({ rowId, projectId, userId, projectTaskId, projectLogTimeId }: { rowId: string; projectId: number; userId: number; projectTaskId: number; projectLogTimeId: number }) => {
    const dispatch = useAppDispatch();

    const [commentData, setCommentData] = useState<FlagList[] | null>(null);
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [reason, setReason] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [addComment, setAddComment] = useState('');
    const [hiddenFieldId, setHiddenFieldId] = useState(rowId);
    const [flagId, setFlagId] = useState("")

    useEffect(() => {
        if (commentData && commentData.length > 0) {
            const { reason, urgency, comments, id } = commentData[0];
            setReason(reason || '');
            setSelectedOption(urgency || '');
            setDescriptions(comments || '');
            setFlagId(id || '');
        }
    }, [commentData]);

    const openDialog = () => {
        setDialogIsOpen(true)
    }
    const onDialogClose = () => {
        setDialogIsOpen(false)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await apiAddFlag({
                id: rowId,
                project_log_time_id: projectLogTimeId,
                comments: descriptions,
                return_comments: addComment,
                reason: reason,
                urgency: selectedOption,
                status: 4,
                user_id: userId,
                project_id: projectId,
                project_task_id: projectTaskId,

            });
            onDialogClose();
            dispatch(getflaglist());
            dispatch(getFilterFlagelist());

        } catch (error) {
            console.error('Error submitting form:');
        }
    };

    const commentApi = async () => {
        try {
            const response = await apiGetComment({
                id: rowId
            });
            const newCommentData = response?.data;
            setCommentData((newCommentData as any)?.data);
            dispatch(getflaglist());
        } catch (error) {
            console.error('Error submitting form:');
        }
    };

   
    return (
        <div>
            <Dialog
                isOpen={dialogIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="p-8">
                    <h5 className="mb-6 text-xl font-semibold">Flag Details</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                placeholder="Reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                placeholder="Urgency"
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <Input
                                placeholder="Descriptions"
                                textArea
                                value={descriptions}
                                onChange={(e) => setDescriptions(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label style={{ color: 'black', fontSize: '16px', fontWeight: "bold", marginBottom: "20px" }}>Add Comment</label>
                            <Input
                                textArea
                                value={addComment}
                                onChange={(e) => setAddComment(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <Upload disabled />
                        </div>
                        <div className="text-right mt-6">
                            <Button
                                className="ltr:mr-2 rtl:ml-2"
                                variant="plain"
                                onClick={onDialogClose}
                            >
                                Cancel
                            </Button>
                            <Button variant="solid" type="submit">
                                Add Comment
                            </Button>
                        </div>
                    </form>
                </div>
            </Dialog>
            <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
                {dropdownList.map((item) => (
                    <Dropdown.Item key={item.value} onClick={() => { openDialog(); commentApi(); }}>
                        <span className="text-lg">{item.icon}</span>
                        <span className="ml-2 rtl:mr-2">{item.label}</span>
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    )
}

const DisputeAndFlags = () => {

    const dispatch = useAppDispatch()
    const ApiflagData = useAppSelector(state => state.flagedata.data.loglistData.LogList);
    const ApiUserData = useAppSelector(state => state.flagedata.data.loglistData.users);
    const [filterFlagData, setFilterFlageData] = useState<LogsFilterListState[]>([]);
    const { DatePickerRange } = DatePicker
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);

    const sDate = moment(start).format('YYYY-MM-DD');
    const eDate = moment(end).format('YYYY-MM-DD');
    const [selectedUser, setSelectedUser] = useState();
    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }
    const onDrawerClose = (e: MouseEvent) => {
        setIsOpen(false)
    }
    const tableRef = useRef<DataTableResetHandle>(null);

    const columns: ColumnDef<FlagList>[] = useMemo(
        () => [
            {
                header: 'User',
                accessorKey: 'user',
                cell: (props) => {
                    const row = props.row.original
                    return <FlagColumn row={row} />
                },
            },
            {
                header: 'Project/Event',
                accessorKey: 'projectevent',
            },
            {
                header: 'Task/Event',
                accessorKey: 'taskevent',
                sortable: true,
            },
            {
                header: 'Total Time Logged',
                accessorKey: 'totaltimelogged',

            },
            {
                header: 'Billable Time',
                accessorKey: 'billabletime',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const status = props.row.original.status;
                    const statusColors: { [key: string]: string } = {
                        'Flag': '#EF4444',
                        'Dispute': '#EF4444'
                    };
                    const defaultColor = '#FFC300';
                    const statusColor = statusColors[status] || defaultColor;
                    return (
                        <div>
                            <span style={{
                                display: 'inline-block',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: statusColor,
                                marginRight: '4px'
                            }}></span>
                            <span style={{ color: statusColor, fontWeight: 'bold' }}>{status}</span>
                        </div>
                    );
                },
            },
            {
                header: 'Comment',
                accessorKey: 'comments',
            },
            {
                header: 'Estimated Time ',
                accessorKey: 'estimatedtime',
            },
            {
                header: 'Action',
                id: 'action',
                cell: (props) => {
                    const row = props.row.original
                    return <ItemDropdown projectLogTimeId={row.project_log_time_id} rowId={row.id} projectId={row.project_id} userId={row.user_id} projectTaskId={row.project_task_id} />;
                },
            },
        ],
        []
    )

    const searchInput = useRef(null)

    const filterFlageData = async () => {
        try {
            let userIdValue: string | number = '';
            if (selectedUser !== undefined && selectedUser !== "") {
                userIdValue = typeof selectedUser === 'number' ? selectedUser : Number(selectedUser);
            }
            const response = await apiGetFlageListFilter<LogsFilterListState>(
                userIdValue as number,
                sDate,
                eDate,
            );

            setFilterFlageData(response.data.LogList);
            dispatch(getflaglist());
        } catch (error) {
            console.error('Error fetching project overview data:', error);
        }
    };

    useEffect(() => {
        dispatch(getflaglist());
    }, [])

    useEffect(() => {
        dispatch(getFilterFlagelist());
    }, [])

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = useMemo(() => {
        return ApiflagData.filter((log) =>
            log.user.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [ApiflagData, searchQuery]);

    const handleUserChange = (selectedOption: any) => {
        setSelectedUser(selectedOption.value);
    };

    const [sorting, setSorting] = useState<ColumnSort[]>([])

    const table = useReactTable({
        data: filterFlagData.length === 0 ? filteredData : filterFlagData,
        columns: columns as ColumnDef<any>[],
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }
    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }
    const tableData = (): FlagList[] => {
        const arr: FlagList[] = [];
        for (let i = 0; i < ApiflagData.length; i++) {
            arr.push({
                id: `${i}`,
                user: `${i}`,
                image: `${i}`,
                projectevent: `${i}`,
                taskevent: `${i}`,
                totaltimelogged: i,
                billabletime: `${i}`,
                estimatedtime: i,
                comments: `${i}`,
                status: i,
                reason: `${i}`,
                urgency: `${i}`,
                project_id: i,
                user_id: i,
                project_task_id: i,
                project_log_time_id: i,
                action: `${i}`,
            });
        }
        return arr;
    };
    const totalData = tableData().length
    const pageSizeOption = [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ]

    return (
        <>
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Flag & Dispute List</h3>
                <div className="flex flex-col lg:flex-row lg:items-center">
                    <Input
                        ref={searchInput}
                        className="max-w-md md:w-52 md:mb-0 mb-4"
                        size="sm"
                        placeholder="Search Log"
                        prefix={<HiOutlineSearch className="text-lg" />}
                        onChange={handleSearchChange}
                    />
                    <CSVLink data={[...ApiflagData, ...filteredData]} filename={'FlageList.csv'} className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4" >
                        Export to CSV
                    </CSVLink>
                    <Button size="sm" className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4" onClick={() => openDrawer()} icon={<HiOutlineFilter />}> Filter</Button>
                </div>
            </div>
            <Drawer
                title="Filter"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <div className='container'>
                    <h6 className="text-left pb-2">User</h6>
                    <Select
                        placeholder="Please Select"
                        options={ApiUserData.map(user => ({ value: user.id, label: user.name }))}
                        onChange={handleUserChange}
                    ></Select>
                    <h6 className="text-left mt-4 pb-2">Date</h6>
                    <DatePickerRange
                        dateViewCount={2}
                        placeholder="date view"
                        onChange={(dates) => {
                            setStart(dates[0]);
                            setEnd(dates[1]);
                        }}
                    />
                    <Button onClick={(e) => { filterFlageData(); onDrawerClose(e || undefined); }} style={{ marginTop: "20px", alignItems: "center", backgroundColor: "#7460ee", color: "white" }}>Query</Button> {" "} {" "}
                    <Button style={{ marginTop: "20px", alignItems: "center", backgroundColor: "white", color: "#7460ee" }} onClick={onDrawerClose}>Cancel</Button>
                </div>
            </Drawer>
            {filteredData.length === 0 && filterFlagData.length === 0  ?
                <h4 style={{ color: "gray", textAlign: "center" }}>Data Not Found</h4>
                :
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
            }
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={totalData}
                    onChange={onPaginationChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select
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
                </div>
            </div>
        </>
    )
}

export default DisputeAndFlags




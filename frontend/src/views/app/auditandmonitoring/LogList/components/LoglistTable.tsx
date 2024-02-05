import { useState, useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import EllipsisButton from '@/components/shared/EllipsisButton'
import Drawer from '@/components/ui/Drawer'
import DatePicker from '@/components/ui/DatePicker'
import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import type { MouseEvent } from 'react'
import Input from '@/components/ui/Input'
import Dialog from '@/components/ui/Dialog'
import Select from '@/components/ui/Select'
import moment from 'moment';
import { apiGetComment } from '@/services/Audit';
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
import type {
    DataTableResetHandle,
    OnSortParam,
} from '@/components/shared/DataTable'
import reducer, { useAppSelector } from '../store';
import { injectReducer, useAppDispatch } from '@/store';
import { LogsListState, getLoglist, LogsFilterListState, getFilterLoglist } from '../store/logListSlice';
import Spinner from '@/components/ui/Spinner'
import { apiApplyLogAction, apiAddFlag } from '@/services/Audit'
import { apiGetLogListFilter } from '@/services/WebService';
import { CSVLink } from 'react-csv';
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import type { ColumnDef, ColumnSort } from '@tanstack/react-table'
import { string } from 'yup'
import FormRow from '@/views/app/account/Settings/components/FormRow'
const { Tr, Th, Td, THead, TBody, Sorter } = Table


injectReducer('logListdata', reducer)

type LogType = {
    id: string
    user: string
    emp_id: number
    reason: string
    urgency: string
    comments: string
    return_comments: string
    image: string
    projectevent: string
    taskevent: string
    totaltimelogged: number
    billabletime: string
    estimatedtime: number
    is_flaged: number
    action: string
    project_id: number
    user_id: number
    status: string
    project_task_id: number
}

const LoglistTable = () => {

    const dispatch = useAppDispatch()

    const ApiLogData = useAppSelector(state => state.logListdata.data.loglistData);
    const Loading = useAppSelector((state) => state.logListdata.data.loading);
    const userList = ApiLogData.data[0]?.users;
    const projectList = ApiLogData.data[0]?.projects;
    const ListLogAPIData = ApiLogData.data[0]?.logList.data
    const Logdata = useAppSelector(state => state.logListdata.data.loglistData.LogList);
    const { DatePickerRange } = DatePicker
    const [selectedUser, setSelectedUser] = useState();
    const [selectedProject, setSelectedProject] = useState(null);
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false)
    const sDate = moment(start).format('YYYY-MM-DD');
    const eDate = moment(end).format('YYYY-MM-DD');
    const [filterLogData, setFilterLogData] = useState<LogsFilterListState[]>([]);
    const isFlagedArray = Logdata.map(logItem => logItem?.is_flaged);

    const [sorting, setSorting] = useState<ColumnSort[]>([])



    const openDrawer = () => {
        setIsOpen(true)
    }
    const onDrawerClose = (e: MouseEvent) => {
        setIsOpen(false)
    }
    const tableRef = useRef<DataTableResetHandle>(null)

    const handleUserChange = (selectedOption: any) => {
        setSelectedUser(selectedOption.value);
    };
    const handleProjectChange = (selectedOption: any) => {
        setSelectedProject(selectedOption.value);
    };

    const userId = selectedUser;
    const projectId = selectedProject;

    const ProductColumn = ({ row }: { row: LogType }) => {
        const avatar = row.image ? (
            <Avatar src={row.image} />
        ) : (
            <Avatar icon={<FiPackage />} />
        )

        return (
            <div className="flex items-center img-table">
                {avatar}
                <span className={`ml-2 rtl:mr-2 font text-black`}>{row.user}</span>
            </div>
        )
    }

    const ItemDropdown = ({ Status, empId, rowId, isFlaged, projectId, userId, project_task_Id }: { Status: string, rowId: string; isFlaged: number, projectId: number, userId: number, project_task_Id: number, empId: number }) => {

        const dispatch = useAppDispatch();
        const [dialogIsOpen, setDialogIsOpen] = useState(false);
        const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);
        const [reason, setReason] = useState('');
        const [textareaValue, setTextareaValue] = useState('');
        const [commentData, setCommentData] = useState<[] | null>(null);
        const [hiddenFieldId, setHiddenFieldId] = useState(rowId);
        const [status, setStatus] = useState('');
        const [IsOpen, setIsOpen] = useState(false)

        const [getreason, setGetReason] = useState('');
        const [getSelectedOption, setGetSelectedOption] = useState("");
        const [getDescriptions, setGetDescriptions] = useState('');
        const [getAddComment, setGetAddComment] = useState('');
        const [flagId, setFlagId] = useState("")

        const openDialogs = () => {
            setIsOpen(true)
        }

        const onDialogCloses = (e: MouseEvent) => {
            setIsOpen(false)
        }

        const dropdownList = [
            { label: 'Approve', value: 2, action: 'status', icon: <HiOutlineSwitchHorizontal /> },
            { label: 'Disapprove', value: 5, action: 'status', icon: <HiOutlineCog /> },
        ];
        if (Status === "Pending" || Status === "Approved") {
            dropdownList.push({ label: 'Flag', value: 6, action: 'status', icon: <HiOutlineCog /> });
        }
        else if (Status === "Dispute") {
            dropdownList.push({ label: 'View Dispute', value: 4, action: 'status', icon: <HiOutlineCog /> });
        }

        const Urgency = [
            { value: 'lowurgency', label: 'Low' },
            { value: 'highurgency', label: 'High' },
            { value: 'mediumurgency', label: 'Medium' },
        ];

        const openDialog = (status: string) => {
            setDialogIsOpen(true);
            setStatus(status);
        };
        const onDialogClose = () => {
            setDialogIsOpen(false);
        };

        const handleSubmit = async (event: React.FormEvent) => {
            event.preventDefault();
            try {
                // let statusValue;
                // if (status === 'Dispute') {
                //     statusValue = 4;
                // } else {
                //     statusValue = 6;
                // }
                const response = await apiAddFlag({
                    project_log_time_id: rowId,
                    comments: textareaValue,
                    reason: reason,
                    urgency: selectedOption?.value,
                    status: 6,
                    created_by: empId,
                    user_id: empId,
                    project_id: projectId,
                    project_task_id: project_task_Id,
                });
                onDialogClose();
                setReason("");
                setTextareaValue("");
                dispatch(getLoglist());
                dispatch(getFilterLoglist());
                setSelectedOption(null);
            } catch (error) {
                console.error('Error submitting form:');
            }
        };

        const getCommentApi = async () => {
            try {
                const response = await apiGetComment({
                    project_log_time_id: rowId,
                });
                const newCommentData = response?.data;
                setCommentData((newCommentData as any)?.data);
            } catch (error) {
                console.error('Error submitting form:');
            }
        };

        useEffect(() => {
            if (commentData && commentData.length > 0) {
                const {
                    reason,
                    urgency,
                    comments,
                    id,
                    return_comments,
                }: {
                    reason?: string;
                    urgency?: string;
                    comments?: string;
                    id?: string;
                    return_comments?: string;
                } = commentData[0] || {};

                setFlagId(id || '');
                setGetReason(reason || '');
                setGetSelectedOption(urgency || '');
                setGetDescriptions(comments || '');
                setGetAddComment(return_comments || '');
            }
        }, [commentData]);


        return (
            <div>
                <Dialog
                    isOpen={IsOpen}
                    onClose={onDialogCloses}
                    onRequestClose={onDialogCloses}
                >
                    <h5 className="mb-4">View Dispute</h5>
                    <div className="">
                        <div className="mb-4">
                            <Input
                                placeholder="Reason"
                                value={getreason}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <Input
                            placeholder="Urgency"
                            value={getSelectedOption}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            textArea
                            placeholder="Descriptions"
                            value={getDescriptions}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            textArea
                            placeholder="Dispute Comment"
                            value={getAddComment}
                        />
                    </div>

                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={onDialogCloses}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={onDialogCloses} >
                            Okay
                        </Button>
                    </div>
                </Dialog>

                <Dialog
                    isOpen={dialogIsOpen}
                    shouldCloseOnOverlayClick={false}
                    shouldCloseOnEsc={false}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                    className="custom-dialog"
                >
                    <div className="p-8">
                        <h5 className="mb-6 text-xl font-semibold">Add Flag </h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Input
                                    placeholder="Reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <Select
                                    placeholder="Urgency"
                                    options={Urgency}
                                    onChange={(selectedOption) => setSelectedOption(selectedOption)}
                                    value={selectedOption}
                                />
                            </div>
                            <div className="">
                                <Input
                                    placeholder="Description"
                                    textArea
                                    value={textareaValue}
                                    onChange={(e) => setTextareaValue(e.target.value)}
                                />
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
                                    Add Flag
                                </Button>
                            </div>
                        </form>
                    </div>
                </Dialog>
                <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
                    {dropdownList.map((item) => (
                        <Dropdown.Item key={item.value} onClick={async () => {
                            if (item.value === 6) {
                                openDialog('Dispute');
                            }
                            else if (item.value === 4) {
                                openDialogs();
                                getCommentApi();
                            }
                            else {
                                await apiApplyLogAction({ action: item.action, value: item.value, id: rowId });
                                dispatch(getFilterLoglist());
                                dispatch(getLoglist());
                            }
                        }}>
                            <span className="text-lg">{item.icon}</span>
                            <span className="ml-2 rtl:mr-2">{item.label}</span>
                        </Dropdown.Item>
                    ))}
                </Dropdown>

            </div>
        );
    };
    const columns: ColumnDef<LogType>[] = useMemo(
        () => [
            {
                header: 'User',
                accessorKey: 'user',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
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
                header: 'Time Logged',
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
                        "Approved": '#10B981',
                        'Flag': '#EF4444',
                        'Dispute': '#EF4444',
                        'Disapproved': '#EF4444'
                    };
                    const defaultColor = '#F59E0B';
                    const statusColor = statusColors[status] || defaultColor;
                    return (
                        <div className='dot-td'>
                            <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: statusColor, marginRight: '6px' }}></span>
                            <span style={{ color: statusColor, fontWeight: 'bold' }}>{status}</span>
                        </div>
                    );
                },
            },
            {
                header: 'Estimated Time ',
                accessorKey: 'estimatedtime',
            },
            {
                header: 'Action',
                id: 'action',
                cell: (props) => {
                    const row = props.row.original;
                    return <ItemDropdown Status={row.status} empId={row.emp_id} rowId={row.id} isFlaged={row.is_flaged} projectId={row.project_id} userId={row.user_id} project_task_Id={row.project_task_id} />;

                },
            },
        ],
        []
    )

    const searchInput = useRef(null)

    // const filterData = async () => {
    //     try {
    //         if (userId !== undefined && projectId !== null && sDate !== undefined && eDate !== undefined) {
    //             const response = await apiGetLogListFilter<LogsFilterListState>(
    //                 userId,
    //                 projectId,
    //                 sDate,
    //                 eDate,
    //             );
    //             setFilterLogData(response.data.LogList);
    //         } 
    //     } catch (error) {
    //         console.error('Error fetching project overview data:');
    //     }
    // };

    const filterData = async () => {
        try {
            const filteredUserId = userId !== undefined ? userId : "";
            const filteredProjectId = projectId !== null ? projectId : "";
            const filteredSDate = sDate !== undefined ? sDate : "";
            const filteredEDate = eDate !== undefined ? eDate : "";

            if ((sDate === undefined || sDate === null) && (eDate === undefined || eDate === null)) {
                console.log('Both sDate and eDate not selected');
            }
            const response = await apiGetLogListFilter<LogsFilterListState>(
                filteredUserId,
                filteredProjectId,
                filteredSDate,
                filteredEDate,
            );
            setFilterLogData(response.data.LogList);
        } catch (error) {
            console.error('Error fetching project overview data:');
        }
    };

    useEffect(() => {
        dispatch(getLoglist());
    }, [dispatch])

    useEffect(() => {
        dispatch(getFilterLoglist());
    }, [dispatch])

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = useMemo(() => {
        return Logdata.filter((log) =>
            log.user.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [Logdata, searchQuery]);

    const table = useReactTable({
        data: filterLogData && filterLogData.length === 0 ? filteredData : filterLogData,
        columns: columns as ColumnDef<any>[],
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })
    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }
    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }
    const tableData = (): LogType[] => {
        const arr: LogType[] = [];
        for (let i = 0; i < filteredData.length; i++) {
            arr.push({
                id: `${i}`,
                emp_id: i,
                user: `${i}`,
                image: `${i}`,
                projectevent: `${i}`,
                taskevent: `${i}`,
                totaltimelogged: i,
                billabletime: `${i}`,
                estimatedtime: i,
                status: `${i}`,
                reason: `${i}`,
                urgency: `${i}`,
                comments: `${i}`,
                return_comments: `${i}`,
                project_id: i,
                user_id: i,
                project_task_id: i,
                is_flaged: i,
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
            {Loading ? (
                <div className="center-spinner">
                    <Spinner size={40} />
                </div>
            ) : (
                <div className='table-noscrool'>
                    <div className="lg:flex items-center justify-between mb-4">
                        <h3 className="mb-4 lg:mb-0">Log List</h3>
                        <div className="flex flex-col lg:flex-row lg:items-center log-list-search">
                            <Input
                                ref={searchInput}
                                className="max-w-md md:w-52 md:mb-0 m-0"
                                size="sm"
                                placeholder="Search Log"
                                prefix={<HiOutlineSearch className="text-lg" />}
                                onChange={handleSearchChange}
                            />
                            <CSVLink data={[...Logdata, ...filterLogData]} filename={'LogList.csv'} className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4" >
                                Export to CSV
                            </CSVLink>
                            <Button size="sm" onClick={() => openDrawer()} icon={<HiOutlineFilter />} className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4">Filter</Button>
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
                                options={userList && Array.isArray(userList) ? userList.map(user => ({
                                    value: user.user_id,
                                     label: user.name
                                })) : []}
                                onChange={handleUserChange}
                            ></Select>
                            <h6 className="text-left mt-4 pb-2">Project</h6>
                            <Select
                                placeholder="Please Select"
                                options={projectList && Array.isArray(projectList) ? projectList.map(project => ({ value: project.id, label: project.project_name })) : []}
                                onChange={handleProjectChange}
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
                            <Button onClick={(e) => { filterData(); onDrawerClose(e || undefined); }} style={{ marginTop: "20px", alignItems: "center", backgroundColor: "#7460ee", color: "white" }}>Query</Button> {" "} {" "}
                            <Button style={{ marginTop: "20px", alignItems: "center", backgroundColor: "white", color: "#7460ee" }} onClick={onDrawerClose}>Cancel</Button>
                        </div>
                    </Drawer>
                    {filteredData.length === 0 && filterLogData.length === 0 ?
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
                </div>
            )}
        </>
    )
}

export default LoglistTable

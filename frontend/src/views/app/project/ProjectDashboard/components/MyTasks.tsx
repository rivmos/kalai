import { useMemo } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import { useNavigate } from 'react-router-dom'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import ActionLink from '@/components/shared/ActionLink'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table'
import { Avatar } from '@/components/ui'
import { DashboardTask } from '../store'


type MyTasksProps = {
    data?: DashboardTask[]
}

const { Tr, Th, Td, THead, TBody } = Table

const PriorityTag = ({ priority }: { priority: number }) => {
    switch (priority) {
        case 3:
            return (
                <Tag className="text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 rounded border-0">
                    High
                </Tag>
            )
        case 2:
            return (
                <Tag className="text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20 rounded border-0">
                    Medium
                </Tag>
            )
        case 1:
            return (
                <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 rounded border-0">
                    Low
                </Tag>
            )
        case 0:
            return (
                <Tag className="bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-blue-100 rounded border-0">
                    None
                </Tag>
            )
        default:
            return null
    }
}

const MyTasks = ({ data = [] }: MyTasksProps) => {
    const navigate = useNavigate()
    const columns: ColumnDef<DashboardTask>[] = useMemo(
        () => [
            // {
            //     header: 'Task ID',
            //     accessorKey: 'taskId',
            //     cell: (props) => {
            //         const { id } = props.row.original
            //         return (
            //             <ActionLink
            //                 themeColor={false}
            //                 className="font-semibold"
            //                 to="/app/project/scrum-board"
            //             >
            //                 {id}
            //             </ActionLink>
            //         )
            //     },
            // },
            {
                header: 'Title',
                accessorKey: 'title',
                cell: (props) => {
                    const { title } = props.row.original
                    return <span>{title}</span>
                },
            },
            {
                header: 'Priority',
                accessorKey: 'priority',
                cell: (props) => {
                    const { priority } = props.row.original
                    return <PriorityTag priority={priority} />
                },
            },
            {
                header: 'Assignees',
                accessorKey: 'Assignees',
                cell: (props) => {
                    const { user } = props.row.original
                    return (
                        <div className='flex items-center gap-2'>
                            <Avatar src={user.image} size={28} shape='circle' />
                            <span>{user.name}</span>
                        </div>
                    )
                },
            },
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const onViewAllTask = () => {
        navigate('/app/projects/allprojects')
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h4>Active Tasks</h4>
                <Button size="sm" onClick={onViewAllTask}>
                    View All
                </Button>
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

export default MyTasks

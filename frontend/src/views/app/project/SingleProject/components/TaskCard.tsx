import { SyntheticEvent, useState } from 'react';
import { Badge, Button, Card, Dropdown } from '@/components/ui'
import { FaTasks } from 'react-icons/fa'
import { TaskState } from '@/@types/project'
import Avatar from '@/components/ui/Avatar/Avatar';
import acronym from '@/utils/acronym';
import { COLORS } from '@/constants/chart.constant';
import TaskForm from './TaskForm';
import { IoIosEye } from "react-icons/io";
import { useAppSelector } from '../store'
import AssignedUserAvatar from './AssignedUserAvatar';
import { IoEyeOutline } from "react-icons/io5";
import shortenText from '@/utils/shortenText';

const TaskCard = (props: { task: TaskState, index: number }) => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const { task, index } = props

    return (
        <Card bordered>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2 w-52'>
                    <div className='flex items-center bg-amber-400 p-2 rounded-full text-white'>
                        <FaTasks />
                    </div>
                    <div className='flex flex-col'>
                    <span className='flex items-center gap-2 font-semibold capitalize'>
                        {task?.title && shortenText(task?.title)}
                    </span>
                    <label className='text-xs'>{task?.description && shortenText(task?.description)}</label>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <span className='font-semibold'>Delivery:</span>
                    <span>
                        {task.estimatedTime} Hrs
                    </span>
                </div>

                <div className='flex items-center gap-2'>
                        <span>
                        Assigned To :
                        </span>
                        {task.assignedUser ? <AssignedUserAvatar showAvatar userId={task.assignedUser} /> : <span>No One</span>}

                </div>

                <div className='border-[1px] rounded-bl-3xl rounded-tr-3xl flex items-center px-12 gap-2'>
                    <Badge
                        badgeStyle={{
                            backgroundColor: COLORS[task.status === 0 ? 2 : 4],
                        }}
                    />
                    {task.status === 1 ? 'To Do' : 'In Progress'}
                </div>

                <div className='flex items-center'>
                    <Button variant="default" className='relative !p-2 border-0' onClick={() => setIsOpen(true)} ><IoEyeOutline className='text-xl' /></Button>
                </div>
                <TaskForm dialogIsOpen={dialogIsOpen} setIsOpen={setIsOpen} task={task} />
            </div>
        </Card>
    )
}



export default TaskCard
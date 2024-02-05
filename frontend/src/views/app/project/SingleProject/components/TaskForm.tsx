import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { Dispatch, MouseEvent, SetStateAction, SyntheticEvent } from 'react'
import { Field, Formik, Form } from 'formik'
import { Avatar, Dropdown, FormItem, Input, Segment, Tabs, TimeInput } from '@/components/ui'
import { SegmentItemOption } from '@/components/shared'
import dayjs from 'dayjs'
import { TaskState } from '@/@types/project'
import { addTask, updateTask, useAppSelector } from '../store'
import { apiAddTask, apiTaskUpdate } from '@/services/ProjectService'
import { useAppDispatch } from '../store'
import classNames from 'classnames'
import { useConfig } from '@/components/ui/ConfigProvider'
import AssignedUserAvatar from './AssignedUserAvatar'

const formatDate = (date: Date | null) => {
    return dayjs(date).format('YYYY-MM-DD')
}

export type LocalTaskState = {
    title: string,
    description: string,
    estimatedTime: string,
    priority: number,
    assignedUser: number | ''
}

type EditTaskState = {
    id:number,
    title: string,
    description: string,
    estimatedTime: string,
    priority: number,
    assignedUser: number | ''
}

type AddNewTaskState = {
    title: string,
    description: string,
    estimatedTime: string,
    priority: number,
    assignedUser: number | ''
    projectId: number
    projectTaskListId: number
}

function convertDecimalToTime(decimalHours: number): { taskHours: number, taskMinutes: number } {
    const taskHours = Math.floor(decimalHours);
    const taskMinutes = Math.round((decimalHours - taskHours) * 60);

    return { taskHours, taskMinutes };
}


const TaskForm = ({ dialogIsOpen, setIsOpen, task }: { dialogIsOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, task?: TaskState}) => {
    const priorityOptions = [0, 1, 2, 3]
    const [isSubmitting, setSubmitting] = useState(false)

    const [newTask, setNewTask] = useState<LocalTaskState>({ title: task?.id ? task?.title : '', description: task?.id ? task?.description : '', priority: task?.id ? task?.priority : 0, estimatedTime: '', assignedUser: task?.id ? Number(task?.assignedUser) : '' })
    
    const { taskHours, taskMinutes } = convertDecimalToTime(task?.estimatedTime as number)

    const [duration, setDuration] = useState({ hours: task?.id ? taskHours : 0, minutes:  task?.id ? taskMinutes : 0})

    const [isEditing, setIsEditing] = useState(task?.id ? false : true)

    const projectPodjinn = useAppSelector(state => state.project.data.projectOverview.podjinn)
    const projectJinns = useAppSelector(state => state.project.data.projectOverview.jinns)
    const projectId = useAppSelector(state => state.project.data.projectOverview.id)
    const projectTaskListId = useAppSelector(state => state.project.data.projectOverview.projectTaskList[0].id)

    const [selectedUser, setSelectedUser] = useState<{ id: number, name: string, image: string }>()

    const dispatch = useAppDispatch()

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setDuration({ ...duration, hours: isNaN(value) ? 0 : value });
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value, 10);

        // Ensure that the value is between 0 and 59
        value = isNaN(value) ? 0 : Math.min(Math.max(0, value), 59);
        setDuration({ ...duration, minutes: value });
    };

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const onDropdownClick = (e: SyntheticEvent) => {
        console.log('Dropdown Clicked', e)
    }

    const taskUpdate = async (data: EditTaskState) => {
        const res = await apiTaskUpdate<{ status: boolean, message: string, data: TaskState }, EditTaskState>(data)
        return res.data
    }

    const addNewTask = async (data: AddNewTaskState ) => {
        const res = await apiAddTask<{ status: boolean, message: string, data: TaskState }, AddNewTaskState>(data)
        return res.data
    }


    const handleTaskEdit = async () => {
        setSubmitting(true)
        const formattedTask = { ...newTask, estimatedTime: String(duration.hours + Number((duration.minutes / 60).toFixed(2))) }
        const success = task?.id ? await taskUpdate({...formattedTask, id:task?.id}) : await addNewTask({...formattedTask, projectId:projectId, projectTaskListId:projectTaskListId})
        if (success.data) {
            task?.id ? dispatch(updateTask(success.data)) : dispatch(addTask(success.data))
            setIsOpen(false)
            setSubmitting(false)
            setNewTask({ title: '', description: '', priority: 0, estimatedTime: '', assignedUser: '' })
        }
        else{
            setSubmitting(false)
            setNewTask({ title: '', description: '', priority: 0, estimatedTime: '', assignedUser: '' })
        }
    }


    const {themeColor, primaryColorLevel} = useConfig()

    return (
        <Dialog
            isOpen={dialogIsOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            bodyOpenClassName="overflow-hidden"
        >

            <div>
                <h4 className='mb-4'>Task Details</h4>
                <Formik onSubmit={(values) => {  }} initialValues={{ title: '', description: '', priority: '', estimatedTime: 0 }}>
                    <Form>
                        <FormItem asterisk label='Title'>
                            <Field readOnly={!isEditing} id="title" name="title" placeholder="Enter Title" className="rounded-lg border-[1px] border-gray-200" component={Input} value={newTask.title} onChange={(e: any) => setNewTask({ ...newTask, title: e.target.value })} />
                        </FormItem>
                        <FormItem asterisk label='Desciption'>
                            <Field readOnly={!isEditing} id="description" name="description" textArea placeholder="Enter Description" className="rounded-lg border-[1px] border-gray-200" component={Input} value={newTask.description} onChange={(e: any) => setNewTask({ ...newTask, description: e.target.value })} />
                        </FormItem>

                        <FormItem asterisk label='Estimated Time'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label>Hours:</label>
                                    <input readOnly={!isEditing} className='rounded-lg w-56 border-[1px] border-gray-200' value={duration.hours} onChange={handleHoursChange} />
                                </div>

                                <div>
                                    <label>Minutes:</label>
                                    <input readOnly={!isEditing} className='rounded-lg w-56 border-[1px] border-gray-200' value={duration.minutes} onChange={handleMinutesChange} />
                                </div>
                            </div>

                            <div>
                                <label>Selected Duration: {duration.hours} hours and {duration.minutes} minutes</label>
                            </div>
                        </FormItem>

                        <FormItem asterisk label='Assign Jinn'>

                            {(projectPodjinn?.length !== 0 && projectJinns?.length !== 0) ? <Dropdown disabled={!isEditing} menuClass='w-96' title={newTask.assignedUser ? [...projectJinns, ...projectPodjinn].find(user => user.id === newTask.assignedUser)?.name : "Select User"} onClick={onDropdownClick}>
                                <div className='grid grid-cols-2 gap-4 p-1 w-full'>
                                    {[...projectJinns, ...projectPodjinn].map((item) => (
                                        <Dropdown.Item
                                            key={item.id}
                                            eventKey={item.name}
                                            className={classNames({'bg-indigo-100':item.id === newTask.assignedUser})}
                                            onSelect={() => { setNewTask({ ...newTask, assignedUser: item.id }); }}
                                        >
                                            <Avatar src={item.image} shape='circle' size={28} />
                                            <span className='capitalize'>{item.name}</span>                                            
                                        </Dropdown.Item>
                                    ))}
                                </div>
                            </Dropdown> : <div className='px-2'>No Pod Assigned</div>}
                        </FormItem>


                        <FormItem asterisk label='Priority'>
                            <div className='flex gap-4'>
                            {
                                priorityOptions.map(priority => {
                                    const priorityName = priority === 0 ? 'None' : priority === 1 ? 'Low' : priority === 2 ? 'Medium' : 'High'
                                    return (
                                        <div key={priority} className='flex items-center gap-1'>
                                            <input className='hidden' id={priorityName} checked={priority === newTask.priority} value={priority} onChange={e => {if(isEditing){setNewTask({...newTask, priority:Number(e.target.value)});}}} type='radio' name='priority'/>
                                            <label className={classNames('w-20 flex justify-center items-center p-4 rounded-3xl cursor-pointer border-2', {[`bg-${themeColor}-${primaryColorLevel-400} text-white`]: priority === newTask.priority})} htmlFor={priorityName}>{priorityName}</label>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </FormItem>

                    </Form>
                </Formik>
            </div>
            <div className="text-right mt-6">
                <Button
                    className="ltr:mr-2 rtl:ml-2"
                    variant="plain"
                    onClick={onDialogClose}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>

                {task?.id && <Button loading={isSubmitting} type='submit' variant="solid" onClick={() => {isEditing ? handleTaskEdit() : setIsEditing(true)}}>
                    {isEditing ? 'Save' : 'Edit'}
                </Button>}

                {!task?.id && <Button loading={isSubmitting} type='submit' variant="solid" onClick={() => {handleTaskEdit()}}>
                    Add Task
                </Button>}
            </div>
        </Dialog>
    )
}

export default TaskForm
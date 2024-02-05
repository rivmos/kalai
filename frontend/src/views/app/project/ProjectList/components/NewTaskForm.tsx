import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { Dispatch, MouseEvent, SetStateAction } from 'react'
import { Field, Formik, Form } from 'formik'
import { Card, FormItem, Input, Segment, Tabs } from '@/components/ui'
import { CreateProjectState } from './CreateProject'
import { TaskState } from '@/@types/project'
import { SegmentItemOption } from '@/components/shared'
import dayjs from 'dayjs'
import { getRecommendedTasks, useAppDispatch, useAppSelector } from '../store'
import classNames from 'classnames'
import { CiClock2 } from "react-icons/ci";


const { TabNav, TabContent, TabList } = Tabs

const formatDate = (date: Date | null) => {
    return dayjs(date).format('YYYY-MM-DD')
}

export type LocalTaskState = {
    title: string,
    description: string,
    estimatedTime: string,
    priority: number,
}

const NewTaskForm = ({ dialogIsOpen, setIsOpen, userSelection, setUserSelection, handleDeleteTask }: { dialogIsOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, userSelection: CreateProjectState, setUserSelection: Dispatch<SetStateAction<CreateProjectState>>, handleDeleteTask: (taskTitle: string) => void }) => {
    const dispatch = useAppDispatch()

    const recommendedTasks = useAppSelector(state => state.projectList.data.recommendedTasks)
    const podjinnsByService = useAppSelector(state => state.projectList.data.podjinnsByService)
    const priorityOptions = [0, 1, 2, 3]
    const [showCustomForm, setShowCustomForm] = useState(false)
    const [currentTab, setCurrentTab] = useState('tab1')

    const [newTask, setNewTask] = useState<LocalTaskState>({ title: '', description: '', priority: 0, estimatedTime: '' })

    const [duration, setDuration] = useState({ hours: 0, minutes: 0 })

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

    const handleTaskSave = () => {
        const formattedTask = { ...newTask, estimatedTime: duration.hours + Number((duration.minutes / 60).toFixed(2)) }
        setUserSelection({ ...userSelection, taskList: [...userSelection.taskList, { ...formattedTask }] })
        setNewTask({ title: '', description: '', priority: 0, estimatedTime: '' })
        setDuration({ hours: 0, minutes: 0 })
        setIsOpen(false)
    }

    useEffect(() => {
        dispatch(getRecommendedTasks({ selectedService: userSelection.selectedService, selectedSpecificService: userSelection.selectedSpecificService, selectedTechnology: userSelection.selectedTechnology }))
    }, [])

    return (
        <Dialog
            isOpen={dialogIsOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            bodyOpenClassName="overflow-hidden"
            width={currentTab === 'tab1' ? 1000 : 500}
        >
            <Tabs defaultValue="tab1" value={currentTab} onChange={(val) => setCurrentTab(val)} variant="pill" className='overflow-y-auto h-[800px]'>
                <TabList>
                    <TabNav value="tab1">Pick Task</TabNav>
                    {showCustomForm && <TabNav value="tab2">Custom Task</TabNav>}
                </TabList>
                <div className="p-4">
                    <TabContent value="tab1">
                        <div className='grid grid-cols-2 gap-2 relative mb-8'>
                            {
                                recommendedTasks.map((task) => {
                                    const isSelected = userSelection.taskList.flatMap(task => task.title).includes(task.title)
                                    const addTask = () => setUserSelection({ ...userSelection, taskList: [...userSelection.taskList, { title: task.title, estimatedTime: Number(task.estimatedTime), priority: 0, description: '' }] })
                                    return (
                                        <Card key={task.id} className={classNames({ 'bg-slate-200': isSelected })}>
                                            <div className={classNames('flex justify-between items-center')}>
                                                <div className='flex flex-col'>
                                                <span>
                                                    {task.title}
                                                </span>
                                                <span className='flex items-center gap-2'>
                                                    <CiClock2 /> {task.estimatedTime} Hrs
                                                </span>
                                                </div>
                                                {!isSelected ? <Button variant='plain' onClick={addTask}>+</Button>
                                                    : <Button variant='plain' onClick={() => handleDeleteTask(task.title)}>-</Button>}
                                            </div>
                                        </Card>
                                    )
                                })
                            }
                        </div>

                        {!showCustomForm && <div className="absolute bottom-4 right-4 ">
                            <Button variant="twoTone" onClick={() => { setShowCustomForm(true); setCurrentTab('tab2') }}>
                                Add Custom Task?
                            </Button>
                        </div>}
                    </TabContent>
                    <TabContent value="tab2">
                        <h4 className='mb-4'>Task Details</h4>
                        <Formik onSubmit={(values) => { console.log(values) }} initialValues={{ title: '', description: '', priority: '', estimatedTime: 0 }}>
                            <Form>
                                <FormItem asterisk label='Title'>
                                    <Field id="title" name="title" placeholder="Enter Title" className="rounded-lg border-[1px] border-gray-200" component={Input} value={newTask.title} onChange={(e: any) => setNewTask({ ...newTask, title: e.target.value })} />
                                </FormItem>
                                <FormItem asterisk label='Desciption'>
                                    <Field id="description" name="description" textArea placeholder="Enter Description" className="rounded-lg border-[1px] border-gray-200" component={Input} value={newTask.description} onChange={(e: any) => setNewTask({ ...newTask, description: e.target.value })} />
                                </FormItem>

                                <FormItem asterisk label='Estimated Time'>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <label>Hours:</label>
                                            <input className='rounded-lg border-[1px] w-52 border-gray-200' value={duration.hours} onChange={handleHoursChange} />
                                        </div>

                                        <div>
                                            <label>Minutes:</label>
                                            <input className='rounded-lg border-[1px] w-52 border-gray-200' value={duration.minutes} onChange={handleMinutesChange} />
                                        </div>
                                    </div>

                                    <div>
                                        <label>Selected Duration: {duration.hours} hours and {duration.minutes} minutes</label>
                                    </div>
                                </FormItem>


                                <FormItem asterisk label='Priority'>
                                    <Segment
                                        className="w-full"
                                        onChange={(value) => setNewTask({ ...newTask, priority: Number(value[0]) })}
                                    >
                                        <div className="grid grid-cols-3 gap-4 w-full">
                                            {priorityOptions.map((priority) => (
                                                <Segment.Item key={priority} value={String(priority)}>
                                                    {({ active, onSegmentItemClick, disabled }) => {
                                                        return (
                                                            <div className="text-center">
                                                                <SegmentItemOption
                                                                    hoverable
                                                                    active={active}
                                                                    disabled={disabled}
                                                                    defaultGutter={false}
                                                                    className="relative min-h-[80px] w-full p-4"
                                                                    onSegmentItemClick={
                                                                        onSegmentItemClick
                                                                    }
                                                                >
                                                                    {priority === 0 ? 'None' : priority === 1 ? 'Low' : priority === 2 ? 'Medium' : 'High'}
                                                                </SegmentItemOption>
                                                            </div>
                                                        )
                                                    }}
                                                </Segment.Item>
                                            ))}
                                        </div>
                                    </Segment>
                                </FormItem>
                            </Form>
                        </Formik>
                        <div className="text-right mt-6">
                            <Button
                                className="ltr:mr-2 rtl:ml-2"
                                variant="plain"
                                onClick={onDialogClose}
                            >
                                Cancel
                            </Button>
                            <Button type='submit' variant="solid" onClick={handleTaskSave}>
                                Save
                            </Button>
                        </div>
                    </TabContent>
                </div>
            </Tabs>
        </Dialog>
    )
}

export default NewTaskForm
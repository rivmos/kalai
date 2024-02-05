import React, { useEffect, useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch, getProjectOverview, getPodList, getPodjinnsByService, getJinnsByService, getProjectActivity } from './store'
import { injectReducer } from '@/store'
import reducer from './store'
import Statistic from './components/Statistic'
import InfoPanel from './components/InfoPanel'
import TaskChart from './components/TaskChart'
import ProjectPod from './components/ProjectPod'
import { Loading, UsersAvatarGroup } from '@/components/shared'
import ActionBar from './components/ActionBar'
import TaskCard from './components/TaskCard'
import DocActionBar from './components/DocActionBar'
import DocList from './components/DocList'
import Activities from '../ProjectDashboard/components/Activities'
import { TaskState } from '@/@types/project'
import { Button } from '@/components/ui'
import { HiOutlineCog, HiOutlinePlusCircle, HiOutlineUserAdd } from 'react-icons/hi'
import EditTask from './components/TaskForm'
import AssignPod from './components/AssignPod'
import AddPeople from './components/AddPeople'
import LeadOverview from './components/LeadOverview/LeadOverview'
import Risk from './components/Risk/Risk'
import ViewPod from './components/ViewPod'
import { IoEyeOutline } from 'react-icons/io5'

injectReducer('project', reducer)

const { TabNav, TabList, TabContent } = Tabs

const Project = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false)
    const [openAssignPodDialog, setOpenAssignPodDialog] = useState<boolean>(false)
    const [isViewOpen, setIsViewOpen] = useState<boolean>(false)
    const [addPeopleOpen, setAddPeopleOpen] = useState<boolean>(false)
    const loading = useAppSelector(state => state.project.data.loading)
    const project = useAppSelector(state => state.project.data.project)
    const userId = useAppSelector(state => state.auth.user.id)
    const projectOverview = useAppSelector(state => state.project.data.projectOverview)
    const projectActivity = useAppSelector(state => state.project.data.projectActivity)

    const billableTime = projectOverview.projectTasks.filter(task => task.isbilled === 1)
    const completedTasks = projectOverview.projectTasks.filter(task => task.status === 1).length
    const inCompleteTasks = projectOverview.projectTasks.length - completedTasks
    const serviceId = projectOverview.serviceId

    const taskChartData = {
        labels: ['Backlog', 'In Progress', 'At Risk', 'Complete'],
        data: [0, inCompleteTasks, 0, completedTasks]
    }

    useEffect(() => {
        dispatch(getProjectOverview(Number(id)))
        dispatch(getProjectActivity(Number(id)))
        // dispatch(getProjectActivity(Number(id)))
    }, [])

    useEffect(() => {
        dispatch(getPodList(serviceId))
        dispatch(getPodjinnsByService(serviceId))
        dispatch(getJinnsByService(serviceId))
    }, [serviceId])


    return (
        <div>
            <Tabs defaultValue="tab1" variant="pill" className='mt-4'>
                <div className="pb-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h3>{projectOverview.title}</h3>
                            <p className="mb-1">{projectOverview.description}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <UsersAvatarGroup users={[...projectOverview.podjinn, ...projectOverview.jinns].map(user => { return { name: user.name, img: user.image } })} />
                            {projectOverview.podjinn.length != 0 && <Button
                                size="sm"
                                icon={<IoEyeOutline />}
                                onClick={() => setIsViewOpen(true)}
                            />}
                        </div>
                    </div>
                    {/* <div className="flex flex-col mb-2 lg:flex-row justify-between lg:items-center gap-4"> */}
                    <div className="flex justify-between items-center gap-2">
                        <TabList className='lg:flex items-center justify-between gap-3'>
                            <div className='flex'>
                                <TabNav value="tab1">Overview</TabNav>
                                <TabNav value="tab2">Lead Overview</TabNav>
                                <TabNav value="tab3">{projectOverview.projectMilestones ? 'Milestones' : 'Tasks'}</TabNav>
                                <TabNav value="tab4">Document Center</TabNav>
                                <TabNav value="tab5">Risk</TabNav>
                                <TabNav value="tab6">DjinnHub</TabNav>
                            </div>
                            {/* <div className="flex flex-col lg:flex-row lg:items-center gap-3 text-base p-2 border-[1px] rounded-lg">
                                    {`${project.startDate} - ${project.endDate}`}
                                </div> */}
                        </TabList>
                        <div className='flex items-center gap-2'>
                            {
                                projectOverview.podjinn.length === 0 ? <Button
                                    size="sm"
                                    icon={<HiOutlineUserAdd />}
                                    onClick={() => setOpenAssignPodDialog(true)}
                                >Assign Pod</Button>

                                    :
                                    <Button
                                        size="sm"
                                        icon={<HiOutlineUserAdd />}
                                        onClick={() => setAddPeopleOpen(true)}
                                    >Assign People</Button>
                            }
                            <Button
                                size="sm"
                                icon={<HiOutlineCog />}
                            // onClick={() =>
                            //     navigate('/app/account/settings/profile')
                            // }
                            />

                        </div>
                    </div>
                    {/* </div> */}
                </div>
                <div className="py-4 mt-2">
                    <Loading loading={loading}>
                        <AssignPod setIsOpen={setOpenAssignPodDialog} dialogIsOpen={openAssignPodDialog} />
                        <ViewPod setIsViewOpen={setIsViewOpen} isViewOpen={isViewOpen} />
                        <AddPeople setIsOpen={setAddPeopleOpen} dialogIsOpen={addPeopleOpen} />
                        <TabContent value="tab1" className='space-y-4'>

                            <div className='first-tab-fur'>
                                <Statistic projectAmount={projectOverview.totalAmount} estimatedTime={projectOverview.estimatedTime} billableTime={0} serviceName={projectOverview.serviceName} specificServiceName={projectOverview.specificServiceName} technologyName={projectOverview.technologyName} />
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                                <Activities className='col-span-2' data={projectActivity?.slice(0, 6)} />
                                <TaskChart data={taskChartData} className='col-span-1' />
                            </div>
                            {/* <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                                <ProjectPod className='col-span-1' />
                            </div> */}
                        </TabContent>
                        <TabContent value="tab2">
                            <LeadOverview />
                        </TabContent>
                        <TabContent value="tab3">
                            <ActionBar />
                            {projectOverview.projectMilestones ? <div className='space-y-4'>
                                {
                                    projectOverview.projectMilestones.map((milestone, index) => {
                                        return (
                                            <div key={index}>
                                                <h6>
                                                    {milestone?.name}
                                                </h6>
                                                <div className='space-y-4'>
                                                    {
                                                        milestone.tasks.map((task, index) => {
                                                            const taskDetails = projectOverview.projectTasks.find(projectTask => projectTask.id === task.id) as TaskState
                                                            return (
                                                                <TaskCard key={task.id} task={taskDetails} index={index} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div> :
                                <div className='space-y-4'>
                                    {
                                        projectOverview?.projectTasks?.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)
                                    }
                                </div>}

                            <div className='flex justify-center mt-8'>
                                <Button
                                    size="sm"
                                    variant="twoTone"
                                    icon={<HiOutlinePlusCircle />}
                                    onClick={() => { projectOverview.projectMilestones ? 'Create Milestone' : setIsAddTaskOpen(true) }}
                                >
                                    {projectOverview.projectMilestones ? 'Create Milestone' : 'Add Task'}
                                </Button>
                            </div>

                            <EditTask dialogIsOpen={isAddTaskOpen} setIsOpen={setIsAddTaskOpen} />
                        </TabContent>
                        <TabContent value="tab4">
                            <DocActionBar />
                            <DocList />
                        </TabContent>
                        <TabContent value="tab5">
                            <Risk />
                        </TabContent>
                        <TabContent value="tab6">
                            <p>
                                DjinnHub
                            </p>
                        </TabContent>
                    </Loading>
                </div>
            </Tabs>
        </div>
    )
}

export default Project

import React, { useEffect } from 'react'
import { Loading } from '@/components/shared'
import Tabs from '@/components/ui/Tabs'
import { useParams } from 'react-router-dom'
import { getCatalogueProjectOverview, useAppDispatch, useAppSelector } from './store'
import Statistic from '@/views/app/project/SingleProject/components/Statistic'
import InfoPanel from '@/views/app/project/SingleProject/components/InfoPanel'
import TaskChart from '@/views/app/project/SingleProject/components/TaskChart'
import ActionBar from '@/views/app/project/SingleProject/components/ActionBar'
import CatalogueTaskCard from './CatalogueTaskCard'
import PathComponent from '../components/PathComponent'
import { Button } from '@/components/ui'

const { TabNav, TabList, TabContent } = Tabs

const Project = () => {
    const { id } = useParams()

    const dispatch = useAppDispatch()

    const loading = useAppSelector(state => state.catalogue.data.loading)
    const projectOverview = useAppSelector(state => state.catalogue.data.projectOverview)
    const completedTasks = projectOverview.projectTasks.filter(task => task.status === 1).length
    const inCompleteTasks = projectOverview.projectTasks.length - completedTasks

    const taskChartData = {
        labels: ['Backlog', 'In Progress', 'At Risk', 'Complete'],
        data: [0, inCompleteTasks, 0, completedTasks]
    }

    useEffect(() => {
        dispatch(getCatalogueProjectOverview(Number(id)))
    }, [])


    // useEffect(() => {
    //     dispatch(getPodList(serviceId))
    //     dispatch(getPodjinnsByService(serviceId))
    //     dispatch(getJinnsByService(serviceId))
    // }, [serviceId])




    return (
        <>
            <PathComponent title='Project Details' />
            <div className='container'>
                <Tabs className='pb-16' defaultValue="tab1" variant="pill">
                    <TabList className='flex items-center justify-between px-4'>
                        <div className='flex item-center gap-2'>
                            <TabNav value="tab1">Overview</TabNav>
                            <TabNav value="tab2">Tasks</TabNav>
                        </div>
                        <Button variant='twoTone' className='btn'>
                            Buy Now
                        </Button>
                    </TabList>
                    <div className="p-4">
                        <Loading className='!h-96' loading={loading}>
                            <TabContent value="tab1" className='space-y-4'>
                                <Statistic projectAmount={projectOverview.totalAmount} estimatedTime={projectOverview.estimatedTime} />
                                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                                    <InfoPanel className='col-span-2' serviceName={projectOverview.serviceName} specificServiceName={projectOverview.specificServiceName} technologyName={projectOverview.technologyName} title={projectOverview.title} description={projectOverview.description} />
                                    <TaskChart data={taskChartData} className='col-span-1' />
                                </div>
                            </TabContent>

                            <TabContent value="tab2">

                                <div className='space-y-4'>
                                    {
                                        projectOverview.projectTasks.map((task, index) => <CatalogueTaskCard key={task.id} task={task} index={index} />)
                                    }
                                </div>
                            </TabContent>
                        </Loading>
                    </div>
                </Tabs>
            </div>
        </>
    )
}

export default Project

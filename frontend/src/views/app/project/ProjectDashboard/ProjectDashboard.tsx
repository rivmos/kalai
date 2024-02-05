import { useEffect } from 'react'
import reducer, {
    getProjectDashboardData,
    useAppDispatch,
    useAppSelector,
} from './store'
import { injectReducer } from '@/store'
import Loading from '@/components/shared/Loading'
import ProjectDashboardHeader from './components/ProjectDashboardHeader'
import TaskOverview from './components/TaskOverview'
import MyTasks from './components/MyTasks'
import Projects from './components/Projects'
import Schedule from './components/Schedule'
import Activities from './components/Activities'
import { getUserActivity } from '@/store'

injectReducer('projectDashboard', reducer)

const taskOverviewDummy = {
    daily: {
        onGoing: 13,
        finished: 9,
        total: 21,
        series: [
            {
                name: 'On Going',
                data: [20, 19, 18, 14, 12, 10],
            },
            {
                name: 'Finished',
                data: [1, 4, 8, 15, 16, 18],
            },
        ],
        range: [
            '6:00am',
            '9:00am',
            '12:00pm',
            '03:00pm',
            '06:00pm',
            '09:00pm',
        ],
    },
    weekly: {
        onGoing: 126,
        finished: 87,
        total: 213,
        series: [
            {
                name: 'On Going',
                data: [45, 52, 68, 84, 103, 112, 126],
            },
            {
                name: 'Finished',
                data: [35, 41, 62, 62, 75, 81, 87],
            },
        ],
        range: [
            '21 Jan',
            '22 Jan',
            '23 Jan',
            '24 Jan',
            '25 Jan',
            '26 Jan',
            '27 Jan',
        ],
    },
    monthly: {
        onGoing: 270,
        finished: 113,
        total: 383,
        series: [
            {
                name: 'On Going',
                data: [28, 52, 91, 154, 227, 256, 270],
            },
            {
                name: 'Finished',
                data: [22, 31, 74, 88, 97, 107, 113],
            },
        ],
        range: [
            '01 Jan',
            '05 Jan',
            '10 Jan',
            '15 Jan',
            '20 Jan',
            '25 Jan',
            '27 Jan',
        ],
    },
}

const ProjectDashboard = () => {
    const dispatch = useAppDispatch()

    const user = useAppSelector(state => state.auth.user)

    const dashboardData = useAppSelector(
        (state) => state.projectDashboard.data.dashboardData
    )

    const userActivities = useAppSelector(
        (state) => state.base.common.userActivity
    )

    const userId = useAppSelector(
        (state) => state.auth.user.id
    ) as number

    const loading = useAppSelector(
        (state) => state.projectDashboard.data.loading
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getProjectDashboardData())
        dispatch(getUserActivity(userId))
    }


    return (
        <div className="flex flex-col gap-4 h-full">
            {/* <Loading loading={loading}> */}
            <ProjectDashboardHeader
                userName={user.userName}
            // taskCount={dashboardData?.taskCount}
            />
            <div className="flex flex-col xl:flex-row gap-4">
                <div className="flex flex-col gap-4 flex-auto">
                    <Projects data={dashboardData?.projects} />
                    <TaskOverview
                        data={taskOverviewDummy}
                    />
                    <MyTasks data={dashboardData?.tasks?.slice(0,6)} />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="xl:w-[380px]">
                        <Schedule />
                        <Activities data={userActivities?.slice(0,10)} className='' />
                    </div>
                </div>
            </div>
            {/* </Loading> */}
        </div>
    )
}

export default ProjectDashboard

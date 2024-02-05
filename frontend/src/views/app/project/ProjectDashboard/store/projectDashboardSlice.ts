import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiProjectDashboard } from '@/services/ProjectService'

type ProjectOverviewChart = {
    onGoing: number
    finished: number
    total: number
    series: {
        name: string
        data: number[]
    }[]
    range: string[]
}

type DashboardData = {
    userName?: string
    taskCount?: number
    projectOverviewData?: {
        chart: {
            daily: ProjectOverviewChart
            weekly: ProjectOverviewChart
            monthly: ProjectOverviewChart
        }
    }
    myTasksData?: {
        taskId: string
        taskSubject: string
        priority: number
        assignees: {
            id: string
            name: string
            email: string
            img: string
        }[]
    }[]
    scheduleData?: {
        id: string
        time: string
        eventName: string
        desciption: string
        type: string
    }[]
    activitiesData?: {
        type: string
        dateTime: number
        ticket: string
        status?: number
        userName: string
        userImg?: string
        comment?: string
        tags?: string[]
        files?: string[]
    }[]
    projectsData?: {
        id: number
        name: string
        category: string
        desc: string
        attachmentCount: number
        totalTask: number
        completedTask: number
        progression: number
        dayleft: number
        status: string
        member: {
            name: string
            img: string
        }[]
    }[]
}

export type UserState = {
    id: number,
    name: string,
    image: string
}

export type DashboardTask = {
    id: number,
    title: string,
    description: string,
    estimatedTime: string,
    assignedUser: string,
    startDate: string,
    endDate: string,
    status: number,
    priority: number,
    isbilled: number,
    user: UserState
}

export type DashboardProject = {
    id: number,
    title: string,
    description: string,
    totalTask: number,
    totalCompletedTask: number,
    serviceId: string,
    serviceName: string,
    specificServiceId: string,
    specificServiceName: string,
    technologyId: string,
    technologyName: string,
    podjinn: UserState[]
    jinns: UserState[]
}

type DashboardDataState = {
    tasks?: DashboardTask[]
    projects?: DashboardProject[]
}

type GetProjectDashboardDataResponse = {
    status: boolean
    message: string
    data: DashboardDataState
}

export type ProjectDashboardState = {
    loading: boolean
    dashboardData: DashboardDataState
}

export const SLICE_NAME = 'projectDashboard'

// export const getProjectDashboardData = createAsyncThunk(
//     SLICE_NAME + '/getProjectDashboardData',
//     async () => {
//         const response =
//             await apiGetProjectDashboardData<GetProjectDashboardDataResponse>()
//         return response.data
//     }
// )


export const getProjectDashboardData = createAsyncThunk(
    SLICE_NAME + '/getProjectDashboardData',
    async () => {
        const response =
            await apiProjectDashboard<GetProjectDashboardDataResponse>()
        return response.data
    }
)

const initialState: ProjectDashboardState = {
    loading: true,
    dashboardData: {}
}

const projectDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProjectDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload.data
                state.loading = false
            })
            .addCase(getProjectDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

export default projectDashboardSlice.reducer

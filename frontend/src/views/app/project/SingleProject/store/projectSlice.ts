import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiGetPodList, apiGetProjectActivity, apiGetProjectOverview } from '@/services/ProjectService'
import dayjs from 'dayjs'
import { apiGetJinnsByService, apiGetPodjinnsByService, apiGetUserActivity } from '@/services/UserService'
import { ProjectOverviewState, PodjinnByServiceState, JinnByServiceState, TaskState } from '@/@types/project'
import { UserActivityState } from '@/@types/user'

type ProjectState = {
    startDate: number,
    endDate: number,
    projectAmount?: number
    estimatedTime?: number
    billableTime?: number
    description: string
    services: string[]
    podjinn: string
    jinns: string[]
}

export type PodState = {
    id: number,
    podName: string,
    podjinn: {
        id: number,
        name: string,
        image: string
    },
    assignedJinns: [
        {
            id: number,
            name: string,
            image: string
        },
    ]
}


export type SliceState = {
    loading: boolean,
    view: string,
    query: {
        sort: string,
        search: string
    }
    project: ProjectState,
    projectOverview: ProjectOverviewState
    podList:PodState[],
    podjinnsByService: PodjinnByServiceState[],
    jinnsByService: JinnByServiceState[]
    projectActivity: UserActivityState[]
}


export const SLICE_NAME = 'project'

export const getProjectOverview = createAsyncThunk(
    SLICE_NAME + '/getProjectOverview',
    async (projectId: number) => {
        const response =
            await apiGetProjectOverview<{ status: boolean, message: string, data: ProjectOverviewState }>(projectId)
        return response.data
    }
)

export const getPodList = createAsyncThunk(
    SLICE_NAME + '/getPodList',
    async (serviceId: number) => {
        const response =
            await apiGetPodList<{ status: boolean, message: string, data: PodState[] }>(serviceId)
        return response.data
    }
)

export const getPodjinnsByService = createAsyncThunk(
    SLICE_NAME + '/getPodjinnsByService',
    async (serviceId: number) => {
        const response =
            await apiGetPodjinnsByService<{ success: boolean, msg: string, podjinns: PodjinnByServiceState[] }>(serviceId)
        return response.data
    }
)

export const getJinnsByService = createAsyncThunk(
    SLICE_NAME + '/getJinnsByService',
    async (serviceId: number) => {
        const response =
            await apiGetJinnsByService<{ success: boolean, jinns: JinnByServiceState[] }>(serviceId)
        return response.data
    }
)

export const getProjectActivity = createAsyncThunk(
    SLICE_NAME + 'getProjectActivity', 
    async (projectId: number) => {
        const res = await apiGetProjectActivity<{status:boolean, message:string, data:UserActivityState[]}>(projectId)
        return res.data
    }
)

const initialState: SliceState = {
    loading: false,
    view: '',
    query: {
        sort: '',
        search: '',
    },
    project: {
        startDate: dayjs(
            dayjs().subtract(3, 'month').format('DD-MMM-YYYY, hh:mm A')
        ).unix(),
        endDate: dayjs(new Date()).unix(),
        projectAmount: 10,
        estimatedTime: 12,
        billableTime: 15,
        description: 'This is a sample description. This is a sample description. This is a sample description. This is a sample description. This is a sample description. This is a sample description.',
        services: ['Service 1', 'Service 2', 'Service 3'],
        podjinn: 'Harpreet Singh',
        jinns: ['Somvir', 'Princy', 'Kunal']
    },
    projectOverview: {
        id: 0,
        title: '',
        description: '',
        serviceId:0,
        serviceName: '',
        specificServiceName: '',
        technologyName: '',
        totalAmount: '',
        estimatedTime: '',
        startDate: '',
        endDate: '',
        projectTaskList: [],
        projectMilestones: [],
        projectTasks: [],
        podjinn: [],
        jinns: [],
        risks:[]
    },
    podList:[],
    podjinnsByService: [],
    jinnsByService: [],
    projectActivity:[]
}

const projectListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        toggleView: (state, action) => {
            state.view = action.payload
        },
        toggleSort: (state, action) => {
            state.query.sort = action.payload
        },
        setSearch: (state, action) => {
            state.query.search = action.payload
        },
        setPodjinn: (state, action: PayloadAction<{id:number, name:string, image:string}>) => {
            state.projectOverview.podjinn.push(action.payload)
        },
        setPod: (state, action: PayloadAction<{podjinn:PodjinnByServiceState, jinns: JinnByServiceState[]}>) => {
            state.projectOverview.podjinn.push(action.payload.podjinn)
            state.projectOverview.jinns = action.payload.jinns
        },
        updateTask: (state,  action: PayloadAction<TaskState>) => {
            state.projectOverview.projectTasks = state.projectOverview.projectTasks.map(task => task.id === action.payload.id ? {...action.payload} : task)
        },
        addTask: (state,  action: PayloadAction<TaskState>) => {
            state.projectOverview.projectTasks.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjectOverview.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProjectOverview.fulfilled, (state, action) => {
                state.projectOverview = action.payload.data
                state.loading = false
            })
            .addCase(getPodList.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getPodList.fulfilled, (state, action) => {
                state.podList = action.payload.data
                state.loading = false
            })
            .addCase(getPodjinnsByService.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getPodjinnsByService.fulfilled, (state, action) => {
                state.loading = false
                state.podjinnsByService = action.payload.podjinns
            })
            .addCase(getJinnsByService.fulfilled, (state, action) => {
                state.jinnsByService = action.payload.jinns
            })
            builder
            .addCase(getProjectActivity.fulfilled, (state, action) => {
                state.projectActivity = action.payload.data
                state.loading = false
            })
            .addCase(getProjectActivity.pending, (state, action) => {
                state.loading = true
            }) 
    },
})

export const { toggleView, toggleSort, setSearch, setPodjinn, setPod, updateTask, addTask} = projectListSlice.actions

export default projectListSlice.reducer

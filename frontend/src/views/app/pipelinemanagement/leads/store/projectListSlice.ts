import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetPipelineLeads,
} from '@/services/ProjectService'
import { ProjectState } from '@/views/app/project/ProjectList/store'

type ProjectList = ProjectState[]

type Query = {
    sort: 'asc' | 'desc' | ''
    search: ''
}

type GetProjectListRequest = Query

type GetProjectListResponse = {
    status:true
    message:string
    data:ProjectList
}


export type ProjectListState = {
    loading: boolean
    pipelineLeads: ProjectList
    allMembers: {
        value: string
        label: string
        img: string
    }[]
    view: 'grid' | 'list'
    query: Query
    newProjectDialog: boolean
}

export const SLICE_NAME = 'leadpipeline'

export const getPipelineLeads = createAsyncThunk(
    SLICE_NAME + '/getPipelineLeads',
    async () => {
        const response = await apiGetPipelineLeads<
            GetProjectListResponse
        >()
        return response.data
    }
)

const initialState: ProjectListState = {
    loading: false,
    pipelineLeads: [],
    allMembers: [],
    view: 'grid',
    query: {
        sort: 'asc',
        search: '',
    },
    newProjectDialog: false,
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
        toggleNewProjectDialog: (state, action) => {
            state.newProjectDialog = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPipelineLeads.fulfilled, (state, action) => {
                state.pipelineLeads = action.payload.data
                state.loading = false
            })
            .addCase(getPipelineLeads.pending, (state) => {
                state.loading = true
            })
    },
})

export const { toggleView, toggleSort, toggleNewProjectDialog, setSearch } =
    projectListSlice.actions

export default projectListSlice.reducer

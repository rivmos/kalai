import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetManualLogLists,
    apiDeleteManualLog,
    apiCreateManualLog,    
} from '@/services/ReportsAnalysis'
import type { TableQueries } from '@/@types/common'

type ManualLog = {
    id: number;
    sno: number;
    project: string;
    billable: string;
    nonbillable: string;
    meeting_agenda: string;
    meeting_type: string;
    participant: string;
    meeting_date: string;
    start_time: string;
    end_time: string;
    spent_time_minutes: string;
    created_by: number;
}

type Project = {
    id: number;
    project_name: string;
}

type User = {
    id: number;
    name: string;
}

type ManualLogs = ManualLog[]

type GetManualLogResponse = {
    data: ManualLogs
    projectslist: Project[]
    users: User[]
    total: number
}

type FilterQueries = {
    project: string
    meeting_agenda: string
    /* category: string[]
    status: number[]
    productStatus: number */
}

export type ManualLogListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    manualLogList: ManualLog[]
    newProjectDialog: boolean
    userList:User[],
    projectList: Project[]
}

type GetManualLogRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'ManualLogList'

export const getManualLogList = createAsyncThunk(
    SLICE_NAME + '/getManualLogList',
    async (data: GetManualLogRequest) => {
        const response = await apiGetManualLogLists<
            GetManualLogResponse,
            GetManualLogRequest
        >(data)
        return response.data
    }
)

export const deleteProduct = async (data: { id: string | string[] }) => {
    const response = await apiDeleteManualLog<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}
/* export const createManualLog = async (data: { formdata: string | string[] }) => {
    const response = await apiCreateManualLog(data)
    console.log(response.data)
    return response.data
} */
export const createManualLog = createAsyncThunk(
    SLICE_NAME + '/createManualLogs',
    async (data: { formdata: string | string[] }) => {
        const response =
            await apiCreateManualLog(data)
        return response.data
    }
)

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
    
}

const initialState: ManualLogListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    manualLogList: [],
    projectList:[],
    userList:[],
    tableData: initialTableData,
    filterData: {
        project: '',
        meeting_agenda: '',
       /*  category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0, */
    },
    newProjectDialog: false,
}

const manualLogListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.manualLogList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
        toggleNewManualLogDialog: (state, action) => {
            state.newProjectDialog = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getManualLogList.fulfilled, (state, action) => {
                state.manualLogList = action.payload.data
                state.projectList = action.payload.projectslist
                state.userList = action.payload.users
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getManualLogList.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,
    toggleNewManualLogDialog,
} = manualLogListSlice.actions

export default manualLogListSlice.reducer

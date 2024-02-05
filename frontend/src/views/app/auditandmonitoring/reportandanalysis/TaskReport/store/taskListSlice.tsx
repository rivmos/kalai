import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetTaskList,
    apiDeleteTask,
} from '@/services/ReportsAnalysis'
import type { TableQueries } from '@/@types/common'

type Product = {
    sno: number;
    logged_time: number;
    billable_time: number;
    task_id: number;
    task_name: string;
    project_name: string;
    description: string;
    start_date: string;
    assigned_to: string;
    due_date: string;
    created_at: string;
    progress: number;
    status: number;
    approved_hour: string;
    task_progress_status:number;
    quantify:number;
}

type Products = Product[]

type GetSalesProductsResponse = {
    data: Products
    total: number
}

type FilterQueries = {
    task_name: string
   /*  category: string[]
    status: number[]
    productStatus: number */
}

export type TaskListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    taskList: Product[]
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'taskList'

export const getTasks = createAsyncThunk(
    SLICE_NAME + '/getTasks',
    async (data: GetSalesProductsRequest) => {
        const response = await apiGetTaskList<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)
        return response.data
    }
)

export const deleteProduct = async (data: { id: string | string[] }) => {
    const response = await apiDeleteTask<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

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

const initialState: TaskListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    taskList: [],
    tableData: initialTableData,
    filterData: {
        task_name: '',
    },
}

const taskListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updatetaskList: (state, action) => {
            state.taskList = action.payload
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
        setSelectedTask: (state, action) => {
            state.selectedProduct = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state.taskList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getTasks.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updatetaskList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedTask,
} = taskListSlice.actions

export default taskListSlice.reducer

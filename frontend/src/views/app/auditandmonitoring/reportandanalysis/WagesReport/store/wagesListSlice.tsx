import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetReportsAnalysisWages,
    apiDeleteReportsAnalysisWages,
} from '@/services/ReportsAnalysis'
import type { TableQueries } from '@/@types/common'

interface Wagestotal {
    totalwages: number
 }
 export type TotalWages = {
    totalwages: Wagestotal
 }
 export type DataState = {
    sno: number;
    id: number;
    name: string;
    is_manual_log: number;
    is_meeting_log: number;
    milestone_id: number;
    spent_time_minutes: string;
    percent_disapprove: string;
    final_hr: string;
    maxxstation_time: null | string;
    user: string;
    taskname: string;
    remarks: string;
    created_at: string;
    performance: number;
    deduction: number;
    wage_per_hour: string;
    total_wages: string;
    performance_retention: string;
    net_total: string;
    tax_deduction: string;
    net_payable: string;
    balance_payable: string;
}
type WagesList = DataState[]
type GetWagesResponse = {
    data: WagesList
    TotalWages:TotalWages
    total: number
}


type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type ReportsAanlysisWagesListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    productList: DataState[]
    //totalwages:totalWages
}

type GetWagesRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'reportsanalysisWagesList'

export const getWages = createAsyncThunk(
    SLICE_NAME + '/getWages',
    async (data: GetWagesRequest) => {
        const response = await apiGetReportsAnalysisWages<
            GetWagesResponse,
            GetWagesRequest
        >(data)
        return response.data
    }
)

export const deleteProduct = async (data: { id: string | string[] }) => {
    const response = await apiDeleteReportsAnalysisWages<
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

const initialState: ReportsAanlysisWagesListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    productList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const wagesListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.productList = action.payload
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWages.fulfilled, (state, action) => {
                state.productList = action.payload.data
                state.loading = false
            })
            .addCase(getWages.pending, (state) => {
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
} = wagesListSlice.actions

export default wagesListSlice.reducer

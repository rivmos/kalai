import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProducts,
} from '@/services/SalesService'
import { apiGetDasboardData } from '@/services/DashboardService'

export type Statistic = {
    name:string,
    value:string
}

export type DashboardState = {
    loading:boolean,
    dashboard:Statistic[]
}

export const SLICE_NAME = 'dashboardSlice'

export const getDashboardData = createAsyncThunk(
    SLICE_NAME + '/getDashboardData',
    async () => {
        const response = await apiGetDasboardData<
            Statistic[]
        >()
        return response.data
    }
)


const initialState: DashboardState = {
    loading: false,
    dashboard:[]
}

const categoryListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.dashboard = action.payload
                state.loading = false
            })
            .addCase(getDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

export default categoryListSlice.reducer

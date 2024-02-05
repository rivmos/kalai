import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDashboardData } from '@/services/CrmService'

export type Statistic = {
    key: string
    label: string
    value: number
    growShrink: number
}

export type LeadRegion = {
    name: string
    value: number
}

export type Lead = {
    id: number
    name: string
    avatar: string
    status: number
    createdTime: number
    email: string
    assignee: string
}

export type Emails = {
    precent: number
    opened: number
    unopen: number
    total: number
}

export type DashboardData = {
    statisticData: Statistic[]
    leadByRegionData: LeadRegion[]
    recentLeadsData: Lead[]
    emailSentData: {
        precent: number
        opened: number
        unopen: number
        total: number
    }
}

type DashboardDataResponse = DashboardData

export type DashboardState = {
    loading: boolean
    dashboardData: Partial<DashboardData>
}

export const SLICE_NAME = 'Dashboard'

export const getDashboardData = createAsyncThunk(
    'Dashboard/data/getDashboardData',
    async () => {
        const response =
            await apiGetDashboardData<DashboardDataResponse>()
        return response.data
    }
)

const initialState: DashboardState = {
    loading: true,
    dashboardData: {},
}

const DashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload
                state.loading = false
            })
            .addCase(getDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

export default DashboardSlice.reducer

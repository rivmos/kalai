import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { apiGetAuditDashboard } from '@/services/WebService'

type Statistic = {
    value: number
    growShrink: number
}

type Task = {
    id: number;
    project_id: string;
    task_name: string;
    product_id: number | null;
    approved_hour: string;
}

type Project = {
    id: number;
    user_id: string;
    project_name: string;
}

export type DashboardData = {
    statisticData?: {
        revenue: Statistic
        orders: Statistic
        purchases: Statistic
    }
    salesReportData?: {
        series: {
            name: string
            data: number[]
        }[]
        categories: string[]
    }
    topProductsData?: {
        id: string
        name: string
        img: string
        sold: number
    }[]
    latestOrderData?: {
        id: number;
        name: string;
        project_id: number;
        milestone_id: number;
        meeting_type: string | null;
        is_manual_log: number;
        is_meeting_log: number;
        project_task_id: number;
        start_date: string;
        start_time: string;
        end_date_time: string | null;
        spent_time_minutes: string;
        billable: number;
        description: string | null;
        is_time_logged: number;
        is_flaged: number;
        status: string;
        task: Task;
        project: Project;
    }[]
    salesByCategoriesData?: {
        labels: string[]
        data: number[]
    }
}

type DashboardDataResponse = DashboardData

export type SalesDashboardState = {
    startDate: number
    endDate: number
    loading: boolean
    dashboardData: DashboardData
}

export const SLICE_NAME = 'salesDashboard'

export const getSalesDashboardData = createAsyncThunk(
    SLICE_NAME + '/getSalesDashboardData',
    async () => {
        const response = await apiGetAuditDashboard<DashboardDataResponse>()
        return response.data
    }
)

const initialState: SalesDashboardState = {
    startDate: dayjs(
        dayjs().subtract(3, 'month').format('DD-MMM-YYYY, hh:mm A')
    ).unix(),
    endDate: dayjs(new Date()).unix(),
    loading: true,
    dashboardData: {},
}

const salesDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setStartDate: (state, action: PayloadAction<number>) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action: PayloadAction<number>) => {
            state.endDate = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSalesDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload
                state.loading = false
            })
            .addCase(getSalesDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setStartDate, setEndDate } = salesDashboardSlice.actions

export default salesDashboardSlice.reducer

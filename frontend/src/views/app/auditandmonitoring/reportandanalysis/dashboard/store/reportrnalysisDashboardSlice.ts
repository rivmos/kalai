import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { apiGetReportAnanlysisDashboardData } from '@/services/ReportsAnalysis'

type Statistic = {
    value: number
    growShrink: number
}

export type DashboardData = {
    statisticData?: {
        billable: Statistic
        nonbillable: Statistic
        wageshour: Statistic
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
        sno: number;
        id: number;
        name: string;
        is_manual_log: number;
        is_meeting_log: number;
        milestone_id: number;
        spent_time_minutes: string;
        percent_disaprove: string;
        final_hr: number;
        maxxstation_time: null | string;
        user: string;
        taskname: string;
        remarks: string;
        created_at: number;
        performance: number;
        deduction: number;
        wage_per_hour: string;
        total_wages: number;
        performance_retention: string;
        net_total: string;
        tax_deduction: string;
        net_payable: string;
        balance_payable: string;
        status: number;
    }[]
    salesByCategoriesData?: {
        labels: string[]
        data: number[]
    }
}

type DashboardDataResponse = DashboardData

export type ReportAnanlysisDashboardState = {
    startDate: number
    endDate: number
    loading: boolean
    dashboardData: DashboardData
}

export const SLICE_NAME = 'reportsananlysisDashboard'

export const getReportAnanlysisDashboardData = createAsyncThunk(
    SLICE_NAME + '/getReportAnanlysisDashboardData',
    async (data) => {
        const response = await apiGetReportAnanlysisDashboardData<DashboardDataResponse>(data)
        return response.data
    }
)

const initialState: ReportAnanlysisDashboardState = {
    startDate: dayjs(
        dayjs().subtract(0, 'month').format('01-MMM-YYYY, hh:mm A')
    ).unix(),
    endDate: dayjs(new Date()).unix(),
    loading: true,
    dashboardData: {},
}

const reportrnalysisDashboardSlice = createSlice({
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
            .addCase(getReportAnanlysisDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload
                state.loading = false
            })
            .addCase(getReportAnanlysisDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setStartDate, setEndDate } = reportrnalysisDashboardSlice.actions

export default reportrnalysisDashboardSlice.reducer

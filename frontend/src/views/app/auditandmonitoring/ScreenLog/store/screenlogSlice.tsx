import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetScreenLogs } from '@/services/Audit';
import { number } from 'yup';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type usersData={
    emp_id: number;
    user_id: number | string; 
    info_id: number;
    name: string;
}

export type ScreenLogsState = {
    screenlog: {
        current_page: number;
        data: Array<{
            id: number;
            user_id: number;
            project_id: number;
            task_id: number;
            image_path: string;
            keyboard_stroke: number;
            mouse_event: number;
            attentiveness: string;
            is_approved: number;
            is_flagged: number;
            deleted: string | null;
            screenshort_time_minutes: string;
            dispute_type: string;
            discription: string;
            comments: string;
            created_at: string;
            updated_at: string;
            user: {
                name: string;
            };
        }>;
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: PaginationLink[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    }[];
    usersData:usersData[]
};

export type ScreenLogsResponseState = {
    status: string,
    message: string,
    screenlog: ScreenLogsState[],
     usersData:usersData[]
}

export type DataState = {
    loading: boolean
    screenlogdata: ScreenLogsResponseState;

}

export const SLICE_NAME = 'screenlog'


export const getScreenlog = createAsyncThunk(
    SLICE_NAME + '/logs-screen',
    async () => {
        const response = await apiGetScreenLogs<ScreenLogsResponseState>();
        return response.data;
    }
);

const initialState: DataState = {
    loading: false,
    screenlogdata: {
        status: '',
        message: '',
        screenlog: [],
        // data: [],
        usersData:[]
    }
}

const screenlogSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getScreenlog.fulfilled, (state, action) => {
                state.screenlogdata = action.payload
                state.loading = false
            })
            .addCase(getScreenlog.pending, (state) => {
                state.loading = true
            })
    },
})

export default screenlogSlice.reducer

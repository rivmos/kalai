import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetLogList, apiGetLogListFilter } from '@/services/WebService';
import { useParams } from 'react-router-dom';

interface Task {
    id: number;
    project_id: string;
    task_name: string;
    product_id: number | null;
    approved_hour: string;
}

interface User {
    id: number;
    name: string;
    image: string;
}

interface Project {
    id: number;
    user_id: string;
    project_name: string;
}

type LogType = {
    id: number;
    user: string;
    image: string;
    projectevent: string;
    taskevent: string;
    billabletime: number;
    totaltimelogged: number;
    estimatedtime: number;
    is_flaged:number;
    status: string;
};

type FilterLogType = {
    id: number;
    user: string;
    image: string;
    projectevent: string;
    taskevent: string;
    billabletime: number;
    totaltimelogged: number;
    estimatedtime: number;
    status: string;
};

export type LogsListState = {
    logList: any;
    projects: any;
    users: any;
    data:
    {
        current_page: number;
        data: Array<{
            id: number;
            name: string;
            project_id: number;
            milestone_id: number;
            meeting_type: string;
            is_manual_log: number;
            is_meeting_log: number;
            project_task_id: number;
            start_date: string;
            start_time: string;
            end_date_time: string;
            spent_time_minutes: string;
            billable: number;
            description: string;
            is_time_logged: number;
            is_flaged: number;
            user_id: number;
            status: string;
            task: Task;
            users: User[];
            project: Project[];
        }>;

    }
    LogList: LogType[];
}

export type LogsFilterListState = {
    LogList: any;
    projects: any;
    users: any;
    data:
    {
        current_page: number;
        data: Array<{
            id: number;
            name: string;
            project_id: number;
            milestone_id: number;
            meeting_type: string;
            is_manual_log: number;
            is_meeting_log: number;
            project_task_id: number;
            start_date: string;
            start_time: string;
            end_date_time: string;
            spent_time_minutes: string;
            billable: number;
            description: string;
            is_time_logged: number;
            is_flaged: number;
            user_id: number;
            status: string;
            task: Task;
            users: User[];
            project: Project[];
        }>;
        LogList: FilterLogType[];
    }
}


export type LogsPostResponseState = {
    status: string,
    message: string,
}

export type LogsListResponseState = {
    status: string,
    message: string,
    data: LogsListState[],
    LogList: LogType[];
}

export type FiltersLogsListResponseState = {
    status: string,
    message: string,
    data: LogsFilterListState[],
    LogList: FilterLogType[];
}

export type DataState = {
    loading: boolean
    loglistData: LogsListResponseState;
    filterLogList: FiltersLogsListResponseState;
}

export const SLICE_NAME = 'logListdata'

export const getLoglist = createAsyncThunk(
    SLICE_NAME + '/log-list',
    async () => {
        const response = await apiGetLogList<
            LogsListResponseState
        >()
        return response.data
    }
)



export const getFilterLoglist = createAsyncThunk(
    SLICE_NAME + '/log-list-filter',
    async () => {
        const { userId, projectId,sDate,eDate } = useParams();

        if (!userId || !projectId || !sDate || !eDate ) {
            throw new Error("Project ID or project Id is undefined");
        }

        const id = parseInt(userId);
        const IdProject = parseInt(projectId);
        const sdate =sDate;
        const edate =eDate;

        if (isNaN(id) || isNaN(IdProject)) {
            throw new Error("Invalid user ID or project Id  sdate edate");
        }

        const response = await apiGetLogListFilter<FiltersLogsListResponseState>(id, IdProject,sdate,edate);
        return response.data;
    }
)


const initialState: DataState = {
    loading: false,
    loglistData: {
        status: '',
        message: '',
        data: [],
        LogList: []
    },
    filterLogList: {
        status: '',
        message: '',
        data: [],
        LogList: []
    },
}

const logListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLoglist.fulfilled, (state, action) => {
                state.loglistData = action.payload
                state.loading = false
            })
            .addCase(getLoglist.pending, (state) => {
                state.loading = true
            })
            
            .addCase(getFilterLoglist.fulfilled, (state, action) => {
                state.filterLogList = action.payload
                state.loading = false
            })
            .addCase(getFilterLoglist.pending, (state) => {
                state.loading = true
            })
    },
})

export default logListSlice.reducer


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetFlageListFilter,apiGetFlagList} from '@/services/WebService';
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

interface User {
    id: number;
    name: string;
  }

interface Project {
    id: number;
    user_id: string;
    project_name: string;
}
type FilterLogType = {
    id: number;
    userId:number;
    user: string;
    image: string;
    projectevent: string;
    taskevent: string;
    billabletime: number;
    totaltimelogged: number;
    estimatedtime: number;
    status: string;
   
};

type LogType = {
    id: number;
    user: string;
    image: string;
    projectevent: string;
    taskevent: string;
    billabletime: number;
    totaltimelogged: number;
    estimatedtime: number;
    status: string;
    users: User[];
};

export type LogsListState = {
    logList: any;
    users: User[];
    projects: any;
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


export type LogsListResponseState = {
    status: string,
    message: string,
    data: LogsListState[],
    LogList: LogType[];
    users: User[];
  

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

export const SLICE_NAME = 'flagedata'

export const getflaglist = createAsyncThunk(
    SLICE_NAME + '/flag-list',
    async () => {
        const response = await apiGetFlagList<
            LogsListResponseState
        >()
        return response.data
    }
)


export const getFilterFlagelist = createAsyncThunk(
    SLICE_NAME + '/flag-list-filter',
    async () => {
        const { sDate, eDate, userId } = useParams();

        if (!sDate || !eDate || !userId) {
            throw new Error("start Date, end Date, or userId is undefined");
        }

        const sdate = sDate;
        const edate = eDate;
        const numericUserId = Number(userId);

        if (isNaN(numericUserId)) {
            throw new Error("userId is not a valid number");
        }

        const response = await apiGetFlageListFilter<FiltersLogsListResponseState>(numericUserId, sdate, edate);
        return response.data;
    }
);




const initialState: DataState = {
    loading: false,
    loglistData: {
        status: '',
        message: '',
        data: [],
        LogList: [],
        users: [],
    },
    filterLogList: {
        status: '',
        message: '',
        data: [],
        LogList: []
    },
  
}

const flageSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getflaglist.fulfilled, (state, action) => {
                state.loglistData = action.payload
                state.loading = false
            })
            .addCase(getflaglist.pending, (state) => {
                state.loading = true
            })
            .addCase(getFilterFlagelist.fulfilled, (state, action) => {
                state.filterLogList = action.payload
                state.loading = false
            })
            .addCase(getFilterFlagelist.pending, (state) => {
                state.loading = true
            })
         
    },
})

export default flageSlice.reducer


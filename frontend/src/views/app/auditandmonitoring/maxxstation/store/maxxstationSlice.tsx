import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetQuantifyTasks, apiGetActivityLogs, apiGetScreenLogs } from '@/services/WebService';
import { useParams } from 'react-router-dom';
import { number } from 'yup';

interface Projects {
    id: number;
    projectName: string;
}
interface PodslistAll {
    id: number;
    name: string;
}

export type QuantifyTasksState = {
    data: {
        id: number,
        project_log_id: number,
        logged_time: Date,
        billable_time: Date,
        none_billable_time: Date,
        task_name: string,
        project_name: string,
        description: string,
        start_date: Date,
        end_date: null,
        assigned_to: [
            string
        ],
        isbilled: 0,
        due_date: Date,
        created_at: Date,
        priority: number,
        progress: number,
        status: number,
        approved_hour: number,
    },
    projects: Projects[],
    pods_list_all: {
        id: number
    }
}

type Task = {
    id: number;
    project_id: string;
    task_name: string;
    product_id: null | string;
}

type User = {
    id: number;
    name: string;
    image: string;
}

type Project = {
    id: number;
    user_id: string;
    project_name: string;
}

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type ActivityLogsState = {

    data: {
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
            task: {
                id: number;
                project_id: string;
                task_name: string;
                product_id: null | string;
            };
            user: {
                id: number;
                name: string;
                image: string;
            };
            project: {
                id: number;
                user_id: string;
                project_name: string;
            };

        }>;
    };
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
};

export type ScreenLogsResponseState = {
    status: string,
    message: string,
    data: [],
    screenlog: ScreenLogsState[],

}

export type ActivityLogsResponseState = {
    status: string,
    message: string,
    data: [],
    activitydata: ActivityLogsState[],
    task: Task[],
    user: User[];
    project: Project[];
}
export type QuantifyTasksResponseState = {
    status: string,
    message: string,
    data: QuantifyTasksState[],
    projects: Projects[],
    pods_list_all: PodslistAll[]
}

export type DataState = {
    loading: boolean
    quantifytasks: QuantifyTasksResponseState;
    activitylog: ActivityLogsResponseState;
    screenlogdata: ScreenLogsResponseState;

}

export const SLICE_NAME = 'maxxstation'

export const getQuantifyTasks = createAsyncThunk(
    SLICE_NAME + '/audit-task',
    async () => {
        const response = await apiGetQuantifyTasks<
            QuantifyTasksResponseState
        >()
        return response.data
    }
)

export const getActivitylog = createAsyncThunk(
    SLICE_NAME + '/activity-logs',
    async () => {
        const response = await apiGetActivityLogs<
            ActivityLogsResponseState
        >()
        return response.data
    }
)
export const getScreenlog = createAsyncThunk(
    SLICE_NAME + '/logs-screen',
    async () => {
        const { userId, taskId } = useParams();

        if (!userId || !taskId) {
            throw new Error("Project ID or podjinnId is undefined");
        }

        const id = parseInt(userId);
        const IdAsNumber = parseInt(taskId);

        if (isNaN(id) || isNaN(IdAsNumber)) {
            throw new Error("Invalid userID or clientId");
        }

        const response = await apiGetScreenLogs<ScreenLogsResponseState>(id, IdAsNumber);
        return response.data;
    }
);

const initialState: DataState = {
    loading: false,
    quantifytasks: {
        status: '',
        message: '',
        data: [],
        projects: [],
        pods_list_all: []
    },
    activitylog: {
        status: '',
        message: '',
        activitydata: [],
        task: [],
        user: [],
        project: [],
        data: [],
    },
    screenlogdata: {
        status: '',
        message: '',
        screenlog: [],
        data: [],
    }
}

const maxxstationSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuantifyTasks.fulfilled, (state, action) => {
                state.quantifytasks = action.payload
                state.loading = false
            })
            .addCase(getQuantifyTasks.pending, (state) => {
                state.loading = true
            })

            .addCase(getActivitylog.fulfilled, (state, action) => {
                state.activitylog = action.payload
                state.loading = false
            })
            .addCase(getActivitylog.pending, (state) => {
                state.loading = true
            })

            .addCase(getScreenlog.fulfilled, (state, action) => {
                state.screenlogdata = action.payload
                state.loading = false
            })
            .addCase(getScreenlog.pending, (state) => {
                state.loading = true
            })
    },
})

export default maxxstationSlice.reducer

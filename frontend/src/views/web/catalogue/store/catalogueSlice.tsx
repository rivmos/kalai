import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetPods, apiGetPricing, apiGetCatalogueProjects } from '@/services/WebService'
import { apiGetCatalogueProjectOverview } from '@/services/ProjectService';
import { ProjectOverviewState } from '@/@types/project';

type Service = {
    id: number;
    name: string;
};

type Podjinn = {
    id: number;
    name: string;
    image: string;
};

type AssignedJinn = {
    id: number;
    name: string;
    image: string;
};

type Project = {
    id: number;
    project_name: string;
    project_status: string;
};

type Pricing = {
    name: number;
    description: string;
    monthlyPrice: string;
    yearlyPrice: string;
    image: string;
    features: string
};

export type ProjectState = {
    id: number,
    title: string,
    serviceId: number,
    serviceName: string,
    specificServiceId: number,
    specificServiceName: string,
    technologyId: number,
    technologyName: string,
    totalTime: number,
    totalCost: number
};

export type PodState = {

    id: number;
    pod_name: string;
    pod_average_hourly_rate: string;
    services: Service[];
    podjinn: Podjinn;
    assigned_jinns: AssignedJinn[];
    projects: Project[];
};

export type PricingResponseState = {
    status: string,
    message: string,
    data: Pricing[]
}

export type PodResponseState = {
    status: string,
    message: string,
    data: PodState[]
}

export type ProjectResponseState = {
    status: string,
    message: string,
    data: ProjectState[]
}

export type DataState = {
    loading: boolean
    pods: PodResponseState
    projects: ProjectResponseState
    pricing: PricingResponseState
    projectOverview: ProjectOverviewState
}

export const SLICE_NAME = 'catalogue'

export const getPods = createAsyncThunk(
    SLICE_NAME + '/getPods',
    async () => {
        const response = await apiGetPods<
            PodResponseState
        >()
        return response.data
    }
)

export const getProjects = createAsyncThunk(
    SLICE_NAME + '/getProjects',
    async () => {
        const response = await apiGetCatalogueProjects<
            ProjectResponseState
        >()
        return response.data
    }
)

export const getCatalogueProjectOverview = createAsyncThunk(
    SLICE_NAME + '/getCatalogueProjectOverview',
    async (projectId: number) => {
        const response =
            await apiGetCatalogueProjectOverview<{ status: boolean, message: string, data: ProjectOverviewState }>(projectId)
        return response.data
    }
)

export const getPricing = createAsyncThunk(
    SLICE_NAME + '/getPricingData',
    async () => {
        const response = await apiGetPricing<
            PricingResponseState
        >()
        return response.data
    }
)



const initialState: DataState = {
    loading: false,
    pods: {
        status: '',
        message: '',
        data: []
    },
    projects: {
        status: '',
        message: '',
        data: []
    },
    pricing: {
        status: '',
        message: '',
        data: []
    },
    projectOverview: {
        id: 0,
        title: '',
        description: '',
        serviceId:0,
        serviceName: '',
        specificServiceName: '',
        technologyName: '',
        totalAmount: '',
        estimatedTime: '',
        startDate: '',
        endDate: '',
        projectTaskList: [],
        projectMilestones: [],
        projectTasks: [],
        podjinn: [],
        jinns: []
    },
}

const catalogueSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCatalogueProjectOverview.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getCatalogueProjectOverview.fulfilled, (state, action) => {
                state.projectOverview = action.payload.data
                state.loading = false
            })
            .addCase(getPods.fulfilled, (state, action) => {
                state.pods = action.payload
                state.loading = false
            })
            .addCase(getPods.pending, (state) => {
                state.loading = true
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.projects = action.payload
                state.loading = false
            })
            .addCase(getProjects.pending, (state) => {
                state.loading = true
            })
            .addCase(getPricing.fulfilled, (state, action) => {
                state.pricing = action.payload
                state.loading = false
            })
            .addCase(getPricing.pending, (state) => {
                state.loading = true
            })
    },
})

export default catalogueSlice.reducer

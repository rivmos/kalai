import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
    apiGetIndustries,
    apiGetScrumBoardtMembers,
    apiGetServices,
    apiGetSpecificServices,
    apiPutProjectList,
    apiCreateProject,
    apiGetRecommendedTasks,
    apiGetDraftProjects,
    apiGetProjectOverview,
    apiGetAllProjects,
    apiArchiveProject
} from '@/services/ProjectService'
import { apiGetPodjinnsByService } from '@/services/UserService'
import { CreateProjectState, MilestoneState } from '../components/CreateProject'
import { SegmentValue } from '@/components/ui/Segment/context'

type Member = {
    id: string
    name: string
    email: string
    img: string
}

type Project = {
    id: number
    name: string
    category: string
    desc: string
    attachmentCount: number
    totalTask: number
    completedTask: number
    progression: number
    dayleft: number
    status: string
    member: Omit<Member, 'id' | 'email'>[]
}

export type ProjectState = {
    id: number,
    title: string,
    description: string,
    totalTask: number,
    totalCompletedTask: number,
    serviceId: number,
    serviceName: string,
    specificServiceId: number,
    specificServiceName: string,
    technologyId: number,
    technologyName: string,
    podjinn: PodjinnByServiceState[],
    jinns: JinnByServiceState[]
}

type ProjectList = Project[]

type Query = {
    sort: 'asc' | 'desc' | ''
    search: ''
}

type GetProjectListRequest = Query

type GetProjectListResponse = ProjectList

type GetScrumBoardtMembersResponse = {
    allMembers: Member[]
}

type MainCategoryState = {
    selectedService: number,
    selectedSpecificService: number,
    selectedTechnology: number,
}

type ProjectDetailState = {            
    title: string,
    description:string,
}

type PutProjectListRequest = {
    id: string
    name: string
    desc: string
    totalTask?: number
    completedTask?: number
    progression: number
    member?: Omit<Member, 'email' | 'id'>[]
}

type PutProjectListResponse = ProjectList

export type PaymentTermsFormState = {
    [key: string]: any,
    projectId: number | null,
    escrowEnabled: boolean,
    discountPercentage: number,
    billingOptions: (number | string)[],
    hourlyBillingOptions: SegmentValue,
    milestones: MilestoneState[],
    totalTime: number,
    isPipeline: number,
    isPublished: number,
}

type RecommendedTaskState = { id: number, title: string, estimatedTime: string, totalCost: number }

type SubmittedProject = {
    projectId: string | null,
    taskCategoryId: number | null,
    tasks:
    {
        id: number,
        title: string,
        description: string,
        estimatedTime: string,
    }[]
}

type PodjinnByServiceState = {
    id: number,
    name: string,
    image: string
}

type JinnByServiceState = {
    id: number,
    name: string,
    image: string
}

export type ProjectListState = {
    loading: boolean
    draftProjects: ProjectState[]
    allProjects: ProjectState[]
    filteredProjects: ProjectState[]
    allMembers: {
        value: string
        label: string
        img: string
    }[]
    view: 'grid' | 'list'
    query: Query
    newProjectDialog: boolean,
    services: { name: string, id: number }[],
    industries: { name: string, id: number }[],
    specificServices: { name: string, id: number }[],
    technologies: { name: string, id: number }[],
    paymentTermsForm: PaymentTermsFormState
    recommendedTasks: RecommendedTaskState[],
    submittedProject: SubmittedProject,
    podjinnsByService: PodjinnByServiceState[],
    formData
    : {
        mainCategoryState?: MainCategoryState,
        projectDetailState?: ProjectDetailState
        // taskCategory: '',
        // taskList: [],
        // escrowEnabled: false,
        // discountPercentage: 0,
        // billingOptions: [],
        // hourlyBillingOptions: [],
        // milestones: [],
        // totalTime: 0,
        // assignPodjinn: 0
    }
    // projectOverviewData: ProjectOverviewState,
    cardLoadingState:Boolean
}

// type ProjectOverviewState = {
//     project: {
//         id: number,
//         description: string,
//         technology_id: number,
//         service_id: number,
//         specific_service_id: number
//     },
//     technology: {
//         id: number,
//         name: string
//     },
//     services: {
//         id: number,
//         name: string
//     },
//     specificServices: {
//         id: number,
//         name: string
//     },
//     project_data: {
//         tasks_created_yesterday: number,
//         billable_tasks:
//         {
//             id: number,
//             project_id: number,
//             task_list_id: number,
//             position: number,
//             teamwork_project_id: null,
//             teamwork_task_list_id: null,
//             teamwork_task_id: null,
//             product_id: null,
//             task_name: string,
//             description: string,
//             user_assign_ids: null,
//             released_users_id: string,
//             approved_hour: 5,
//             previous_approved_hour: null,
//             total_spent_hour: null,
//             start_date: null,
//             due_date: null,
//             previous_due_date: null,
//             progress: number,
//             priority: number,
//             status: number,
//             task_progress_status: null,
//             isbilled: number,
//             created_at: string,
//             updated_at: string,
//             deleted_at: null,
//             created_by: number,
//             updated_by: null,
//             deleted_by: null
//         }[],
//         non_billable_tasks: [],
//         active_tasks_estimated_time: number
//     },
//     podjinn: [],
//     jinns: []
// }

export const SLICE_NAME = 'projectList'


type ServicesResponse = {
    status: string,
    message: string,
    data: { name: string, id: number }[]
}

type SpecificServicesResponse = {
    status: boolean
    message: string
    specific_services_list: { name: string, id: number }[]
    tech_list: { name: string, id: number }[]
}

export const putProject = createAsyncThunk(
    SLICE_NAME + '/putProject',
    async (data: PutProjectListRequest) => {
        const response = await apiPutProjectList<
            PutProjectListResponse,
            PutProjectListRequest
        >(data)
        return response.data
    }
)
export const getIndustries = createAsyncThunk(
    SLICE_NAME + '/getIndustries',
    async () => {
        const response =
            await apiGetIndustries<ServicesResponse>()
        return response.data.data
    }
)

export const getServices = createAsyncThunk(
    SLICE_NAME + '/getServices',
    async () => {
        const response =
            await apiGetServices<ServicesResponse>()
        return response.data.data
    }
)


export const getSpecificServices = createAsyncThunk(
    SLICE_NAME + '/getSpecificServices',
    async (serviceId: number) => {
        const response =
            await apiGetSpecificServices<SpecificServicesResponse>(serviceId)
        return response.data
    }
)

export const getRecommendedTasks = createAsyncThunk(
    SLICE_NAME + '/getRecommendedTasks',
    async (data: { selectedService: number, selectedSpecificService: number, selectedTechnology: number }) => {
        const response =
            await apiGetRecommendedTasks<{ success: boolean, tasks: RecommendedTaskState[] }>(data.selectedService, data.selectedSpecificService, data.selectedTechnology)
        return response.data
    }
)

export const createProject = createAsyncThunk(
    SLICE_NAME + '/createProject',
    async (data: CreateProjectState) => {
        const response = await apiCreateProject<
            any,
            CreateProjectState
        >(data)
        return response.data
    }
)

export const getPodjinnsByService = createAsyncThunk(
    SLICE_NAME + '/getPodjinnsByService',
    async (serviceId: number) => {
        const response =
            await apiGetPodjinnsByService<{ success: boolean, msg: string, podjinns: PodjinnByServiceState[] }>(serviceId)
        return response.data
    }
)

export const getDraftProjects = createAsyncThunk(
    SLICE_NAME + '/getDraftProjects',
    async () => {
        const response =
            await apiGetDraftProjects<{ status: boolean, message: string, data: ProjectState[] }>()
        return response.data
    }
)

export const getAllProjects = createAsyncThunk(
    SLICE_NAME + '/getAllProjects',
    async (status: string) => {
        const response =
            await apiGetAllProjects<{ status: boolean, message: string, data: ProjectState[] }>(status)
        return response.data
    }
)

// export const getProjectOverview = createAsyncThunk(
//     SLICE_NAME + '/getProjectOverview',
//     async (projectId: number) => {
//         const response =
//             await apiGetProjectOverview<{ status: boolean, message: string, data: ProjectOverviewState }>(projectId)
//         return response.data
//     }
// )

const initialState: ProjectListState = {
    loading: false,
    draftProjects: [],
    allProjects: [],
    allMembers: [],
    filteredProjects: [],
    view: 'grid',
    query: {
        sort: 'asc',
        search: '',
    },
    newProjectDialog: false,
    services: [],
    industries: [],
    specificServices: [],
    technologies: [],
    formData: {
        // mainCategoryState:{},
        // projectDetailState:{}
    },
    paymentTermsForm: {
        projectId: null,
        escrowEnabled: false,
        discountPercentage: 0,
        billingOptions: [],
        hourlyBillingOptions: [],
        milestones: [],
        totalTime: 0,
        isPipeline: 0,
        isPublished: 0,
    },
    recommendedTasks: [],
    submittedProject: {
        projectId: null,
        taskCategoryId: null,
        tasks: []
    },
    podjinnsByService: [],
    cardLoadingState:false
    // projectOverviewData: {
    //     project: {
    //         id: 0,
    //         description: '',
    //         technology_id: 0,
    //         service_id: 0,
    //         specific_service_id: 0
    //     },
    //     technology: {
    //         id: 0,
    //         name: ''
    //     },
    //     services: {
    //         id: 0,
    //         name: ''
    //     },
    //     specificServices: {
    //         id: 0,
    //         name: ''
    //     },
    //     project_data: {
    //         tasks_created_yesterday: 0,
    //         billable_tasks: [],
    //         non_billable_tasks: [],
    //         active_tasks_estimated_time: 0
    //     },
    //     podjinn: [],
    //     jinns: []
    // },
}

const projectListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        toggleView: (state, action) => {
            state.view = action.payload
        },
        toggleSort: (state, action) => {
            state.query.sort = action.payload
        },
        setSearch: (state, action) => {
            state.query.search = action.payload
            state.filteredProjects = state.allProjects.filter(project => project.title.toLowerCase().includes(action.payload))
        },
        toggleNewProjectDialog: (state, action) => {
            state.newProjectDialog = action.payload
        },
        updatePaymentFormField: (state, action: PayloadAction<{ field: string, value: any }>) => {
            state.paymentTermsForm[action.payload.field] = action.payload.value
        },
        addFormMilestone: (state, action) => {
            state.paymentTermsForm.milestones.push(action.payload)
        },
        addSubmittedProjectData: (state, action) => {
            state.submittedProject = action.payload
        },
        removeProject: (state, action:PayloadAction<{ projectId:number }>) => {
            state.allProjects = state.allProjects.filter(project => project.id !== action.payload.projectId)
        },
        toggleCardLoadingState: (state) => {
            state.cardLoadingState = !state.cardLoadingState 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDraftProjects.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getDraftProjects.fulfilled, (state, action) => {
                state.draftProjects = action.payload.data
                state.loading = false
            })
            .addCase(getAllProjects.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllProjects.fulfilled, (state, action) => {
                state.allProjects = action.payload.data
                state.loading = false
            })
            // .addCase(getProjectOverview.pending, (state, action) => {
            //     state.loading = true
            // })
            // .addCase(getProjectOverview.fulfilled, (state, action) => {
            //     state.projectOverviewData = action.payload.data
            //     state.loading = false
            // })
            .addCase(getIndustries.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getIndustries.fulfilled, (state, action) => {
                state.industries = action.payload
                state.loading = false
            })
            .addCase(getServices.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.services = action.payload
                state.loading = false
            })
            .addCase(getSpecificServices.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getRecommendedTasks.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getRecommendedTasks.fulfilled, (state, action) => {
                state.recommendedTasks = action.payload.tasks
                state.loading = false
            })
            .addCase(getSpecificServices.fulfilled, (state, action) => {
                state.specificServices = action.payload.specific_services_list
                state.technologies = action.payload.tech_list
                state.loading = false
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.draftProjects = action.payload
            })
            .addCase(getPodjinnsByService.fulfilled, (state, action) => {
                state.podjinnsByService = action.payload.podjinns
            })
    },
})

export const { toggleView, toggleSort, toggleNewProjectDialog, setSearch, updatePaymentFormField, addFormMilestone, addSubmittedProjectData, removeProject, toggleCardLoadingState } =
    projectListSlice.actions

export default projectListSlice.reducer

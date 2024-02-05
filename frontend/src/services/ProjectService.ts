import { LocalTaskState } from '@/views/app/project/ProjectList/components/NewTaskForm'
import ApiService from './ApiService'

export async function apiGetProjectDashboardData<T>() {
    return ApiService.fetchData<T>({
        url: '/project/dashboard',
        method: 'get',
    })
}

export async function apiGetPipelineLeads<T>() {
    return ApiService.fetchData<T>({
        url: '/get-pipeline-projects',
        method: 'get',
    })
}

export async function apiPutProjectList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/project/list/add',
        method: 'put',
        data,
    })
}

export async function apiGetScrumBoards<T>() {
    return ApiService.fetchData<T>({
        url: '/project-scrum-board',
        method: 'get',
    })
}

export async function apiGetScrumBoardtMembers<T>() {
    return ApiService.fetchData<T>({
        url: '/project/scrum-board/members',
        method: 'post',
    })
}

export async function apiGetScrumBoardtTicketDetail<T>() {
    return ApiService.fetchData<T>({
        url: '/project/scrum-board/tickets/detail',
        method: 'get',
    })
}

export async function apiGetServices<T>() {
    return ApiService.fetchData<T>({
        url: '/get-services',
        method: 'get',
    })
}

export async function apiGetSpecificServices<T>(serviceId: number) {
    return ApiService.fetchData<T>({
        url: '/get-specific-services',
        method: 'get',
        params: {
            serviceId: serviceId
        }
    })
}


export async function apiGetRecommendedTasks<T>(selectedService: number, selectedSpecificService: number, selectedTechnology: number) {
    return ApiService.fetchData<T>({
        url: '/get-recommend-tasks',
        method: 'get',
        params: {
            selectedService,
            selectedSpecificService,
            selectedTechnology
        }
    })
}

export async function apiGetIndustries<T>() {
    return ApiService.fetchData<T>({
        url: '/get-industries',
        method: 'get',
    })
}

export async function apiCreateProject<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/create-project',
        method: 'post',
        data,
    })
}

export async function apiSetPaymentTerms<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/set-project-terms',
        method: 'post',
        data,
    })
}

export async function apiGetDraftProjects<T>() {
    return ApiService.fetchData<T>({
        url: '/get-draft-project',
        method: 'get',
    })
}

export async function apiGetPodList<T>(serviceId:number) {
    return ApiService.fetchData<T>({
        url: '/get-pod-list',
        method: 'get',
        params:{
            serviceId
        }
    })
}

export async function apiGetProjectOverview<T>(projectId:number) {
    return ApiService.fetchData<T>({
        url: '/project-overview',
        method: 'get',
        params:{
            id:projectId
        }
    })
}


export async function apiGetCatalogueProjectOverview<T>(projectId:number) {
    return ApiService.fetchData<T>({
        url: '/overview',
        method: 'get',
        params:{
            id:projectId
        }
    })
}



export async function apiAssignPodjinn<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/assign-pod-podjinn',
        method: 'post',
        data,
    })
}


export async function apiAddPeople<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/assign-people',
        method: 'post',
        data,
    })
}

export async function apiTaskUpdate<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/edit-task',
        method: 'post',
        data
    })
}


export async function apiAddTask<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/add-task',
        method: 'post',
        data,
    })
}


export async function apiProjectDashboard<T>() {
    return ApiService.fetchData<T>({
        url: '/project-dashboard',
        method: 'get',
    })
}


export async function apiGetAllProjects<T>(status:string) {
    return ApiService.fetchData<T>({
        url: '/get-project-list',
        method: 'get',
        params:{
            status
        }
    })
}


export async function apiArchiveProject<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/archive-project',
        method: 'post',
        data,
    })
}

export async function apiDeleteProject<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/delete-project',
        method: 'post',
        data,
    })
}


export async function apiGetProjectActivity<T>(projectId:number) {
    return ApiService.fetchData<T>({
        url: `/project-activity`,
        method: 'get',
        params:{
            id:projectId
        }
    })
}
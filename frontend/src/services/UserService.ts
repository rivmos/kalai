import ApiService from './ApiService'

export async function apiGetTeamList<T>() {
    return ApiService.fetchData<T>({
        url: '/users',
        method: 'get',
    })
}


export async function apiGetUserProfile<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: `/users/${params.id}`,
        method: 'get',
    })
}


export async function apiGetPodjinnsByService<T>(serviceId:number) {
    return ApiService.fetchData<T>({
        url: `/get-podjinns`,
        method: 'get',
        params:{
            serviceId
        }
    })
}

export async function apiGetJinnsByService<T>(serviceId:number) {
    return ApiService.fetchData<T>({
        url: `/get-jinns`,
        method: 'get',
        params:{
            serviceId
        }
    })
}

export async function apiGetUserActivity<T>(userId:number) {
    return ApiService.fetchData<T>({
        url: `/user-activity`,
        method: 'get',
        params:{
            id:userId
        }
    })
}
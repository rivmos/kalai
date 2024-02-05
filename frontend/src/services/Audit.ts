import ApiService from "./ApiService";

export async function apiApplyLogAction<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/log-list-post',
        method: 'post',
        data,
    })
}

export async function apiAddFlag<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/comments',
        method: 'post',
        data,
    })
}

export async function apiGetComment<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/getcomments',
        method: 'get',
        data,
    })
}

export async function apiGetScreenLogs<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: `/logs-screen`,
        method: 'get',
        data,
    })
}


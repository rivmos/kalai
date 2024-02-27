import ApiService from "./ApiService";


export async function apiGetCategories<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/categories',
        method: 'post',
        data,
    })
}

export async function apiGetAllCategories<T>() {
    return ApiService.fetchData<T>({
        url: '/categories/all',
        method: 'get',
    })
}

export async function apiGetSingleCategory<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `/categories/${params.id}`,
        method: 'get',
    })
}


export async function apiDeleteCategory<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/categories/delete`,
        method: 'delete',
        data
    })
}
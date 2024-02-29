import ApiService from "./ApiService";


export async function apiGetBannerImages<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/banner',
        method: 'post',
        data,
    })
}

export async function apiGetAllBannerImages<T>() {
    return ApiService.fetchData<T>({
        url: '/banner/all',
        method: 'get',
    })
}

export async function apiGetSingleBannerImage<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `/banner/${params.id}`,
        method: 'get',
    })
}


export async function apiDeleteBannerImage<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/banner/delete`,
        method: 'delete',
        data
    })
}

export async function apiAddBannerImage<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/banner/save',
        method: 'post',
        data,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
}
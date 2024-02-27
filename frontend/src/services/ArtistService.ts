import ApiService from "./ApiService";

export async function apiGetArtists<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/artists',
        method: 'post',
        data,
    })
}

export async function apiGetAllArtists<T>() {
    return ApiService.fetchData<T>({
        url: '/artists/all',
        method: 'get',
    })
}

export async function apiGetArtistProfile<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `/artists/${params.id}`,
        method: 'get',
    })
}


export async function apiGetArtworks<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/artworks',
        method: 'post',
        data,
    })
}


export async function apiGetArtworkDetail<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `/artworks/${params.id}`,
        method: 'get',
    })
}

export async function apiAddArtist<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/artists/save',
        method: 'post',
        data,
    })
}

export async function apiDeleteArtist<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/artists/delete`,
        method: 'delete',
        data
    })
}


export async function apiDeleteArtwork<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/artworks/delete`,
        method: 'delete',
        data
    })
}


// export async function apiDeleteSalesProducts<
//     T,
//     U extends Record<string, unknown>
// >(data: U) {
//     return ApiService.fetchData<T>({
//         url: '/sales/products/delete',
//         method: 'delete',
//         data,
//     })
// }

export async function apiAddCategory<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/categories/save',
        method: 'post',
        data,
    })
}

export async function apiAddArtwork<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/artworks/save',
        method: 'post',
        data,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
}

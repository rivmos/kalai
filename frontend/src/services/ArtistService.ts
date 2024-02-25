import ApiService from "./ApiService";

export async function apiGetArtists<T>() {
    return ApiService.fetchData<T>({
        url: '/artists',
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


export async function apiGetArtworks<T>() {
    return ApiService.fetchData<T>({
        url: `/artworks`,
        method: 'get',
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
        url: '/artworks/new',
        method: 'post',
        data,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
}

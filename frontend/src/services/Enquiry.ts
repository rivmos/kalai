import ApiService from "./ApiService";

export async function apiNewEnquiry<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/enquiries/new',
        method: 'post',
        data,
    })
}
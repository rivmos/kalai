import ApiService from "./ApiService";

export async function apiAddRisk<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/add-risk',
        method: 'post',
        data,
    })
}

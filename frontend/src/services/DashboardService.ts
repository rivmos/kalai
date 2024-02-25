
import ApiService from "./ApiService";

export async function apiGetDasboardData<T>() {
    return ApiService.fetchData<T>({
        url: '/dashboard',
        method: 'get',
    })
}
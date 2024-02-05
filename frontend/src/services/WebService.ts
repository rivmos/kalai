import ApiService from './ApiService'

export async function apiGetBannerData<T>() {
    return ApiService.fetchData<T>({
        url: '/users',
        method: 'get',
    })
}



export async function apiGetCatalogueProjects<T>() {
    return ApiService.fetchData<T>({
        url: '/get-published-projects',
        method: 'get',
    })
}
export async function apiGetPricing<T>(){
    return ApiService.fetchData<T>({
        url: 'get-pricing',
        method: 'get'
    })
}
export async function apiGetLeadPipeline<T>(){
    return ApiService.fetchData<T>({
        url: '/lead-pipeline',
        method: 'get',
    })
}
export async function apiGetPodjinns<T>(){
    return ApiService.fetchData<T>({
        url: '/all-podjinns',
        method: 'get',
    })
}
export async function apiGetPods<T>(){
    return ApiService.fetchData<T>({
        url: '/get-pods',
        method: 'get',
    })
}
export async function apiGetServices<T>(){
    return ApiService.fetchData<T>({
        url: '/get-services',
        method: 'get',
    })
}
export async function apiGetJinns<T>(serviceId: number){
    return ApiService.fetchData<T>({
        url: `/get-jinns?serviceId=${serviceId}`,
        method: 'get',
    })
}
export async function apiGetSpecificServices<T>(serviceId: number) {
    const response = await ApiService.fetchData<T>({
      url: `/get-specific-services?serviceId=${serviceId}`,
      method: 'get',
    });
    return response.data;
  }
  export async function apiCreatePodjinn<T>( userId: number) {
    return ApiService.fetchData<T>({
        url: `/create-podjinn`,
        
        method: 'post',  
    });
}

  



// export async function apiCreatePodjinn<T>(){
//     return ApiService.fetchData<T>({
//         url: '/create-podjinn',
//         method: 'post',
//     })
// }


export async function apiGetProjectOverview<T>(projectId: number) {
    return ApiService.fetchData<T>({
        url: `/client-overview?id=${projectId}`,
        method: 'get',
    });
}
export async function apiGetBidPipeline<T>(){
    return ApiService.fetchData<T>({
        url: '/bid-pipeline',
        method: 'get',
    })
}
export async function apiGetHome<T>() {
    return ApiService.fetchData<T>({
        url: '/get-data',
        method: 'get',
    })
}
export async function apiGetQuantifyTasks<T>() {
    return ApiService.fetchData<T>({
        url: `/audit-task`,
        method: 'get',
    })
}
export async function apiGetMaxxStations<T>() {
    return ApiService.fetchData<T>({
        url: `/timelog-review`,
        method: 'get',
    })
}

export async function apiGetActivityLogs<T>() {
    return ApiService.fetchData<T>({
        url: `/activity-logs`,
        method: 'get',
    })
}

export async function apiGetScreenLogs<T>(userId: number,taskId:number) {
    return ApiService.fetchData<T>({
        url: `/logs-screen?userId=${userId}&taskId=${taskId}`,
        method: 'get',
    })
}

export async function apiGetLogList<T>() {
    return ApiService.fetchData<T>({
        url: '/log-list',
        method: 'get',
    })
}

export async function apiGetFlagList<T>() {
    return ApiService.fetchData<T>({
        url: '/flag-list',
        method: 'get',
    })
}

export async function apiGetLogListFilter<T>(userId: number,projectId:number,sDate:string,eDate:string) {
    return ApiService.fetchData<T>({
        url: `/log-list-filter?userId=${userId}&projectId=${projectId}&sdate=${sDate}&edate${eDate}`,
        method: 'get',
    })
}

export async function apiGetFlageListFilter<T>(userId:number,sDate:string,eDate:string) {
    return ApiService.fetchData<T>({
        url: `/flag-list-filter?userId=${userId}&end=${eDate}&start${sDate}`,
        method: 'get',
    })
}


// export async function apiGetFlageListFilter<T>(userId: number | null, sDate: string, eDate: string) {
//     let url = `/flag-list-filter?end=${eDate}&start=${sDate}`;
//     if (userId !== null && !isNaN(userId)) {
//         url += `&userId=${userId}`;
//     }

//     return ApiService.fetchData<T>({
//         url,
//         method: 'get',
//     });
// }

export async function apiGetAuditDashboard<T>() {
    return ApiService.fetchData<T>({
        url: '/audit-dashboard',
        method: 'get',
    })
}

export async function apiPostLogList<T>() {
    return ApiService.fetchData<T>({
        url: '/log-list-post',
        method: 'post',
    })
}














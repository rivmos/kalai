import ApiService from './ApiService'

export async function apiGetReportAnanlysisDashboardData<T, U extends Record<string, unknown>
>( data: U) {
  
    return ApiService.fetchData<T>({
        url: '/reports-analysis',
        method: 'post',
        data,
    })
}

export async function ReportsAnalysisProducts<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/reports-analysis-products',
        method: 'get',
        data,
    })
}

export async function apiDeleteSalesProducts<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/reportsanalysis/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesProduct<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/reportsanalysis/product',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/reportsanalysis/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/reportsanalysis/products/create',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/reportsanalysis/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/reportsanalysis/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/reportsanalysis/orders-details',
        method: 'get',
        params,
    })
}



// Projects report services
export async function apiGetReportsAnalysisProducts<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/reports-analysis-products',
        method: 'post',
        data,
    })
}
/* export async function apiGetReportsAnalysisProducts<T>(name: string) {
    return ApiService.fetchData<T>({
        url: '/reports-analysis-products',
        method: 'get',
        params: {
            name: name
        }
    })
} */

// Wages report list services

export async function apiGetReportsAnalysisWages<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/reports-analysis-wages',
        method: 'get',
        data,
    })
}

export async function apiDeleteReportsAnalysisWages<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/reports-analysis-delete',
        method: 'delete',
        data,
    })
}


// Task Report list
export async function apiGetTaskList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/tasklist',
        method: 'get',
        data,
    })
}
export async function apiDeleteTask<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/reportsanalysis/products/delete',
        method: 'delete',
        data,
    })
}
/**
 * API call function for Manual log
 * @param data 
 * @returns 
 */

// Manual log list

export async function apiGetManualLogLists<T, U extends Record<string, unknown>>(
        data: U
    ) {
    return ApiService.fetchData<T>({
        url: `/reports-analysis-manuallogs`,
        method: 'post',
        data,
    })
}

// projects list
export async function apiGetProjectsUsersList<T, U extends Record<string, unknown>>(
    
) {
    return ApiService.fetchData<T>({
        url: '/reports-analysis-projectslist',
        method: 'get',
    })
}


// delete manual log
export async function apiDeleteManualLog<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/reports-analysis-delete-manuallog',
        method: 'delete',
        data,
    })
}

// create manual log
export async function apiCreateManualLog<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/reports-analysis-create-manuallog',
        method: 'post',
        data,
    })
}

// Edit manual log
export async function apiEditManualLog<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/reports-analysis-edit-manuallog',
        method: 'post',
        data,
    })
}
// update manual log
export async function apiUpdateManualLog<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/reports-analysis-update-manuallog',
        method: 'post',
        data,
    })
}

/* export async function apiCreateManualLog<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/reports-analysis-create-manuallog',
        method: 'get',
        data,
    })
} */

import ApiService from './ApiService'

export async function apiGetWalletData<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/payments-in-dashboard',
        method: 'get',
    })
}
export async function apiGetTransctionHistoryData<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/payments-in-history-data',
        method: 'get',
    })
}

// Invoices

export async function apiGePaymentOutInvoiceData<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/payments-out-invoice-overview',
        method: 'get',
        params,
    })
}


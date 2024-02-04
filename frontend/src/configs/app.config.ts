export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'https://kalai-y5oa.onrender.com/api/',
    authenticatedEntryPath: '/web/home',
    unAuthenticatedEntryPath: '/web/home',
    tourPath: '/web/home',
    locale: 'en',
    enableMock: false,
}

export default appConfig

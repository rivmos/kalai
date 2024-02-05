export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'http://localhost:3001/api',
    authenticatedEntryPath: '/web/home',
    unAuthenticatedEntryPath: '/web/home',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}


export default appConfig
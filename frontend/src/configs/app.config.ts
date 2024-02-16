export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

export const baseUrl = 'http://localhost:3001'

const appConfig: AppConfig = {
    // apiPrefix: 'https://kalai-y5oa.onrender.com/api',
    apiPrefix: `${baseUrl}/api`,
    authenticatedEntryPath: '/app/dashboard',
    unAuthenticatedEntryPath: '/web/home',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}


export default appConfig
import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'
import { eventsData, mailData, DashboardData } from './data/crmData'
import { signInUserData } from './data/authData'
import {
    projectList,
    scrumboardData,
    issueData,
    projectDashboardData,
} from './data/projectData'
import {
    productsData,
    ordersData,
    orderDetailsData,
    salesDashboardData,
} from './data/salesData'
import { pricingData, homePageData } from './data/webHomeData';
import { authFakeApi, webFakeApi, crmFakeApi, projectFakeApi, salesFakeApi } from './fakeApi'

const { apiPrefix } = appConfig

export function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
                pricingData,
                homePageData,
                projectList,
                scrumboardData,
                issueData,
                projectDashboardData,
                eventsData,
                mailData,
                DashboardData
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                const isExternal = request.url.startsWith('http')
                const isResource = request.url.startsWith('data:text')
                return isExternal || isResource
            })
            this.passthrough()

            authFakeApi(this, apiPrefix)
            webFakeApi(this, apiPrefix)
            projectFakeApi(this, apiPrefix)
            crmFakeApi(this, apiPrefix)
            salesFakeApi(this, apiPrefix)
        },
    })
}



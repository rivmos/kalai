import { lazy } from 'react'
import { APP_PREFIX_PATH, WEB_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const sideNavRoutes: Routes = [
    {
        key: 'app.dashboard',
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: lazy(() => import('@/views/app/dashboard/Dashboard')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'app.sidebar.podsandpodjinns.podjinn',
        path: `${APP_PREFIX_PATH}/podsandpodjinns/podjinn`,
        component: lazy(() => import('@/views/app/podsandpodjinn/Podjinn')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.sidebar.podsandpodjainns.pods',
        path: `${APP_PREFIX_PATH}/podsandpodjinns/pods`,
        component: lazy(() => import('@/views/app/podsandpodjinn/managepods/Pods')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.sidebar.podsandpsodjinns.podline',
        path: `${APP_PREFIX_PATH}/podsandpodjinns/podline`,
        component: lazy(() => import('@/views/app/podsandpodjinn/managepods/PodLine')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.sidebar.podsanddpodjinns.publishedpods',
        path: `${APP_PREFIX_PATH}/podsandpodjinns/publishedpods`,
        component: lazy(() => import('@/views/app/podsandpodjinn/managepods/PublishedPods')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.sidebar.podsandgpodjinns.proposedlists',
        path: `${APP_PREFIX_PATH}/podsandpodjinns/proposedlists`,
        component: lazy(() => import('@/views/app/podsandpodjinn/managepods/ProposedList')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.sidebar.podsandpodjinns.archivedlist',
        path: `${APP_PREFIX_PATH}/podsandpodjinns/archivedlist`,
        component: lazy(() => import('@/views/app/podsandpodjinn/managepods/ArchivedList')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.projects.ongoing',
        path: `${APP_PREFIX_PATH}/projects/ongoing`,
        component: lazy(() => import('@/views/app/projects/OngoingProjects')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.createproject',
        path: `${APP_PREFIX_PATH}/projects/createproject`,
        component: lazy(() => import('@/views/app/project/ProjectList/components/CreateProject')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.draftprojects',
        path: `${APP_PREFIX_PATH}/projects/draftprojects`,
        component: lazy(() => import('@/views/app/project/ProjectList/DraftProjectList')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.publishedprojects',
        path: `${APP_PREFIX_PATH}/projects/publishedprojects`,
        component: lazy(() => import('@/views/app/project/ProjectList/PublishedProjectList')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.allprojects',
        path: `${APP_PREFIX_PATH}/projects/allprojects`,
        component: lazy(() => import('@/views/app/project/ProjectList/AllProjectList')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.publishedprojects',
        path: `${APP_PREFIX_PATH}/projects/publishedprojects`,
        component: lazy(() => import('@/views/app/projects/PublishedProjects')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.completedprojects',
        path: `${APP_PREFIX_PATH}/projects/completedprojects`,
        component: lazy(() => import('@/views/app/projects/CompletedProjects')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.projectdashboard',
        path: `${APP_PREFIX_PATH}/projects/projectdashboard`,
        component: lazy(() => import('@/views/app/project/ProjectDashboard/ProjectDashboard')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.scrumboard',
        path: `${APP_PREFIX_PATH}/projects/scrumboard`,
        component: lazy(() => import('@/views/app/project/ScrumBoard/ScrumBoard')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.issue',
        path: `${APP_PREFIX_PATH}/projects/issue`,
        component: lazy(() => import('@/views/app/project/Issue/Issue')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.draftprojectlist',
        path: `${APP_PREFIX_PATH}/projects/draftprojectlist`,
        component: lazy(() => import('@/views/app/project/ProjectList/DraftProjectList')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'commcenter.chat',
        path: `${APP_PREFIX_PATH}/commcenter/chat`,
        component: lazy(() => import('@/views/app/communicationcenter/Chat')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'commcenter.meetings.googlemeet',
        path: `${APP_PREFIX_PATH}/commcenter/meetings/googlemeet`,
        component: lazy(() => import('@/views/app/communicationcenter/Meetings/GoogleMeet')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'commcenter.meetings.zoom',
        path: `${APP_PREFIX_PATH}/commcenter/meetings/zoom`,
        component: lazy(() => import('@/views/app/communicationcenter/Meetings/Zoom')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pipelinemanagement.pipeline.leadpipeline',
        path: `${APP_PREFIX_PATH}/pipelinemanagement/pipeline/leadpipeline`,
        component: lazy(() => import('@/views/app/pipelinemanagement/pipeline/LeadPipeline')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pipelinemanagement.pipeline.bidpipeline',
        path: `${APP_PREFIX_PATH}/pipelinemanagement/pipeline/bidpipeline`,
        component: lazy(() => import('@/views/app/pipelinemanagement/pipeline/BidPipeline')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pipeline.calendar',
        path: `${APP_PREFIX_PATH}/pipeline/calendar`,
        component: lazy(() => import('@/views/app/crm/Calendar')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pipeline.dashboard',
        path: `${APP_PREFIX_PATH}/pipeline/dashboard`,
        component: lazy(() => import('@/views/app/crm/Dashboard')),
        authority: [],
        meta: {
        }
    },
    {
        key: 'pipeline.leads',
        path: `${APP_PREFIX_PATH}/pipeline/leads`,
        component: lazy(() => import('@/views/app/pipelinemanagement/leads')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pipeline.customer-details',
        path: `${APP_PREFIX_PATH}/pipeline/customer-details`,
        component: lazy(() => import('@/views/app/crm/CustomerDetail')),
        authority: [],
        meta: {
            layout: 'classic'
        },
    },
    {
        key: 'pipeline.customers',
        path: `${APP_PREFIX_PATH}/pipeline/customers`,
        component: lazy(() => import('@/views/app/crm/Customers')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pipeline.mail',
        path: `${APP_PREFIX_PATH}/pipeline/mail`,
        component: lazy(() => import('@/views/app/crm/Mail')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pipelinemanagement.deals',
        path: `${APP_PREFIX_PATH}/pipelinemanagement/deals`,
        component: lazy(() => import('@/views/app/pipelinemanagement/Deals')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'bidmanagement.availablebids',
        path: `${APP_PREFIX_PATH}/bidmanagement/availablebids`,
        component: lazy(() => import('@/views/app/bidmanagement/AvailableBids')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'bidmanagement.submittedbids',
        path: `${APP_PREFIX_PATH}/bidmanagement/submittedbids`,
        component: lazy(() => import('@/views/app/bidmanagement/SubmittedBids')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'bidmanagement.wonbids',
        path: `${APP_PREFIX_PATH}/bidmanagement/wonbids`,
        component: lazy(() => import('@/views/app/bidmanagement/WonBids')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'bidmanagement.lostbids',
        path: `${APP_PREFIX_PATH}/bidmanagement/lostbids`,
        component: lazy(() => import('@/views/app/bidmanagement/LostBids')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'bidmanagement.expiredbids',
        path: `${APP_PREFIX_PATH}/bidmanagement/expiredbids`,
        component: lazy(() => import('@/views/app/bidmanagement/ExpiredBids')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'anm.maxxqa',
        path: `${APP_PREFIX_PATH}/anm/maxxqa`,
        component: lazy(() => import('@/views/app/auditandmonitoring/MaxxQA')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    
    {
        key: 'anm.maxxstations.activityLog',
        path: `${APP_PREFIX_PATH}/anm/maxxstations/activityLog`,
        component: lazy(() => import('@/views/app/auditandmonitoring/maxxstation/ActivityLog')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'anm.maxxstations.taskscreen',
        path: `${APP_PREFIX_PATH}/anm/maxxstations/taskscreen?/:userId`,
        component: lazy(() => import('@/views/app/auditandmonitoring/maxxstation/TaskScreen')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'anm.maxxstations.dashboard',
        path: `${APP_PREFIX_PATH}/anm/SalesDashboard/dashboard`,
        component: lazy(() => import('@/views/app/auditandmonitoring/SalesDashboard/SalesDashboard')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'anm.maxxstations.logList',
        path: `${APP_PREFIX_PATH}/anm/LogList`,
        component: lazy(() => import('@/views/app/auditandmonitoring/LogList/LogList')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'anm.maxxstations.screenlog',
        path: `${APP_PREFIX_PATH}/anm/ScreenLog`,
        component: lazy(() => import('@/views/app/auditandmonitoring/ScreenLog/ScreenLog')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    
    // {
    //     key: 'anm.maxxstations.quantifytask',
    //     path: `${APP_PREFIX_PATH}/anm/maxxstations/quantifytask`,
    //     component: lazy(() => import('@/views/app/auditandmonitoring/maxxstation/QuantifyTasks') as any),
    //     authority: [],
    //     meta: {
    //       layout: 'classic'
    //     }
    //   },
    // {
    //     key: 'anm.maxxstations.quantifyfiltertasks',
    //     path: `${APP_PREFIX_PATH}/anm/maxxstations/quantifyfiltertasks?/:projectId`,
    //     component: lazy(() => import('@/views/app/auditandmonitoring/maxxstation/QuantifyFilterTasks')),
    //     authority: [],
    //     meta: {
    //         layout: 'classic'
    //     }
    // },
    // {
    //     key: 'anm.maxxstations.manuallog',
    //     path: `${APP_PREFIX_PATH}/anm/maxxstations/manuallog`,
    //     component: lazy(() => import('@/views/app/auditandmonitoring/maxxstation/ManualLogs')),
    //     authority: [],
    //     meta: {
    //         layout: 'classic'
    //     }
    // },
    {
        key: 'anm.djinnhub',
        path: `${APP_PREFIX_PATH}/anm/djinnhub`,
        component: lazy(() => import('@/views/app/auditandmonitoring/DJinnHub')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'anm.disputesnflags',
        path: `${APP_PREFIX_PATH}/anm/disputesnflags`,
        component: lazy(() => import('@/views/app/auditandmonitoring/DisputeAndFlags/DisputeAndFlags')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    // {
    //     key: 'rna.rnadashboard',
    //     path: `${APP_PREFIX_PATH}/rna/rnadashboard`,
    //     component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/DashBoard')),
    //     authority: [],
    //     meta: {
    //         layout: 'classic'
    //     }
    // },
    // {
    //     key: 'rna.projectreport',
    //     path: `${APP_PREFIX_PATH}/rna/projectreport`,
    //     component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/ProjectReport')),
    //     authority: [],
    //     meta: {
    //         layout: 'classic'
    //     }
    // },
    // {
    //     key: 'rna.wagesreport',
    //     path: `${APP_PREFIX_PATH}/rna/wagesreport`,
    //     component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/WagesReport')),
    //     authority: [],
    //     meta: {
    //         layout: 'classic'
    //     }
    // },
    {
        key: 'rna.manualreports',
        path: `${APP_PREFIX_PATH}/rna/manualreports`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/ManualLogReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.manual-log-edit',
        path: `${APP_PREFIX_PATH}/rna/manual-log-edit?/:Id`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/ManualLogReport/components/EditManualLog')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.taskreport',
        path: `${APP_PREFIX_PATH}/rna/taskreport`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/TaskReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.revenuereport',
        path: `${APP_PREFIX_PATH}/rna/revenuereport`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/RevenueReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.customreport',
        path: `${APP_PREFIX_PATH}/rna/customreport`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/CustomReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.closurereport',
        path: `${APP_PREFIX_PATH}/rna/closurereport`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/ClosureReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pin.clientpayments',
        path: `${APP_PREFIX_PATH}/pin/clientpayments`,
        component: lazy(() => import('@/views/app/paymentin/ClientPayment')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pin.wagespayments',
        path: `${APP_PREFIX_PATH}/pin/wagespayments`,
        component: lazy(() => import('@/views/app/paymentout/WagesPayment')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pin.payments-in-dashboard',
        path: `${APP_PREFIX_PATH}/pin/payments-in-dashboard`,
        component: lazy(() => import('@/views/app/paymentin/Wallets/Wallets')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pin.payments-in-invoice',
        path: `${APP_PREFIX_PATH}/pin/payments-in-invoice`,
        component: lazy(() => import('@/views/app/paymentin/OrderList/OrderList')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pin.payments-in-invoice-overview',
        path: `${APP_PREFIX_PATH}/pin/payments-in-invoice-overview`,
        component: lazy(() => import('@/views/app/paymentin/Invoice/Invoice')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'pout.payments-out-dashboard',
        path: `${APP_PREFIX_PATH}/pout/payments-out-dashboard`,
        component: lazy(() => import('@/views/app/paymentout/Wallets/Wallets')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pout.payments-out-invoice',
        path: `${APP_PREFIX_PATH}/pout/payments-out-invoice`,
        component: lazy(() => import('@/views/app/paymentout/OrderList/OrderList')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pout.payments-out-invoice-overview',
        path: `${APP_PREFIX_PATH}/pout/payments-out-invoice-overview`,
        component: lazy(() => import('@/views/app/paymentout/Invoice/Invoice')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    
   /*  {
        key: 'pout.payments',
        path: `${APP_PREFIX_PATH}/pout/payments`,
        component: lazy(() => import('@/views/app/paymentout/Payment')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pout.invoicepayments',
        path: `${APP_PREFIX_PATH}/pout/invoicepayments`,
        component: lazy(() => import('@/views/app/paymentout/InvoicePayment')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    }, */
    {
        key: 'cc.maxxresponse',
        path: `${APP_PREFIX_PATH}/cc/maxxresponse`,
        component: lazy(() => import('@/views/app/campaignconsole/MaxxResponse')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'cc.maxxscore',
        path: `${APP_PREFIX_PATH}/cc/maxxscore`,
        component: lazy(() => import('@/views/app/campaignconsole/MaxxScore')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'cc.maxxifi',
        path: `${APP_PREFIX_PATH}/cc/maxxifi`,
        component: lazy(() => import('@/views/app/campaignconsole/MaxxIfi')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.ratingdashboard',
        path: `${APP_PREFIX_PATH}/rating/ratingdashboard`,
        component: lazy(() => import('@/views/app/rating/DashBoard')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.ratepods',
        path: `${APP_PREFIX_PATH}/rating/ratepods`,
        component: lazy(() => import('@/views/app/rating/RatePods')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.ratepodjinns',
        path: `${APP_PREFIX_PATH}/rating/ratepodjinns`,
        component: lazy(() => import('@/views/app/rating/RateJinns')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.rateprojects',
        path: `${APP_PREFIX_PATH}/rating/rateprojects`,
        component: lazy(() => import('@/views/app/rating/RateProjects')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.rateclients',
        path: `${APP_PREFIX_PATH}/rating/rateclients`,
        component: lazy(() => import('@/views/app/rating/RateClients')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.wof',
        path: `${APP_PREFIX_PATH}/rating/wof`,
        component: lazy(() => import('@/views/app/rating/WallOfFame')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'resourcemgmt.admins',
        path: `${APP_PREFIX_PATH}/resourcemgmt/admins`,
        component: lazy(() => import('@/views/app/resourcemanagement/Admin')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'resourcemgmt.inr',
        path: `${APP_PREFIX_PATH}/resourcemgmt/inr`,
        component: lazy(() => import('@/views/app/resourcemanagement/InvitesAndRequest')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'resourcemgmt.allresources',
        path: `${APP_PREFIX_PATH}/resourcemgmt/allresources`,
        component: lazy(() => import('@/views/app/resourcemanagement/AllResources')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'resourcemgmt.manageclients',
        path: `${APP_PREFIX_PATH}/resourcemgmt/manageclients`,
        component: lazy(() => import('@/views/app/resourcemanagement/ManageClients')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'resourcemgmt.manageagencies',
        path: `${APP_PREFIX_PATH}/resourcemgmt/manageagencies`,
        component: lazy(() => import('@/views/app/resourcemanagement/ManageAgencies')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'appsAccount.settings',
        path: `${APP_PREFIX_PATH}/account/settings/profile`,
        component: lazy(() => import('@/views/app/account/Settings')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'appsAccount.invoice',
        path: `${APP_PREFIX_PATH}/account/invoice/36223`,
        component: lazy(() => import('@/views/app/settings/Invoice')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'appsAccount.activityLog',
        path: `${APP_PREFIX_PATH}/account/activity`,
        component: lazy(() => import('@/views/app/account/ActivityLog/')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'appsAccount.kycForm',
        path: `${APP_PREFIX_PATH}/account/kyc-form`,
        component: lazy(() => import('@/views/app/account/KycForm/KycForm')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    // {
    //     key: 'app.dashboard',
    //     path: `${APP_PREFIX_PATH}/dashboard`,
    //     component: lazy(() => import('@/views/app/dashboard/Dashboard')),
    //     authority: [],
    //     meta: {
    //         layout: 'classic'
    //     }
    // },
    {
        key: 'app.sidebar.podsandpodjinns.podjinn',
        path: `${APP_PREFIX_PATH}/podsandpodjinns/podjinn`,
        component: lazy(() => import('@/views/app/podsandpodjinn/Podjinn')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.sidebar.podsandpodjainns.pods',
        path: `${APP_PREFIX_PATH}/podsandpodjinns/pods`,
        component: lazy(() => import('@/views/app/podsandpodjinn/managepods/Pods')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.sidebar.podsandpsodjinns.podline',
        path: `${APP_PREFIX_PATH}/podsandpodjinns/podline`,
        component: lazy(() => import('@/views/app/podsandpodjinn/managepods/PodLine')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.sidebar.podsanddpodjinns.publishedpods',
        path: `${APP_PREFIX_PATH}/podsandpodjinns/publishedpods`,
        component: lazy(() => import('@/views/app/podsandpodjinn/managepods/PublishedPods')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.sidebar.podsandpodjinns.archivedlist',
        path: `${APP_PREFIX_PATH}/podsandpodjinns/archivedlist`,
        component: lazy(() => import('@/views/app/podsandpodjinn/managepods/ArchivedList')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.projects.ongoing',
        path: `${APP_PREFIX_PATH}/projects/ongoing`,
        component: lazy(() => import('@/views/app/projects/OngoingProjects')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.createproject',
        path: `${APP_PREFIX_PATH}/projects/createproject`,
        component: lazy(() => import('@/views/app/projects/CreateProject')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.draftprojects',
        path: `${APP_PREFIX_PATH}/projects/draftprojects`,
        component: lazy(() => import('@/views/app/projects/DraftProjects')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.publishedprojects',
        path: `${APP_PREFIX_PATH}/projects/publishedprojects`,
        component: lazy(() => import('@/views/app/projects/PublishedProjects')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'projects.completedprojects',
        path: `${APP_PREFIX_PATH}/projects/completedprojects`,
        component: lazy(() => import('@/views/app/projects/CompletedProjects')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'commcenter.chat',
        path: `${APP_PREFIX_PATH}/commcenter/chat`,
        component: lazy(() => import('@/views/app/communicationcenter/Chat/Chat')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'commcenter.meetings.googlemeet',
        path: `${APP_PREFIX_PATH}/commcenter/meetings/googlemeet`,
        component: lazy(() => import('@/views/app/communicationcenter/Meetings/GoogleMeet')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'commcenter.meetings.zoom',
        path: `${APP_PREFIX_PATH}/commcenter/meetings/zoom`,
        component: lazy(() => import('@/views/app/communicationcenter/Meetings/Zoom')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pipelinemanagement.pipeline.leadpipeline',
        path: `${APP_PREFIX_PATH}/pipelinemanagement/pipeline/leadpipeline`,
        component: lazy(() => import('@/views/app/pipelinemanagement/pipeline/LeadPipeline')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
   
    {
        key: 'pipelinemanagement.pipeline.bidpipeline',
        path: `${APP_PREFIX_PATH}/pipelinemanagement/pipeline/bidpipeline`,
        component: lazy(() => import('@/views/app/pipelinemanagement/pipeline/BidPipeline')),
        authority: [],
        meta: {
            layout: 'classic'
            
        }
    },

    {
        key: 'pipelinemanagement.pipeline.clientoverview',
        path: `${APP_PREFIX_PATH}/pipelinemanagement/pipeline/clientoverview?/:projectId`,
        component: lazy(() => import('@/views/app/pipelinemanagement/pipeline/ClientOverView')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'pipeline.calendar',
        path: `${APP_PREFIX_PATH}/pipeline/calendar`,
        component: lazy(() => import('@/views/app/crm/Calendar')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'pipeline.dashboard',
        path: `${APP_PREFIX_PATH}/pipeline/dashboard`,
        component: lazy(() => import('@/views/app/crm/Dashboard')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pipeline.customer-details',
        path: `${APP_PREFIX_PATH}/pipeline/customer-details`,
        component: lazy(() => import('@/views/app/crm/CustomerDetail')),
        authority: [],
        meta: {
            layout: 'classic'
        },
    },

    {
        key: 'pipeline.customers',
        path: `${APP_PREFIX_PATH}/pipeline/customers`,
        component: lazy(() => import('@/views/app/crm/Customers')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pipeline.mail',
        path: `${APP_PREFIX_PATH}/pipeline/mail`,
        component: lazy(() => import('@/views/app/crm/Mail')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'pipelinemanagement.deals',
        path: `${APP_PREFIX_PATH}/pipelinemanagement/deals`,
        component: lazy(() => import('@/views/app/pipelinemanagement/Deals')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'bidmanagement.availablebids',
        path: `${APP_PREFIX_PATH}/bidmanagement/availablebids`,
        component: lazy(() => import('@/views/app/bidmanagement/AvailableBids')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'bidmanagement.submittedbids',
        path: `${APP_PREFIX_PATH}/bidmanagement/submittedbids`,
        component: lazy(() => import('@/views/app/bidmanagement/SubmittedBids')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'bidmanagement.wonbids',
        path: `${APP_PREFIX_PATH}/bidmanagement/wonbids`,
        component: lazy(() => import('@/views/app/bidmanagement/WonBids')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'bidmanagement.lostbids',
        path: `${APP_PREFIX_PATH}/bidmanagement/lostbids`,
        component: lazy(() => import('@/views/app/bidmanagement/LostBids')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'bidmanagement.expiredbids',
        path: `${APP_PREFIX_PATH}/bidmanagement/expiredbids`,
        component: lazy(() => import('@/views/app/bidmanagement/ExpiredBids')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'anm.maxxqa',
        path: `${APP_PREFIX_PATH}/anm/maxxqa`,
        component: lazy(() => import('@/views/app/auditandmonitoring/MaxxQA')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'anm.djinnhub',
        path: `${APP_PREFIX_PATH}/anm/djinnhub`,
        component: lazy(() => import('@/views/app/auditandmonitoring/DJinnHub')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'anm.disputesnflags',
        path: `${APP_PREFIX_PATH}/anm/disputesnflags`,
        component: lazy(() => import('@/views/app/auditandmonitoring/DisputeAndFlags/DisputeAndFlags')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.rnadashboard',
        path: `${APP_PREFIX_PATH}/rna/rnadashboard`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/dashboard/DashBoard')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.projectreport',
        path: `${APP_PREFIX_PATH}/rna/projectreport`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/ProjectReport/ProjectReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.wagesreport',
        path: `${APP_PREFIX_PATH}/rna/wagesreport`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/WagesReport/WagesReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.logreports',
        path: `${APP_PREFIX_PATH}/rna/logreports`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/ManualLogReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.taskreport',
        path: `${APP_PREFIX_PATH}/rna/taskreport`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/TaskReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.revenuereport',
        path: `${APP_PREFIX_PATH}/rna/revenuereport`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/TaskReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.customreport',
        path: `${APP_PREFIX_PATH}/rna/customreport`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/CustomReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rna.closurereport',
        path: `${APP_PREFIX_PATH}/rna/closurereport`,
        component: lazy(() => import('@/views/app/auditandmonitoring/reportandanalysis/ClosureReport')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pin.clientpayments',
        path: `${APP_PREFIX_PATH}/pin/clientpayments`,
        component: lazy(() => import('@/views/app/paymentin/ClientPayment')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pin.recentpayment',
        path: `${APP_PREFIX_PATH}/pin/recentpayment`,
        component: lazy(() => import('@/views/app/paymentin/RecentPayment')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pin.wagespayments',
        path: `${APP_PREFIX_PATH}/pin/wagespayments`,
        component: lazy(() => import('@/views/app/paymentout/WagesPayment')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
   
    {
        key: 'pin.ongoingapprovals',
        path: `${APP_PREFIX_PATH}/pin/ongoingapprovals`,
        component: lazy(() => import('@/views/app/paymentin/OngoingApprovals')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pin.generateinvoice',
        path: `${APP_PREFIX_PATH}/pin/generateinvoice`,
        component: lazy(() => import('@/views/app/paymentin/GenerateInvoice')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pin.listinvoice',
        path: `${APP_PREFIX_PATH}/pin/listinvoice`,
        component: lazy(() => import('@/views/app/paymentin/ListInvoice')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pout.payments',
        path: `${APP_PREFIX_PATH}/pout/payments`,
        component: lazy(() => import('@/views/app/paymentout/Payment')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'pout.invoicepayments',
        path: `${APP_PREFIX_PATH}/pout/invoicepayments`,
        component: lazy(() => import('@/views/app/paymentout/InvoicePayment')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'pout.escrowpayment',
        path: `${APP_PREFIX_PATH}/pout/escrowpayment`,
        component: lazy(() => import('@/views/app/paymentout/EscrowPayment')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'cc.maxxresponse',
        path: `${APP_PREFIX_PATH}/cc/maxxresponse`,
        component: lazy(() => import('@/views/app/campaignconsole/MaxxResponse')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'cc.maxxscore',
        path: `${APP_PREFIX_PATH}/cc/maxxscore`,
        component: lazy(() => import('@/views/app/campaignconsole/MaxxScore')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'cc.maxxifi',
        path: `${APP_PREFIX_PATH}/cc/maxxifi`,
        component: lazy(() => import('@/views/app/campaignconsole/MaxxIfi')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.ratingdashboard',
        path: `${APP_PREFIX_PATH}/rating/ratingdashboard`,
        component: lazy(() => import('@/views/app/rating/DashBoard')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.ratepods',
        path: `${APP_PREFIX_PATH}/rating/ratepods`,
        component: lazy(() => import('@/views/app/rating/RatePods')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.ratejinns',
        path: `${APP_PREFIX_PATH}/rating/ratejinns`,
        component: lazy(() => import('@/views/app/rating/RateJinns')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.rateprojects',
        path: `${APP_PREFIX_PATH}/rating/rateprojects`,
        component: lazy(() => import('@/views/app/rating/RateProjects')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.rateclients',
        path: `${APP_PREFIX_PATH}/rating/rateclients`,
        component: lazy(() => import('@/views/app/rating/RateClients')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.ratepodjinn',
        path: `${APP_PREFIX_PATH}/rating/ratepodjinn`,
        component: lazy(() => import('@/views/app/rating/RatePodjinn')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'rating.wof',
        path: `${APP_PREFIX_PATH}/rating/wof`,
        component: lazy(() => import('@/views/app/rating/WallOfFame')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'resourcemgmt.admins',
        path: `${APP_PREFIX_PATH}/resourcemgmt/admins`,
        component: lazy(() => import('@/views/app/resourcemanagement/Admin')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'resourcemgmt.inr',
        path: `${APP_PREFIX_PATH}/resourcemgmt/inr`,
        component: lazy(() => import('@/views/app/resourcemanagement/InvitesAndRequest')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'resourcemgmt.allresources',
        path: `${APP_PREFIX_PATH}/resourcemgmt/allresources`,
        component: lazy(() => import('@/views/app/resourcemanagement/AllResources')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'resourcemgmt.manageclients',
        path: `${APP_PREFIX_PATH}/resourcemgmt/manageclients`,
        component: lazy(() => import('@/views/app/resourcemanagement/ManageClients')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'resourcemgmt.manageagencies',
        path: `${APP_PREFIX_PATH}/resourcemgmt/manageagencies`,
        component: lazy(() => import('@/views/app/resourcemanagement/ManageAgencies')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'appsAccount.settings',
        path: `${APP_PREFIX_PATH}/account/settings/profile`,
        component: lazy(() => import('@/views/app/settings/Settings')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'appsAccount.invoice',
        path: `${APP_PREFIX_PATH}/account/invoice/36223`,
        component: lazy(() => import('@/views/app/settings/Invoice')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'appsAccount.activityLog',
        path: `${APP_PREFIX_PATH}/account/activity-log`,
        component: lazy(() => import('@/views/app/settings/ActivityLog')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'appsAccount.kycForm',
        path: `${APP_PREFIX_PATH}/account/kyc-form`,
        component: lazy(() => import('@/views/app/settings/KycForm')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },
]

export default sideNavRoutes

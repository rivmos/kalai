import { lazy } from 'react'
import { WEB_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const webRoute: Routes = [
    {
        key: 'app.users.profile',
        path: `${WEB_PREFIX_PATH}/users/profile/:id`,
        component: lazy(() => import('@/views/app/profile/Profile')),
        authority: [ADMIN, USER],
    },
    {
        key: 'web.home',
        path: `${WEB_PREFIX_PATH}/home`,
        component: lazy(() => import('@/views/web/home/Home')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'web',
        },
    },
    {
        key: 'web.paintings',
        path: '/web/paintings',
        component: lazy(() => import('@/views/web/paintings/Paintings')),
        authority: [],
        meta:{}
    },
    {
        key: 'web.sculptures',
        path: '/web/sculptures',
        component: lazy(() => import('@/views/web/sculptures/Sculptures')),
        authority: [],
        meta:{}
    },
    {
        key: 'web.artists',
        path: '/web/artists',
        component: lazy(() => import('@/views/web/artists/Artists')),
        authority: [],
        meta:{}
    },
    {
        key: 'web.exclusives',
        path: '/web/exclusives',
        component: lazy(() => import('@/views/web/exclusives/Exclusives')),
        authority: [],
        meta:{}
    },
    {
        key: 'web.aboutus',
        path: '/web/aboutus',
        component: lazy(() => import('@/views/web/aboutus/AboutUs')),
        authority: [],
        meta:{}
    },
    {
        key: 'web.contactus',
        path: '/web/contactus',
        component: lazy(() => import('@/views/web/contactus/ContactUs')),
        authority: [],
        meta:{}
    },
    {
        key: 'web.profile',
        path: '/web/profile/:id',
        component: lazy(() => import('@/views/web/profile/Profile')),
        authority: [],
        meta:{}
    },

    // {
    //     key: 'web.offer.websolutions',
    //     path: `${WEB_PREFIX_PATH}/offer/websolutions`,
    //     component: lazy(() => import('@/views/web/services/WebSol')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.offer.mobility',
    //     path: `${WEB_PREFIX_PATH}/offer/mobility`,
    //     component: lazy(() => import('@/views/web/services/Mobility')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.offer.digitalmarketing',
    //     path: `${WEB_PREFIX_PATH}/offer/digitalmarketing`,
    //     component: lazy(() => import('@/views/web/services/DigitalMarketing')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.offer.design',
    //     path: `${WEB_PREFIX_PATH}/offer/design`,
    //     component: lazy(() => import('@/views/web/services/Design')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.offer.branding',
    //     path: `${WEB_PREFIX_PATH}/offer/branding`,
    //     component: lazy(() => import('@/views/web/services/Branding')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.offer.buisnessintelligence',
    //     path: `${WEB_PREFIX_PATH}/offer/buisnessintelligence`,
    //     component: lazy(() => import('@/views/web/services/BusinessIntelligence')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.company.aboutus',
    //     path: `${WEB_PREFIX_PATH}/company/aboutus`,
    //     component: lazy(() => import('@/views/web/company/AboutUs/AboutUs')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.company.blog',
    //     path: `${WEB_PREFIX_PATH}/company/blog`,
    //     component: lazy(() => import('@/views/web/company/Blog')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.company.singleblog',
    //     path: `${WEB_PREFIX_PATH}/company/blog/:id`,
    //     component: lazy(() => import('@/views/web/company/SingleBlog')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.catalogue.projectsandpods',
    //     path: `${WEB_PREFIX_PATH}/catalogue/projectsandpods`,
    //     component: lazy(() => import('@/views/web/catalogue/ProjectsAndPods')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.catalogue.pricing',
    //     path: `${WEB_PREFIX_PATH}/catalogue/pricing`,
    //     component: lazy(() => import('@/views/web/catalogue/PricingPage')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'views.app.podsandpodjinn.poddetails',
    //     path: `${WEB_PREFIX_PATH}/podsandpodjinn/poddetails`,
    //     component: lazy(() => import('@/views/app/podsandpodjinn/PodDetails')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'blank',
    //     },
    // },
    
    // {
    //     key: 'web.catalogue.createcustomeproject',
    //     path: `${WEB_PREFIX_PATH}/catalogue/createcustomeproject`,
    //     component: lazy(() => import('@/views/web/catalogue/CreateCustomeProject')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.legal.pnp',
    //     path: `${WEB_PREFIX_PATH}/legal/pnp`,
    //     component: lazy(() => import('@/views/web/legal/PnP')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.legal.help',
    //     path: `${WEB_PREFIX_PATH}/legal/help`,
    //     component: lazy(() => import('@/views/web/legal/Help')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.legal.tnc',
    //     path: `${WEB_PREFIX_PATH}/legal/tnc`,
    //     component: lazy(() => import('@/views/web/legal/TnC')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.company.team',
    //     path: `${WEB_PREFIX_PATH}/aboutus/team`,
    //     component: lazy(() => import('@/views/web/company/AboutUs/ViewAll')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'web.company.blog',
    //     path: `${WEB_PREFIX_PATH}/company/singleblog/:id`,
    //     component: lazy(() => import('@/views/web/company/SingleBlog')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web',
    //     },
    // },
    // {
    //     key: 'app.catalogueproject',
    //     path: `${WEB_PREFIX_PATH}/catalogue/project/:id`,
    //     component: lazy(() => import('@/views/web/catalogue/CatalogueProjectOverview')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         layout: 'web'
    //     }
    // },
]

export default webRoute
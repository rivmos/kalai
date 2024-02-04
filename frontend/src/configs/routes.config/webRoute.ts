import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'


export const webRoutes = [
    {
        key: 'web.home',
        path: '/web/home',
        component: lazy(() => import('@/views/web/home/Home')),
        authority: [],
        meta:{}
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
]
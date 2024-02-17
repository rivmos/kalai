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
    {
        key: 'web.artwork',
        path: '/web/artworks/:id',
        component: lazy(() => import('@/views/web/profile/Artwork')),
        authority: [],
        meta:{}
    },
]

export default webRoute
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
]
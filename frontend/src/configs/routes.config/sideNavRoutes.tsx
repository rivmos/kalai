import { lazy } from 'react'
import { APP_PREFIX_PATH, WEB_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const sideNavRoutes: Routes = [
    {
        key: 'app.dashboard',
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: lazy(() => import('@/views/app/Dashboard/Dashboard')),
        authority: [],
        meta: {
            layout: 'classic'
        }
    },

]

export default sideNavRoutes

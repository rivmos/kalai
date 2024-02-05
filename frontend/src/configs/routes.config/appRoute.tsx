import { lazy } from 'react'
import { APP_PREFIX_PATH, WEB_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'
import sideNavRoutes from './sideNavRoutes'

const appRoute: Routes = [
    ...sideNavRoutes,
    {
        key: 'app.project',
        path: `${APP_PREFIX_PATH}/project/:id`,
        component: lazy(() => import('@/views/app/project/SingleProject/Project')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
]

export default appRoute

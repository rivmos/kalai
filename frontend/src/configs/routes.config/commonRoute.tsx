import { lazy } from 'react'
import { APP_PREFIX_PATH, WEB_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'
const commonRoute: Routes = [
    {
        key: 'app.users.profile',
        path: `${APP_PREFIX_PATH}/users/profile/:id`,
        component: lazy(() => import('@/views/app/profile')),
        authority: [ADMIN, USER],
    },
]

export default commonRoute

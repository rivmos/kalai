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
    {
        key: 'app.addartist',
        path: `${APP_PREFIX_PATH}/artists/add`,
        component: lazy(() => import('@/views/app/artist/ArtistForm')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.addcategory',
        path: `${APP_PREFIX_PATH}/categories/add`,
        component: lazy(() => import('@/views/app/artist//CategoryForm')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.artists',
        path: `${APP_PREFIX_PATH}/artists`,
        component: lazy(() => import('@/views/app/artist/Artists')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'app.artworks',
        path: `${APP_PREFIX_PATH}/artworks`,
        component: lazy(() => import('@/views/app/artist/Artworks')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'app.categories',
        path: `${APP_PREFIX_PATH}/categories`,
        component: lazy(() => import('@/views/app/artist/Categories')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.dashboard',
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: lazy(() => import('@/views/app/dashboard/Dashboard')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
]

export default appRoute

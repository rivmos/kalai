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
        component: lazy(() => import('@/views/app/Artists/ArtistNew')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.editartist',
        path: `${APP_PREFIX_PATH}/artists/edit/:id`,
        component: lazy(() => import('@/views/app/Artists/ArtistEdit')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.editartwork',
        path: `${APP_PREFIX_PATH}/artworks/edit/:id`,
        component: lazy(() => import('@/views/app/Artworks/ArtworkEdit')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.addartwork',
        path: `${APP_PREFIX_PATH}/artwork/add`,
        component: lazy(() => import('@/views/app/Artworks/ArtworkNew')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.addcategory',
        path: `${APP_PREFIX_PATH}/categories/add`,
        component: lazy(() => import('@/views/app/Category/CategoryNew')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.editcategory',
        path: `${APP_PREFIX_PATH}/categories/edit/:id`,
        component: lazy(() => import('@/views/app/Category/CategoryEdit')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.artists',
        path: `${APP_PREFIX_PATH}/artists`,
        component: lazy(() => import('@/views/app/Artists/ArtistList/ArtistList')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.profile',
        path: `${APP_PREFIX_PATH}/profile/:id`,
        component: lazy(() => import('@/views/app/Artists/ArtistProfile')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'app.artworks',
        path: `${APP_PREFIX_PATH}/artworks`,
        component: lazy(() => import('@/views/app/Artworks/ArtworkList/ArtworkList')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },

    {
        key: 'app.categories',
        path: `${APP_PREFIX_PATH}/categories`,
        component: lazy(() => import('@/views/app/Category/CategoryList')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
    {
        key: 'app.dashboard',
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: lazy(() => import('@/views/app/Dashboard/Dashboard')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'classic'
        }
    },
]

export default appRoute

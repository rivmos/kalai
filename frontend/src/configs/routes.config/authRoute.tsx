import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const authRoute: Routes = [
    {
        key: 'signIn',
        path: `/auth/sign-in`,
        component: lazy(() => import('@/views/auth/SignIn')),
        authority: [],
        meta:{
            layout:'simple'
        }
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/views/auth/SignUp')),
        authority: [],
        meta:{
            layout:'simple'
        }
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@/views/auth/ForgotPassword')),
        authority: [],
        meta:{
            layout:'simple'
        }
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/views/auth/ResetPassword')),
        authority: [],
        meta:{
            layout:'simple'
        }
    },
]

export default authRoute

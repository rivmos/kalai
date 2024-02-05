import { useMemo, lazy, Suspense } from 'react'
import Loading from '@/components/shared/Loading'
import { useAppSelector } from '@/store'
import {
    LAYOUT_TYPE_CLASSIC,
    LAYOUT_TYPE_MODERN,
    LAYOUT_TYPE_SIMPLE,
    LAYOUT_TYPE_STACKED_SIDE,
    LAYOUT_TYPE_DECKED,
    LAYOUT_TYPE_BLANK,
    LAYOUT_TYPE_WEB,
} from '@/constants/theme.constant'
import useAuth from '@/utils/hooks/useAuth'
import useDirection from '@/utils/hooks/useDirection'
import useLocale from '@/utils/hooks/useLocale'

const layouts = {
    [LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
    [LAYOUT_TYPE_MODERN]: lazy(() => import('./ModernLayout')),
    [LAYOUT_TYPE_STACKED_SIDE]: lazy(() => import('./StackedSideLayout')),
    [LAYOUT_TYPE_SIMPLE]: lazy(() => import('./SimpleLayout')),
    [LAYOUT_TYPE_DECKED]: lazy(() => import('./DeckedLayout')),
    [LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
    [LAYOUT_TYPE_WEB]: lazy(() => import('./WebLayout')),
}

const Layout = () => {
    const layoutType = useAppSelector((state) => state.theme.layout.type)
    const path = useAppSelector(state => state.base.common.currentRouteKey)

    const { authenticated } = useAuth()

    useDirection()

    useLocale()

    const AppLayout = useMemo(() => {
        if(authenticated){
            return lazy(() => import('./WebLayout'))
        }
        if (path.includes('auth.')) {
            return lazy(() => import('./Authlayout/AuthLayout'))
        }

        // if(path.includes('auth.') && !authenticated){
        //     return layouts['web']
        // }

        return lazy(() => import('./WebLayout'))
    }, [layoutType, authenticated, path])

console.log(path)

    return (
        <Suspense
            fallback={
                <div className="flex flex-auto flex-col h-[100vh]">
                    <Loading loading={true} />
                </div>
            }
        >
            <AppLayout />
        </Suspense>
    )
}

export default Layout

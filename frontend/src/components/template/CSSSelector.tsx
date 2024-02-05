import { useAppSelector } from '@/store';
import { ReactNode, Suspense, lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const WebCSS = lazy(() => import('./WebCSS'));
const DashboardCSS = lazy(() => import('./DashboardCSS'));

const CSSSelector = ({ children }: { children: ReactNode }) => {
    const location = useLocation()

    const currentRouteKey = useAppSelector(state => state.base.common.currentRouteKey)

    return (
        <>
            <Suspense fallback={<div></div>}>
                {currentRouteKey.includes('web') && <WebCSS />}
                {currentRouteKey.includes('app') && <DashboardCSS />}
            </Suspense>
            {/* Render children immediately! */}
            {children}
        </>
    )
}

export default CSSSelector

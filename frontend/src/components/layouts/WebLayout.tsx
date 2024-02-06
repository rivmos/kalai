import View from '@/views'
import SidePanel from '@/components/template/SidePanel'
import { setPanelExpand, useAppSelector, useAppDispatch } from '@/store'
import { HiOutlineCog } from 'react-icons/hi'
import classNames from 'classnames'
import Header from '../template/Header'
import WebHorizontalNav from '@/views/web/components/WebHorizontalNav'
import WebMobileNav from '@/views/web/components/WebMobileNav'
import HeaderLogo from '../template/HeaderLogo'
import Footer from '../template/Footer'
import { Link } from 'react-router-dom'
import '@/assets/styles/custom.css'
import '@/assets/styles/responsive.css'


const HeaderActionsStart = () => {


    return (
        <>
        <Link to='home'>
            <HeaderLogo />
        </Link>
            <WebMobileNav />
        </>
    )
}


const ConfiguratorToggle = () => {
    const dispatch = useAppDispatch()
    const themeColor = useAppSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useAppSelector(
        (state) => state.theme.primaryColorLevel
    )

    return (
        <div
            className={classNames(
                'fixed ltr:right-0 rtl:left-0 top-96 p-3 ltr:rounded-tl-md ltr:rounded-bl-md rtl:rounded-tr-md rtl:rounded-br-md text-white text-xl cursor-pointer select-none',
                `bg-${themeColor}-${primaryColorLevel}`
            )}
            onClick={() => {
                dispatch(setPanelExpand(true))
            }}
        >
            <HiOutlineCog />
        </div>
    )
}

const WebLayout = () => {
const currentRouteKey = useAppSelector(state => state.base.common.currentRouteKey)

    return (
        <>
            <Header className='h-28 shadow-md' container headerStart={<HeaderActionsStart />} headerEnd={<WebHorizontalNav />} />
            <div className={classNames("app-layout-blank", {'homepage':currentRouteKey === 'web.home'})}>
                <View />
                <SidePanel className="hidden" />
            </div>
            <Footer pageContainerType='gutterless' />
        </>
    )
}

export default WebLayout

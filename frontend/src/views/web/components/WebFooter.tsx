import classNames from 'classnames'
import Container from '@/components/shared/Container'
import { APP_NAME } from '@/constants/app.constant'
import { PAGE_CONTAINER_GUTTER_X } from '@/constants/theme.constant'
import Logo from '@/components/template/Logo'
import Footer from '@/components/template/Footer'
import { Link } from 'react-router-dom'

export type FooterPageContainerType = 'gutterless' | 'contained'

type FooterProps = {
    pageContainerType: FooterPageContainerType
}

const PreFooterContent = () => {
    return (
        <>
            <footer className="bg-white dark:bg-gray-900 w-screen">
                
            </footer>
        </>

    )
}

export default function WebFooter({
    pageContainerType = 'contained',
}: FooterProps) {
    return (
        <Footer pageContainerType='gutterless' />
    )
}

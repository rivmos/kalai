import Dropdown from '@/components/ui/Dropdown'
import HorizontalMenuNavLink from './HorizontalMenuNavLink'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export type HorizontalMenuItemProps = {
    nav: {
        key: string
        title: string
        translateKey: string
        icon: string
        iconSrc?: string
        path: string
        isExternalLink?: boolean
    }
}

const HorizontalMenuDropdownItem = ({ nav }: HorizontalMenuItemProps) => {
    const { title, iconSrc, translateKey, path, key, isExternalLink } = nav

    const { t } = useTranslation()

    const itemTitle = t(translateKey, title)
    const renderIconSrc = iconSrc && <span className='header-image-icon'><img src={iconSrc} className="" /></span>

    return (
        <Dropdown.Item eventKey={key} className={classNames(path && 'px-0')}>
            {path ? (
                <HorizontalMenuNavLink
                    path={path}
                    className={classNames(path && 'px-2')}
                    isExternalLink={isExternalLink}
                >
                    {renderIconSrc}
                    {itemTitle}
                </HorizontalMenuNavLink>
            ) : (
                <span className="flex items-center gap-2">
                    {renderIconSrc}
                    {itemTitle}
                </span>
            )}
        </Dropdown.Item>
    )
}

export default HorizontalMenuDropdownItem

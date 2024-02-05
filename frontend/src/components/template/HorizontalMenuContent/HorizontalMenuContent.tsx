// import navigationConfig from '@/configs/navigation.config'
import Dropdown from '@/components/ui/Dropdown'
import AuthorityCheck from '@/components/shared/AuthorityCheck'
import HorizontalMenuItem from './HorizontalMenuItem'
import HorizontalMenuDropdownItem from './HorizontalMenuDropdownItem'
import { NavigationTree } from '@/@types/navigation'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { useTranslation } from 'react-i18next'
import type { NavMode } from '@/@types/theme'
import useAuth from '@/utils/hooks/useAuth'

type HorizontalMenuContentProps = {
    manuVariant: NavMode
    navigationTree?:NavigationTree[],
    userAuthority?: string[],
}

const HorizontalMenuContent = ({
    manuVariant,
    userAuthority = [],
    navigationTree = []
}: HorizontalMenuContentProps) => {
    const { t } = useTranslation()
    const {authenticated} = useAuth()

    return (
        <span className="flex items-center gap-10">
            {navigationTree.map((nav) => {
                if (
                    nav.type === NAV_ITEM_TYPE_TITLE ||
                    nav.type === NAV_ITEM_TYPE_COLLAPSE
                ) {
                    return (
                        <AuthorityCheck
                            key={nav.key}
                            authority={nav.authority}
                            userAuthority={userAuthority}
                        >
                            <Dropdown
                                trigger="hover"
                                renderTitle={
                                    <HorizontalMenuItem
                                        manuVariant={manuVariant}
                                        nav={nav}
                                        
                                    />
                                }
                                menuClass="bg-[url('/img/web/dd.png')]"
                            >
                                {nav.subMenu.map((secondarySubNav) => (
                                    <AuthorityCheck
                                        key={secondarySubNav.key}
                                        authority={secondarySubNav.authority}
                                        userAuthority={userAuthority}
                                    >
                                        {secondarySubNav.subMenu.length > 0 ? (
                                            <Dropdown.Menu
                                                title={t(
                                                    secondarySubNav.translateKey,
                                                    secondarySubNav.title
                                                )}
                                            >
                                                {secondarySubNav.subMenu.map(
                                                    (tertiarySubNav) => (
                                                        <AuthorityCheck
                                                            key={
                                                                tertiarySubNav.key
                                                            }
                                                            authority={
                                                                tertiarySubNav.authority
                                                            }
                                                            userAuthority={
                                                                userAuthority
                                                            }
                                                        >
                                                            <HorizontalMenuDropdownItem
                                                                nav={
                                                                    tertiarySubNav
                                                                }
                                                            />
                                                        </AuthorityCheck>
                                                    )
                                                )}
                                            </Dropdown.Menu>
                                        ) : (
                                            <HorizontalMenuDropdownItem
                                                key={secondarySubNav.key}
                                                nav={secondarySubNav}
                                            />
                                        )}
                                    </AuthorityCheck>
                                ))}
                            </Dropdown>
                        </AuthorityCheck>
                    )
                }
                if (nav.type === NAV_ITEM_TYPE_ITEM) {
                    return (
                        <AuthorityCheck
                            key={nav.key}
                            authority={nav.authority}
                            userAuthority={userAuthority}
                        >
                            <HorizontalMenuItem
                                isLink
                                nav={nav}
                                manuVariant={manuVariant}
                            />
                        </AuthorityCheck>
                    )
                }
                return <></>
            })}
        </span>
    )
}

export default HorizontalMenuContent

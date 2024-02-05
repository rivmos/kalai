import HorizontalMenuContent from '@/components/template/HorizontalMenuContent'
import useResponsive from '@/utils/hooks/useResponsive'
import { useAppSelector } from '@/store'
import { ADMIN, USER } from '@/constants/roles.constant'
import webNavigationConfig from '@/configs/navigation.config/web.navigation.config'

const WebHorizontalNav = () => {
    const mode = useAppSelector((state) => state.theme.mode)
    const userAuthority = [ADMIN, USER]

    const { larger } = useResponsive()

    return (
        <>
            {larger.md && (
                <HorizontalMenuContent
                    manuVariant={mode}
                    userAuthority={userAuthority}
                    navigationTree={webNavigationConfig}
                />
            )}
        </>
    )
}

export default WebHorizontalNav

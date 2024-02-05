import { forwardRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { CgSpinner } from 'react-icons/cg'
import type { CommonProps } from '../@types/common'
import type { ElementType } from 'react'
import Mainloader from './Mainloader'
import { ImSpinner2 } from "react-icons/im";
import { TbLoader3 } from "react-icons/tb";


export interface SpinnerProps extends CommonProps {
    color?: string
    enableTheme?: boolean
    indicator?: ElementType
    isSpining?: boolean
    size?: string | number
}

const Spinner = forwardRef((props: SpinnerProps, ref) => {
    const {
        className,
        color,
        enableTheme = true,
        indicator: Component = TbLoader3,
        isSpining = true,
        size = 20,
        style,
        ...rest
    } = props

    const { themeColor, primaryColorLevel } = useConfig()

    const spinnerColor =
        color || (enableTheme && `${themeColor}-${primaryColorLevel}`)

    const spinnerStyle = {
        height: size,
        width: size,
        ...style,
    }

    const spinnerClass = classNames(
        isSpining && 'animate-spin',
        spinnerColor && `text-${spinnerColor}`,
        className
    )

    return (
        <div>
        <Component
            ref={ref}
            style={spinnerStyle}
            className={classNames(spinnerClass)}
            {...rest}
        />
        {/* <Mainloader /> */}
        </div>
    )
})

Spinner.displayName = 'Spinner'

export default Spinner

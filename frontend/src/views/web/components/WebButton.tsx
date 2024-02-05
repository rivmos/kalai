import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

const WebButton = ({ buttonLink, buttonText, type }: { buttonLink: string | undefined, buttonText: string | undefined, type: 'line' | 'full' }) => {
    return (
        <a className={classNames('cursor-pointer inline-block mt-1',{ 'btn': type === 'full' }, { 'btn-txt': type === 'line' })} href={buttonLink}>{buttonText} <img src="/img/web/btn-right-arrow.png" alt="" /></a>
    )
}   

export default WebButton
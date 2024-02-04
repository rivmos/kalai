import React from 'react'
import Header from './Header'
import Logo from './Logo'
import WebHorizontalNav from './WebHorizontalNav'

const HeaderStart = () => {
    return (
        <Logo className='!w-32 !my-4' />
    )
}


const WebHeader = () => {
    return (
        <div>
            <Header className='container mx-auto flex items-center h-24 w-full' headerStart={<HeaderStart />} headerEnd={<WebHorizontalNav />} />
        </div>
    )
}

export default WebHeader
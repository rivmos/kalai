import React from 'react'
import WebButton from './WebButton'
import classNames from 'classnames'

interface propsInterface {
    heading?: string,
    largeHeading?: string,
    subHeading?: string,
    isImage: Boolean,
    showButton: Boolean,
    imageSrc?: string,
    contendtext?: string,
    lbtnText?: string,
    lbtnLink?: string,
    rbtnText?: string,
    rbtnLink?: string,
    direction: 'ltr' | 'rtl'
}

const PageHeader = (props: propsInterface) => {
    const { heading, largeHeading, subHeading, isImage, imageSrc, contendtext, lbtnText, lbtnLink, rbtnText, rbtnLink, showButton, direction } = props
    return (
        <div className='container mx-auto service-first-sec'>
            <div className='first-inner-blog'>
                <div className="row">
                    <div className={classNames("col-md-6", {"order-2" : direction === 'rtl'})}>
                        <h5>{heading}</h5>       
                        <h2>{largeHeading}</h2>
                        <p>{subHeading}</p>
                    {showButton &&    <WebButton  buttonLink={lbtnLink} buttonText={lbtnText} type='full'  />}
                    </div>
                    {isImage ? <div className={classNames("col-md-6 flex", {'justify-end':direction==='ltr'}, {'justify-start':direction==='rtl'})}>
                        <img src={imageSrc}  />
                    </div> : <div className="col-md-6">
                        <span>
                            {contendtext}
                        </span>
                        <a href={rbtnLink} className="btn-txt cursor-pointer">
                            {rbtnText}
                        </a>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default PageHeader
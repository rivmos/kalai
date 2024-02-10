import React, { useEffect, useState } from 'react'
import reducer, { getArtworkDetail, useAppDispatch, useAppSelector } from './store'
import { useParams } from 'react-router-dom'
import { injectReducer } from '@/store'

injectReducer('profile', reducer)


const Artwork = () => {

    const { id } = useParams()

    const dispatch = useAppDispatch()
    const artwork = useAppSelector(state => state.profile.data.artwork)
    const [showBio, setShowBio] = useState(false)

    useEffect(() => {
        dispatch(getArtworkDetail(id as string))
    }, [])

    console.log(artwork)

    const Feature = ({title, value} : {title:string, value?: string | number}) => {
        return(
            <div className='flex items-center gap-2'>
                <span>{title}: </span> <label> {value}</label>
            </div>
        )
    }

    return (
        <div>
            <header className="bg-white p-8">
                <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
                    <div className="row-start-2 lg:row-auto">
                        <h1 className="block antialiased tracking-normal font-sans font-semibold text-blue-gray-900 mb-4 lg:text-5xl !leading-tight text-3xl">{artwork?.title}</h1>
                        <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mb-4 !text-gray-500 md:pr-16 xl:pr-28">{artwork?.description}</p>
                        <div className="grid">
                            <Feature title='Item Code' value={artwork?.itemCode}/>
                            <Feature title='Price' value={artwork?.price}/>
                            <Feature title='Delivery' value={artwork?.deliveredAs}/>
                            <Feature title='Medium' value={artwork?.medium}/>
                            <Feature title='Size' value={`${artwork?.height} x ${artwork?.width} ${artwork?.sizeUnit}`}/>
                            <Feature title='Year' value={artwork?.createdIn}/>                            
                           
                        </div>
                        {/* <p className="block antialiased font-sans text-sm leading-normal text-inherit font-normal !text-gray-500">Read <a href="#" className="font-medium underline transition-colors">Terms and Conditions</a></p> */}
                    </div>
                    <img alt="team work" loading="lazy" width="1024" height="1024" decoding="async" data-nimg="1" className="h-[36rem] w-full rounded-xl object-cover" src={artwork?.imageUrl} />
                </div>
            </header>
            {/* <header className="bg-white p-8">
                <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
                    <div className="row-start-2 lg:row-auto">
                        <h1 className="block antialiased tracking-normal font-sans font-semibold text-blue-gray-900 mb-4 lg:text-5xl !leading-tight text-3xl">Welcome to my Web <br /> Development Portofolio!</h1>
                        <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mb-4 !text-gray-500 md:pr-16 xl:pr-28">I'm Lily Smith, a passionate web developer based in USA. Here, you'll get a glimpse of my journey in the world of web development, where creativity meets functionality.</p>
                        <div className="grid">
                            <p className="block antialiased font-sans text-sm leading-normal mb-2 text-gray-900 font-medium">Your email</p>
                            <div className="mb-2 flex w-full flex-col gap-4 md:w-10/12 md:flex-row">
                                <div className="relative w-full min-w-[200px] h-11"><input className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900" placeholder=" " /><label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Enter your email </label></div>
                                <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full px-4 md:w-[12rem]" type="button">require offer</button>
                            </div>
                        </div>
                        <p className="block antialiased font-sans text-sm leading-normal text-inherit font-normal !text-gray-500">Read my <a href="#" className="font-medium underline transition-colors">Terms and Conditions</a></p>
                    </div>
                    <img alt="team work" loading="lazy" width="1024" height="1024" decoding="async" data-nimg="1" className="h-[36rem] w-full rounded-xl object-cover" src="/nextjs-tailwind-portfolio-page/image/image-7.svg" />
                </div>
            </header> */}
        </div>
    )
}

export default Artwork
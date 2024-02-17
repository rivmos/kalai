import React, { useEffect, useState } from 'react'
import reducer, { getArtworkDetail, useAppDispatch, useAppSelector } from './store'
import { useParams } from 'react-router-dom'
import { injectReducer } from '@/store'
import { baseUrl } from '@/configs/app.config'

// Import Swiper React components
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import useResponsive from '@/utils/hooks/useResponsive'

injectReducer('profile', reducer)


const Artwork = () => {

    const { id } = useParams()

    const dispatch = useAppDispatch()
    const artwork = useAppSelector(state => state.profile.data.artwork)
    const [showBio, setShowBio] = useState(false)

    useEffect(() => {
        dispatch(getArtworkDetail(id as string))
    }, [])

    const Feature = ({ title, value }: { title: string, value?: string | number }) => {
        return (
            <div className='flex items-center gap-2'>
                <span>{title}: </span> <label> {value}</label>
            </div>
        )
    }

    const getImageName = (path: string) => {
        return path.slice(path.indexOf('/backend') + ('/backend').length);
    }

    const { larger } = useResponsive()

    return (
        <div>
            <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
                <div>
                    <h1 className="block antialiased tracking-normal font-sans font-semibold text-blue-gray-900 mb-4 lg:text-5xl !leading-tight text-3xl">{artwork?.title}</h1>
                    <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mb-4 !text-gray-500 md:pr-16 xl:pr-28">{artwork?.description}</p>
                    <div className="grid">
                        <Feature title='Item Code' value={artwork?.itemCode} />
                        <Feature title='Price' value={artwork?.price} />
                        <Feature title='Delivery' value={artwork?.deliveredAs} />
                        <Feature title='Medium' value={artwork?.medium} />
                        <Feature title='Size' value={`${artwork?.height} x ${artwork?.width} ${artwork?.sizeUnit}`} />
                        <Feature title='Year' value={artwork?.createdIn} />

                    </div>
                </div>

                <div>
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        autoplay
                        slidesPerView={larger.sm === false ? 1 : larger.md === false ? 1 : 2}
                        onSwiper={(swiper) => { }}
                        className='h-[300px]'
                    >
                        {
                            artwork?.imageUrls?.map((imageName, index) => {
                                return (
                                    <SwiperSlide >
                                        <img src={baseUrl + getImageName(imageName)} alt=" random imgee" className="w-full h-[250px] object-cover rounded-lg shadow-md" />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Artwork
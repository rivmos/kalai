import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Button } from '@/components/ui';
import { getArtists, useAppDispatch, useAppSelector } from '../store';
import { Link } from 'react-router-dom';

const ShopByArtist = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getArtists())
    }, [])
    const artists = useAppSelector(state => state.home.data.artists)
    const [autoPlay, setAutoPlay] = useState(true)
    return (
        <>
            <div className='container mx-auto py-32'>
                <h2 className="text-3xl font-bold uppercase text-center tracking-tight text-gray-700 sm:text-4xl">Artists</h2>
                <p className='text-center mt-2 text-base'>Discover from a curated collection of works by renowned Indian artists</p>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={20}
                    autoplay={autoPlay}
                    slidesPerView={4}
                    onSwiper={(swiper) => console.log(swiper.autoplay)}
                    className='my-16 h-[300px]'
                    onMouseEnter={(swiper) => console.log(swiper)}
                >
                    {
                        artists.map((artist, index) => {
                            return (
                                <SwiperSlide className='cursor-pointer'>
                                    {/* <img src={`/img/banner/${index + 1}.jpg`} className='object-cover h-[300px] hover:scale-125 transition-all duration-1000' />
                                        <div>{artist.name}</div> */}
                                    <Link to={`/web/profile/${artist.id}`}>
                                        <div className="text-gray-700">
                                            <img src={`/img/banner/${index + 1}.jpg`} alt=" random imgee" className="w-full h-[250px] object-cover rounded-lg shadow-md" />

                                            <div className="relative px-8 -mt-8  ">
                                                <div className="bg-white p-4 rounded-lg shadow-lg">
                                                    <h4 className="mt-1 text-xl capitalize text-center leading-tight text-gray-700 truncate">{artist.name}</h4>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <div className='flex justify-center'>
                    <Button variant='solid' className='!text-gray-800'>View All Artists</Button>
                </div>
            </div>
        </>
    )
}

export default ShopByArtist
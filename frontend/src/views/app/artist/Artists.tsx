import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Button } from '@/components/ui';
import reducer, { getArtists, setSelectedArtist, useAppDispatch, useAppSelector } from './store';
import { Link } from 'react-router-dom';
import useResponsive from '@/utils/hooks/useResponsive';
import { Loading } from '@/components/shared';
import { injectReducer } from '@/store';

injectReducer('formSlice', reducer)

const Artists = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getArtists())
    }, [])

    const artists = useAppSelector(state => state.formSlice.data.artists)
    const loading = useAppSelector(state => state.formSlice.data.loading)

    return (
        <>
            <div>
                <h2 className="text-3xl font-semibold uppercase tracking-tight text-gray-700 sm:text-4xl text-orange-900 mb-8">Artists</h2>
                <Loading loading={loading}>
                    <div className='grid grid-cols-4 gap-4'>
                        {
                            artists?.map((artist, index) => {
                                return (
                                    <div key={artist.id} className='cursor-pointer'>
                                        <div className="text-gray-700">
                                            <img src={artist?.artworks[0]?.imageUrl?.[0] ? artist?.artworks[0]?.imageUrl?.[0] : `/img/banner/${index}.jpg`} alt=" random imgee" className="w-full h-[250px] object-cover rounded-lg shadow-md" />

                                            <div className="relative px-4 -mt-8  ">
                                                <div className="bg-white p-4 rounded-lg shadow-lg">
                                                    <h4 className="mt-1 text-base capitalize text-center leading-tight text-gray-700 truncate">{artist.name}</h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='mt-4 flex items-center gap-4'>
                                            <Link to={`/web/profile/${artist.id}`} >
                                                <Button className='w-full'>View</Button>
                                            </Link>
                                            <Link to=''>
                                                <Button className='w-full' onClick={() => dispatch(setSelectedArtist(artist.id))}>Edit</Button>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Loading>
            </div >
        </>
    )
}

export default Artists
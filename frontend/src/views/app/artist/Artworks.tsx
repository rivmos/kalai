import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui';
import reducer, { getArtworks, setSelectedArtist, useAppDispatch, useAppSelector } from './store';
import { Link } from 'react-router-dom';
import useResponsive from '@/utils/hooks/useResponsive';
import { Loading } from '@/components/shared';
import { injectReducer } from '@/store';
import { baseUrl } from '@/configs/app.config';

injectReducer('formSlice', reducer)

const Artworks = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getArtworks())
    }, [])

    const artworks = useAppSelector(state => state.formSlice.data.artworks)
    const loading = useAppSelector(state => state.formSlice.data.loading)


    const getImageName = (path: string) => {
        return path.slice(path.indexOf('/backend') + ('/backend').length);
    }


    return (
        <>
            <div>
                <h2 className="text-3xl font-semibold uppercase tracking-tight text-gray-700 sm:text-4xl text-orange-900 mb-8">Artworks</h2>
                <Loading loading={loading}>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4'>
                        {
                            artworks?.map((artwork, index) => {
                                return (
                                    <div key={artwork.id} className='cursor-pointer'>
                                        <div className="text-gray-700">
                                            <img src={baseUrl + getImageName(artwork?.imageUrls?.[0] as string)} alt=" random imgee" className="w-full h-[250px] object-cover rounded-lg shadow-md" />

                                            <div className="relative px-4 -mt-8  ">
                                                <div className="bg-white p-4 rounded-lg shadow-lg">
                                                    <h4 className="mt-1 text-base capitalize text-center leading-tight text-gray-700 truncate">{artwork.title}</h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='mt-4 flex items-center gap-4'>
                                            <Link to={`/web/artworks/${artwork.id}`} >
                                                <Button className='w-full'>View</Button>
                                            </Link>
                                            <Link to=''>
                                                <Button className='w-full' onClick={() => dispatch(setSelectedArtist(artwork.id))}>Edit</Button>
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

export default Artworks
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui';
import reducer, { getArtists, setSelectedArtist, useAppDispatch, useAppSelector, removeArtist} from './store';
import { Link } from 'react-router-dom';
import { Loading } from '@/components/shared';
import { injectReducer } from '@/store';
import { apiDeleteArtist } from '@/services/ArtistService';
import { baseUrl } from '@/configs/app.config';

injectReducer('formSlice', reducer)

const Artists = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getArtists())
    }, [])

    const artists = useAppSelector(state => state.formSlice.data.artists)
    const loading = useAppSelector(state => state.formSlice.data.loading)

    const deleteArtist = async (data: string) => {
        const res = await apiDeleteArtist<{ status: boolean, message: string }>(data)
        if(res.status === 200){
            dispatch(removeArtist(data))
        }
        return { data: res.data, status: res.status }
    }
    
    const getImageName = (path: string) => {
        return path?.slice(path?.indexOf('/backend') + ('/backend').length);
    }

    return (
        <>
            <div>
                <h2 className="text-3xl font-semibold uppercase tracking-tight text-gray-700 sm:text-4xl text-orange-900 mb-8">Artists</h2>
                <Loading loading={loading}>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4'>
                        {
                            artists?.map((artist, index) => {
                                return (
                                    <div key={artist.id} className='cursor-pointer'>
                                        <div className="text-gray-700">
                                            <img src={baseUrl + getImageName(artist?.artworks[0]?.imageUrls?.[0] as string)} alt=" random imgee" className="w-full h-[250px] object-cover rounded-lg shadow-md" />

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
                                            <Button className='w-full' onClick={() => deleteArtist(artist.id)}>Delete</Button>
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
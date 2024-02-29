import React, { useEffect } from 'react';
import reducer, { getArtistProfile, useAppDispatch, useAppSelector } from '../ArtistEdit/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { injectReducer } from '@/store';
import Profile from '@/components/template/Profile';

injectReducer('artistEditSlice', reducer)

const ArtistProfile = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const artistData = useAppSelector(
        (state) => state.artistEditSlice.data.artistData
    )
    const loading = useAppSelector(
        (state) => state.artistEditSlice.data.loading
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getArtistProfile(data))
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <Profile artistData={artistData}/>
    );
};

export default ArtistProfile;

import { ArtistState, ArtworkState } from '@/@types/artist'
import { apiGetArtistProfile, apiGetArtworkDetail } from '@/services/ArtistService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export type ProfileState = {
    loading: boolean
    profile?: ArtistState
    artwork?: ArtworkState
}

export const SLICE_NAME = 'profile'

export const getArtistProfile = createAsyncThunk(
    SLICE_NAME + '/getArtistProfile',
    async (data: {id:string}) => {
        const response = await apiGetArtistProfile<
            ArtistState, {id:string}
        >(data)
        return response.data
    }
)

export const getArtworkDetail = createAsyncThunk(
    SLICE_NAME + '/getArtworkDetail',
    async (id:string) => {
        const response = await apiGetArtworkDetail<
            ArtworkState
        >(id)
        return response.data
    }
)

const initialState: ProfileState = {
    loading: false,
    profile: {
        artworks: [],
        name: '',
        bio: '',
        website: '',
        id: ''
    },
    artwork: {
        id:0,
        title: '',
        description: '',
        category:0,
        imageUrls: [],
        artist: '',
        width: 0,
        height: 0,
        sizeUnit: '',
        price: 0,
        medium: '',
        deliveredAs:'',
        createdIn:0,
        itemCode:0,
        isSold:false
    }
}

const projectListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getArtistProfile.fulfilled, (state, action) => {
                state.profile = action.payload
                state.loading = false
            })
            .addCase(getArtistProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(getArtworkDetail.fulfilled, (state, action) => {
                state.artwork = action.payload
                state.loading = false
            })
            .addCase(getArtworkDetail.pending, (state) => {
                state.loading = true
            })
    },
})

export default projectListSlice.reducer

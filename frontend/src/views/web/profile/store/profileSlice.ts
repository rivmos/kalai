import { Artist } from '@/@types/artist'
import { apiGetArtistProfile, apiGetArtists } from '@/services/ArtistService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export type ProfileState = {
    loading: boolean
    profile?: Artist
}

export const SLICE_NAME = 'profile'

export const getArtistProfile = createAsyncThunk(
    SLICE_NAME + '/getArtistProfile',
    async (id:string) => {
        const response = await apiGetArtistProfile<
            Artist
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
    },
})

export default projectListSlice.reducer

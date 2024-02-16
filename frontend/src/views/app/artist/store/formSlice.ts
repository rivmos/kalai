import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomerDetails,
    apiDeleteCrmCustomer,
    apPutCrmCustomer,
} from '@/services/CrmService'

import { UserDataState } from '@/views/web/company/AboutUs/store'
import { apiGetUserProfile } from '@/services/UserService'
import { Artist, Artwork, Category } from '@/@types/artist'
import { apiGetArtistProfile, apiGetArtists, apiGetCategories } from '@/services/ArtistService'

export const SLICE_NAME = 'formSlice'

export type FormSliceState = {
    loading: boolean
    artists: Artist[]
    categories: Category[],
    artist: Artist
    artworkId: number
    artistId: number
}

const initialState: FormSliceState = {
    loading: false,
    artists: [],
    categories: [],
    artist: {
        artworks: [],
        name: '',
        bio: '',
        website: '',
        id: ''
    },
    artworkId: 0,
    artistId: 0
}


export const getArtists = createAsyncThunk(
    SLICE_NAME + '/getArtists',
    async () => {
        const response = await apiGetArtists<
            Artist[]
        >()
        return response.data
    }
)

export const getCategories = createAsyncThunk(
    SLICE_NAME + '/getCategories',
    async () => {
        const response = await apiGetCategories<
            Category[]
        >()
        return response.data
    }
)

export const getArtistProfile = createAsyncThunk(
    SLICE_NAME + '/getArtistProfile',
    async (id:string) => {
        const response = await apiGetArtistProfile<
            Artist
        >(id)
        return response.data
    }
)


const formSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        addArtwork: (state, action: PayloadAction<Artwork>) => {
            state.artist.artworks.push(action.payload)
        },
        resetArtworks: (state) => {
            state.artist.artworks = []
        },
        setSelectedArtwork: (state, action) => {
            state.artworkId = action.payload
        },
        setSelectedArtist: (state, action) => {
            state.artworkId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArtists.fulfilled, (state, action) => {
                state.artists = action.payload
                state.loading = false
            })
            .addCase(getArtists.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload
                state.loading = false
            })
            .addCase(getCategories.pending, (state) => {
                state.loading = true
            })
            .addCase(getArtistProfile.fulfilled, (state, action) => {
                state.artist = action.payload
                state.loading = false
            })
            .addCase(getArtistProfile.pending, (state) => {
                state.loading = true
            })
    },
})

export const { addArtwork, resetArtworks, setSelectedArtwork, setSelectedArtist } = formSlice.actions

export default formSlice.reducer

import { Artist, Category } from '@/@types/artist'
import { apiGetArtists, apiGetCategories } from '@/services/ArtistService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export type HomeState = {
    loading: boolean
    artists: Artist[]
    categories: Category[]
}

export const SLICE_NAME = 'home'

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


const initialState: HomeState = {
    loading: false,
    artists: [],
    categories: []
}

const projectListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
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
    },
})

export default projectListSlice.reducer

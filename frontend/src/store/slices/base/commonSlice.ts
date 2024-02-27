import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { Artists, Categories, CategoryState } from '@/@types/artist'
import { apiGetAllCategories, apiGetCategories } from '@/services/CategoryService'
import { apiGetAllArtists } from '@/services/ArtistService'

export type CommonState = {
    loading: boolean
    currentRouteKey: string
    categories: Categories
    allArtists: Artists
}

export const initialState: CommonState = {
    loading: false,
    currentRouteKey: '',
    categories: [],
    allArtists:[]
}

export const getAllCategories = createAsyncThunk(
    SLICE_BASE_NAME + '/getAllCategories',
    async () => {
        const response = await apiGetAllCategories<
            Categories
        >()
        return response.data
    }
)


export const getAllArtists = createAsyncThunk(
    SLICE_BASE_NAME + '/getAllArtists',
    async () => {
        const response = await apiGetAllArtists<
            Artists
        >()
        return response.data
    }
)



export const commonSlice = createSlice({
    name: `${SLICE_BASE_NAME}/common`,
    initialState,
    reducers: {
        setCurrentRouteKey: (state, action: PayloadAction<string>) => {
            state.currentRouteKey = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload
                state.loading = false
            })
            .addCase(getAllCategories.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllArtists.fulfilled, (state, action) => {
                state.allArtists = action.payload
                state.loading = false
            })
            .addCase(getAllArtists.pending, (state, action) => {
                state.loading = true
            })
    }
})

export const { setCurrentRouteKey } = commonSlice.actions

export default commonSlice.reducer

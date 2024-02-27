import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteSalesProducts,
} from '@/services/SalesService'
import { ArtworkState } from '@/@types/artist'
import { apiAddArtwork, apiGetArtistProfile, apiGetArtworkDetail } from '@/services/ArtistService'

export type ArtworkEditState = {
    loading: boolean
    artworkData: ArtworkState
}

type GetArtworkDetailResponse = ArtworkState

export const SLICE_NAME = 'artworkEditSlice'

export const getProduct = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async (data: { id: string }) => {
        const response = await apiGetArtworkDetail<
        GetArtworkDetailResponse,
            { id: string }
        >(data)
        return response.data
    }
)

export const updateProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiAddArtwork<T, U>(data)
    return response.data
}

export const deleteProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteSalesProducts<T, U>(data)
    return response.data
}

const initialState: ArtworkEditState = {
    loading: true,
    artworkData: {},
}

const artistEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (state, action) => {
                state.artworkData = action.payload
                state.loading = false
            })
            .addCase(getProduct.pending, (state) => {
                state.loading = true
            })
    },
})

export default artistEditSlice.reducer

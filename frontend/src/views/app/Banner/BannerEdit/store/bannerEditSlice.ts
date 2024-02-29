import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProduct,
    apiPutSalesProduct,
    apiDeleteSalesProducts,
} from '@/services/SalesService'
import { BannerState } from '@/@types/artist'
import { apiAddBannerImage, apiGetSingleBannerImage } from '@/services/BannerService'


export type BannerEditState = {
    loading: boolean
    categoryData: BannerState
}

type GetSingleBannerImageResponse = BannerState

export const SLICE_NAME = 'bannerEditSlice'

export const getSingleBannerImage = createAsyncThunk(
    SLICE_NAME + '/getSingleBannerImage',
    async (data: { id: string }) => {
        const response = await apiGetSingleBannerImage<
            GetSingleBannerImageResponse,
            { id: string }
        >(data)
        return response.data
    }
)

export const updateProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiAddBannerImage<T, U>(data)
    return response.data
}

export const deleteProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteSalesProducts<T, U>(data)
    return response.data
}

const initialState: BannerEditState = {
    loading: true,
    categoryData: {},
}

const categoryEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSingleBannerImage.fulfilled, (state, action) => {
                state.categoryData = action.payload
                state.loading = false
            })
            .addCase(getSingleBannerImage.pending, (state) => {
                state.loading = true
            })
    },
})

export default categoryEditSlice.reducer

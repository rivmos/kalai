import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProduct,
    apiPutSalesProduct,
    apiDeleteSalesProducts,
} from '@/services/SalesService'
import { ArtistState, CategoryState } from '@/@types/artist'
import { apiAddCategory } from '@/services/ArtistService'
import { apiGetSingleCategory } from '@/services/CategoryService'


export type CategoryEditState = {
    loading: boolean
    categoryData: CategoryState
}

type GetSingleCategoryResponse = CategoryState

export const SLICE_NAME = 'categoryEditSlice'

export const getSingleCategory = createAsyncThunk(
    SLICE_NAME + '/getSingleCategory',
    async (data: { id: string }) => {
        const response = await apiGetSingleCategory<
            GetSingleCategoryResponse,
            { id: string }
        >(data)
        return response.data
    }
)

export const updateProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiAddCategory<T, U>(data)
    return response.data
}

export const deleteProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteSalesProducts<T, U>(data)
    return response.data
}

const initialState: CategoryEditState = {
    loading: true,
    categoryData: {},
}

const categoryEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSingleCategory.fulfilled, (state, action) => {
                state.categoryData = action.payload
                state.loading = false
            })
            .addCase(getSingleCategory.pending, (state) => {
                state.loading = true
            })
    },
})

export default categoryEditSlice.reducer

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { CategoryState } from '@/@types/artist'
import { apiGetCategories } from '@/services/CategoryService'

export type CommonState = {
    loading: boolean
    currentRouteKey: string
    categories: CategoryState[]
}

export const initialState: CommonState = {
    loading: false,
    currentRouteKey: '',
    categories: []
}

export const getCategories = createAsyncThunk(
    SLICE_BASE_NAME + '/getCategories',
    async () => {
        const response = await apiGetCategories<
            { data: CategoryState[], total: number }
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
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload.data
                state.loading = false
            })
            .addCase(getCategories.pending, (state, action) => {
                state.loading = true
            })
    }
})

export const { setCurrentRouteKey } = commonSlice.actions

export default commonSlice.reducer

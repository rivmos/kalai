import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetHome } from '@/services/WebService'
import { HomePageState } from '../../types/types'

export type DataState = {
    loading: boolean
    data: HomePageState
}

export const SLICE_NAME = 'homePage'
export const getHome = createAsyncThunk(
    SLICE_NAME + '/getHome',
    async () => {
        const response = await apiGetHome<
            any
        >()
        return response.data
    }
)

const initialState: DataState = {
    loading: false,
    data: {},
}

const homePageSlice = createSlice({
    name: `${SLICE_NAME}`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHome.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(getHome.pending, (state) => {
                state.loading = true
            })
    },
})


export default homePageSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetBannerData } from '@/services/WebService'

export type SingleBannerDataState = {
    id:number,
    title:string,
    description:string
}

export type SliceState = {
    bannerData: SingleBannerDataState[]
    loading: boolean
}

export const SLICE_NAME = 'homePage';

export const getBannerData = createAsyncThunk(SLICE_NAME + '/getBannerData',async () => {
    // assume someService required reesponse & require type as generic
    const response = await apiGetBannerData<SingleBannerDataState[]>()
    return response.data
})

const initialState: SliceState = {
    bannerData: [],
    loading: false
}

const homeSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getBannerData.fulfilled, (state, action) => {
            state.bannerData = action.payload
            state.loading = false
        })
        .addCase(getBannerData.pending, (state) => {
            state.loading = true
        })
        .addCase(getBannerData.rejected, (state) => {
            state.loading = false
        })
    },
})

export default homeSlice.reducer
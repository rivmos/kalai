import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomerDetails,
    apiDeleteCrmCustomer,
    apPutCrmCustomer,
} from '@/services/CrmService'

import { UserDataState } from '@/views/web/company/AboutUs/store'
import { apiGetUserProfile } from '@/services/UserService'
import { Artwork } from '@/@types/artist'

export const SLICE_NAME = 'formSlice'

export type FormSliceState = {
    loading: boolean,
    artworks:Artwork[]
}

const initialState: FormSliceState = {
    loading: false,
    artworks:[]
}

const customerDetailSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
       addArtwork: (state, action:PayloadAction<Artwork>) => {
            state.artworks.push(action.payload)
       },
       resetArtworks:(state) => {
            state.artworks = []
       }
    },
    extraReducers: (builder) => {
        // builder
        //     .addCase(getUserProfile.fulfilled, (state, action) => {
        //         state.loading = false
        //         state.profileData = action.payload.userdetail[0]
        //     })
        //     .addCase(getUserProfile.pending, (state) => {
        //         state.loading = true
        //     })
    },
})

export const {addArtwork, resetArtworks} = customerDetailSlice.actions

export default customerDetailSlice.reducer

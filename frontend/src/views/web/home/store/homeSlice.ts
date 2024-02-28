import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export type HomeState = {
    loading: boolean
}

export const SLICE_NAME = 'home'


const initialState: HomeState = {
    loading: false,
}

const projectListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    },
})

export default projectListSlice.reducer

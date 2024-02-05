import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { apiGetUserActivity } from '@/services/UserService'
import { UserActivityState } from '@/@types/user'

export type CommonState = {
    loading: boolean
    currentRouteKey: string
    userActivity: UserActivityState[]
}

export const initialState: CommonState = {
    loading: false,
    currentRouteKey: '',
    userActivity: []
}

export const getUserActivity = createAsyncThunk(
    SLICE_BASE_NAME + 'getUserActivity', 
    async (userId: number) => {
        const res = await apiGetUserActivity<{status:boolean, message:string, data:UserActivityState[]}>(userId)
        return res.data
    }
)

// export const getUserActivity = createAsyncThunk(
//     SLICE_NAME + '/getUserActivity',
//     async (userId: number) => {
//         const response =
//             await apiGetUserActivity<{ success: boolean, message:string, data: UserActivityState[] }>(userId)
//         return response.data
//     }
// )


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
            .addCase(getUserActivity.fulfilled, (state, action) => {
                state.userActivity = action.payload.data
                state.loading = false
            })
            .addCase(getUserActivity.pending, (state, action) => {
                state.loading = true
            }) 
    }
})

export const { setCurrentRouteKey } = commonSlice.actions

export default commonSlice.reducer

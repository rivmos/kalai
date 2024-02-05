import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME } from './homeSlice'
import { useSelector } from 'react-redux'

import type { SliceState } from './homeSlice'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

// create useAppSelector hook combining RootState & your new added state
export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: SliceState
        },
    }
> = useSelector

export * from './homeSlice'
export { useAppDispatch } from '@/store'

export default reducer
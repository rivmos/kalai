import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, HomeState } from './homeSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: HomeState
        }
    }
> = useSelector

export * from './homeSlice'
export { useAppDispatch } from '@/store'
export default reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProducts,
    apiDeleteSalesProducts,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'
import {  CategoryState } from '@/@types/artist'
import { apiDeleteArtist, apiGetArtists } from '@/services/ArtistService'
import { apiGetCategories } from '@/services/CategoryService'

type Categories = CategoryState[]

type GetCategoriesResponse = {
    data: Categories
    total: number
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type SalesProductListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedArtist: string
    tableData: TableQueries
    filterData: FilterQueries
    categoryList: Categories
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'categoryListSlice'

export const getProducts = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async (data: GetSalesProductsRequest) => {
        const response = await apiGetSalesProducts<
            GetCategoriesResponse,
            GetSalesProductsRequest
        >(data)
        return response.data
    }
)

export const getCategories = createAsyncThunk(
    SLICE_NAME + '/getCategories',
    async () => {
        const response = await apiGetCategories<
            GetCategoriesResponse
        >()
        return response.data
    }
)

export const deleteProduct = async (data: { id: string | string[] }) => {
    const response = await apiDeleteSalesProducts<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

export const deleteArtist = async (data: { id: string | string[] }) => {
    const response = await apiDeleteArtist<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}


export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const initialState: SalesProductListState = {
    loading: false,
    deleteConfirmation: false,
    selectedArtist: '',
    categoryList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const categoryListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.categoryList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedArtist: (state, action) => {
            state.selectedArtist = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(getProducts.fulfilled, (state, action) => {
            //     state.artistList = action.payload.data
            //     state.tableData.total = action.payload.total
            //     state.loading = false
            // })
            // .addCase(getProducts.pending, (state) => {
            //     state.loading = true
            // })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categoryList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getCategories.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedArtist,
} = categoryListSlice.actions

export default categoryListSlice.reducer

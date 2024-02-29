import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProducts,
    apiDeleteSalesProducts,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'
import {  Banners, GetBannerImagesResponse } from '@/@types/artist'
import { apiDeleteBannerImage, apiGetBannerImages } from '@/services/BannerService'

type GetCategoriesResponse = {
    data: Banners
    total: number
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type BannerListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedCategory: string
    tableData: TableQueries
    filterData: FilterQueries
    bannersList: Banners
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }
type GetBannerImagesRequest = {
    pageIndex?: number
    pageSize?: number
    query?: string
}

export const SLICE_NAME = 'bannerListSlice'

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

export const getBannerImages = createAsyncThunk(
    SLICE_NAME + '/getBannerImages',
    async (data:GetBannerImagesRequest) => {
        const response = await apiGetBannerImages<
            GetBannerImagesResponse,
            GetBannerImagesRequest
        >(data)
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

export const deleteCategory = async (data: { id: string | string[] }) => {
    const response = await apiDeleteBannerImage<
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

const initialState: BannerListState = {
    loading: false,
    deleteConfirmation: false,
    selectedCategory: '',
    bannersList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const bannerListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.bannersList = action.payload
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
        setSelectedBannerImage: (state, action) => {
            state.selectedCategory = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBannerImages.fulfilled, (state, action) => {
                state.bannersList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getBannerImages.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedBannerImage,
} = bannerListSlice.actions

export default bannerListSlice.reducer

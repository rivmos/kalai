import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProducts,
    apiDeleteSalesProducts,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'
import { ArtworkState } from '@/@types/artist'
import { apiDeleteArtist, apiGetArtworks } from '@/services/ArtistService'
import { apiGetCategories } from '@/services/CategoryService'

type Artworks = ArtworkState[]

type GetArtworksResponse = {
    data: Artworks
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
    selectedArtwork: string
    tableData: TableQueries
    filterData: FilterQueries
    artworkList: Artworks
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'artworkListSlice'

export const getProducts = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async (data: GetSalesProductsRequest) => {
        const response = await apiGetSalesProducts<
            GetArtworksResponse,
            GetSalesProductsRequest
        >(data)
        return response.data
    }
)

export const getArtworks = createAsyncThunk(
    SLICE_NAME + '/getArtworks',
    async () => {
        const response = await apiGetArtworks<
            GetArtworksResponse
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
    selectedArtwork: '',
    artworkList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const artworkListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.artworkList = action.payload
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
        setSelectedArtwork: (state, action) => {
            state.selectedArtwork = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArtworks.fulfilled, (state, action) => {
                state.artworkList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getArtworks.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedArtwork,
} = artworkListSlice.actions

export default artworkListSlice.reducer

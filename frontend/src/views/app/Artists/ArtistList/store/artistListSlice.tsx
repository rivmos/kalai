import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProducts,
    apiDeleteSalesProducts,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'
import { ArtistState } from '@/@types/artist'
import { apiDeleteArtist, apiGetArtists } from '@/services/ArtistService'


type Product = {
    id: string
    name: string
    productCode: string
    img: string
    category: string
    price: number
    stock: number
    status: number
}

type Products = Product[]

type Artists = ArtistState[]

type GetArtistsResponse = {
    data: Artists
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
    artistList: Artists
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'artistListSlice'

export const getProducts = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async (data: GetSalesProductsRequest) => {
        const response = await apiGetSalesProducts<
            GetArtistsResponse,
            GetSalesProductsRequest
        >(data)
        return response.data
    }
)

export const getArtists = createAsyncThunk(
    SLICE_NAME + '/getArtists',
    async () => {
        const response = await apiGetArtists<
            GetArtistsResponse
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
    artistList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const artistListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.artistList = action.payload
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
            .addCase(getArtists.fulfilled, (state, action) => {
                state.artistList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getArtists.pending, (state) => {
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
} = artistListSlice.actions

export default artistListSlice.reducer

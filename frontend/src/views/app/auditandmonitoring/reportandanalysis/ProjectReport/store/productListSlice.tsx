import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetReportsAnalysisProducts,
    apiDeleteSalesProducts,
} from '@/services/ReportsAnalysis'
import type { TableQueries } from '@/@types/common'

type Product = {
    id: number;
    sno: number;
    name: string;
    //username: string;
    country: string; // You may need to adjust the type based on the actual data
    project_service: string; // You may need to adjust the type based on the actual data
    specific_service: string; // You may need to adjust the type based on the actual data
    podname: string; // You may need to adjust the type based on the actual data
    startdate: string; // You may need to adjust the type based on the actual data
    duedate: string; // You may need to adjust the type based on the actual data
    industryname: string;
    projectstatus: string;
    
}

type Products = Product[]

type GetSalesProductsResponse = {
    data: Products
    total: number
}

type FilterQueries = {
    name: string
    /* category: string[]
    status: number[]
    productStatus: number */
}

export type ReportsAnalysisProductListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    productList: Product[]
}

type GetReportAnalysisProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'reportsanalysisProductList'

export const getProducts = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async (data: GetReportAnalysisProductsRequest) => {
        const response = await apiGetReportsAnalysisProducts<
            GetSalesProductsResponse,
            GetReportAnalysisProductsRequest
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

const initialState: ReportsAnalysisProductListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    productList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
       /*  category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0, */
    },
}

const productListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.productList = action.payload
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
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.productList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,
} = productListSlice.actions

export default productListSlice.reducer

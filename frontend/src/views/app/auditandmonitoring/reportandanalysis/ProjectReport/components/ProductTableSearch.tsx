import { useRef } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import {
    getProducts,
    setTableData,
    useAppSelector,
    useAppDispatch,
} from '../store'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import type { TableQueries } from '@/@types/common'
import type { ChangeEvent } from 'react'
import DatePicker from '@/components/ui/DatePicker'
const { DatePickerRange } = DatePicker 

const ProductTableSearch = () => {
    const dispatch = useAppDispatch()

    const searchInput = useRef(null)

    const tableData = useAppSelector(
        (state) => state.reportsanalysisProductList.data.tableData
    )

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val: string) {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data: TableQueries) => {
        dispatch(setTableData(data))
        dispatch(getProducts(data))
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }
    const onEditDate = (value: [Date | null, Date | null]) => {
        const implodedString = value[0]+','+value[1];
        debounceFn(implodedString) 
    }   

    return (
        <>
        <Input
            ref={searchInput}
            className="md:mb-0 mb-4"
            size="l"
            placeholder="Search product"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
        <DatePickerRange                
                onChange={onEditDate}               
                placeholder="Start And End Date"
            />
        </>
    )
}

export default ProductTableSearch
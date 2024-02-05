import { useState } from 'react'
import { useRef } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import {
    getManualLogList,
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

type StartDate = {
    StartDate : string
}
type EndDate = {
    EndDate : string
}
const ManualLogTableSearch = () => {
    const dispatch = useAppDispatch()

    const searchInput = useRef(null)

    const tableData = useAppSelector(
        (state) => state.ManualLogList.data.tableData
    )

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val: string) {
        const newTableData = cloneDeep(tableData)
        //console.log(val)
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
        dispatch(getManualLogList(data))
    }
    const onEdit = (value: [Date | null, Date | null]) => {
        const implodedString = value[0]+','+value[1];
        debounceFn(implodedString) 
    }   
    return (
     
        <DatePickerRange                
                onChange={onEdit}               
                placeholder="Start And End Date"
            />
    )
}

export default ManualLogTableSearch

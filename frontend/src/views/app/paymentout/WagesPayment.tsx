import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import { PieChart } from '@mui/x-charts/PieChart';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef, ColumnSort } from '@tanstack/react-table'
import DatePicker from '@/components/ui/DatePicker'
import { string } from 'yup'
import '../../../assets/styles/custom.css';


const COLORS = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];

type Option = {
  value: number
  label: string
}

const options: Option[] = [
  { value: 5, label: '5 / page' },
  { value: 10, label: '10 / page' },
  { value: 20, label: '20 / page' },
  { value: 50, label: '50 / page' },
]

const columns: ColumnDef<{ sno: number; name: string; project: string; billablehours: number; performancebonus: number; performancedeductions: number; performanceretentions: number; totalamount: number; totaldue: number; netpayable: number; view: string; }, any>[] = [
  {
    header: 'S.No',
    accessorKey: 'sno',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Project',
    accessorKey: 'project',
  },
  {
    header: 'Billable Hours',
    accessorKey: 'billablehours',
  },
  {
    header: 'Performance Bonus',
    accessorKey: 'performancebonus',
  },
  {
    header: 'Performance Deductions',
    accessorKey: 'performancedeductions',
  },
  {
    header: 'Performance Retentions ',
    accessorKey: 'performanceretentions',
  },
  {
    header: 'Total Amount',
    accessorKey: 'totalamount',
  },
  {
    header: 'Total Due',
    accessorKey: 'totaldue',
  },
  {
    header: 'Net Payable ',
    accessorKey: 'netpayable',
  },
  {
    header: 'View',
    accessorKey: 'view',
  },
];

const data = [
  {
    sno: 1,
    name: "harpreet singh",
    project: "podjinn tool",
    billablehours: 28,
    performancebonus: 2453,
    performancedeductions: 5343,
    performanceretentions: 3654,
    totalamount: 7291.84,
    totaldue: 7346,
    netpayable: 434,
    view: ""
  },
  {
    sno: 2,
    name: "sandeep singh",
    project: "podjinn tool",
    billablehours: 28,
    performancebonus: 56424,
    performancedeductions: 423,
    performanceretentions: 5343,
    totalamount: 7291.84,
    totaldue: 7346,
    netpayable: 434,
    view: ""
  },
  {
    sno: 3,
    name: "somveer singh",
    project: "podjinn tool",
    billablehours: 28,
    performancebonus: 674,
    performancedeductions: 532,
    performanceretentions: 453,
    totalamount: 7284,
    totaldue: 346,
    netpayable: 43644,
    view: ""
  },
  {
    sno: 4,
    name: "sumit singh",
    project: "podjinn tool",
    billablehours: 28,
    performancebonus: 24323,
    performancedeductions: 322,
    performanceretentions: 7675,
    totalamount: 7293,
    totaldue: 736,
    netpayable: 4434,
    view: ""
  },
]

const { Tr, Th, Td, THead, TBody, Sorter } = Table
const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
  { value: 'blue', label: 'Blue', color: '#0052CC' },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630' },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
]


const WagesPayment = () => {
  const [pageSize, setPageSize] = useState(options[0].value)
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const { DatePickerRange } = DatePicker

  const onPageSelect = ({ value }: Option) => {
    setPageSize(value)
  }
  const [sorting, setSorting] = useState<ColumnSort[]>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },

    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
 

  return (
    <div>
      <Card className='mb-4 top-container flex'>
        <div className="mr-auto">
          <h3>Wages Payment</h3>
        </div>
      </Card>
      <div className='row pb-6 pt-6'>
        <div className='col-md-4'>
          <h4 className='pb-2'>Date</h4>
          <DatePickerRange
            dateViewCount={2}
            placeholder="Multiple date view"
          />
        </div>
        <div className='col-md-4'>
          <h4 className='pb-2'>Project</h4>
          <Select
            size="sm"
            className="mb-4 custom-select"
            placeholder="Please Select"
            options={colourOptions}
          ></Select>
        </div>
      </div>
      <div className='cta-section flex justify-between mb-4'>
        <div className='flex items-center justify-center'>
          <Button className="w-40" variant="twoTone" color="#7460ee" style={{ backgroundColor: '#7460ee', color: "white" }}>
            Search
          </Button>
          <Button className="w-40 ml-2">
            Reset
          </Button>
        </div>
        <div className='container flex justify-end'>
          <div className="flex-column items-center">
            <h4 className="pb-2">In Process</h4>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                  ],
                },
              ]}
              width={300}
              height={150}
            />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row mt-4 mb-12 w-70 mr-8 pb-8 pt-4'>
          <div className='col-md-3'>
            <h4 className=" pb-6" style={{ color: "#926cf2" }}>Work In Progress</h4>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                  ],
                },
              ]}
              width={300}
              height={150}
            />
            <label>1-3 Days</label>
          </div>
          <div className='col-md-3'>
            <h4 className=" pb-6" style={{ color: "#926cf2" }}>In Audit </h4>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                  ],
                },
              ]}
              width={300}
              height={150}
            />
            <label>7-4 Days</label>
          </div>
          <div className='col-md-3'>
            <h4 className=" pb-6" style={{ color: "#926cf2" }}>In Review</h4>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                  ],
                },
              ]}
              width={300}
              height={150}
            />
            <label>14-21 Days</label>
          </div>
          <div className='col-md-3'>
            <h4 className=" pb-6" style={{ color: "#926cf2" }}>Paid</h4>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                  ],
                },
              ]}
              width={300}
              height={150}
            />
            <label>21-38 Days</label>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row mt-12 mb-12 w-70 mr-8 pb-8 pt-12'>
          <div className='col-md-4'>
            <h3 style={{ color: "#926cf2" }}>Total Log Time:</h3>
          </div>
          <div className='col-md-4'>
            <h3 style={{ color: "#fc4b6c" }}>Non-Billable Time:</h3>
          </div>
          <div className='col-md-4'>
            <h3 style={{ color: "#06d73e" }}>Billable Time:</h3>
          </div>
        </div>
      </div>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="table-header"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className:
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                          onClick:
                            header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef
                            .header,
                          header.getContext()
                        )}
                        {
                          <Sorter
                            sort={header.column.getIsSorted()}
                          />
                        }
                      </div>
                    )}
                  </Th>
                )
              })}
            </Tr>
          ))}
        </THead>
        <TBody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id} className="table-data">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
        </TBody>
      </Table>
      <div className="flex items-center justify-center mt-16 mb-6">
        <Pagination displayTotal pageSize={pageSize} total={100} />
        <div style={{ minWidth: 120 }}>
          <Select
            size="sm"
            isSearchable={false}
            defaultValue={options[0]}
            options={options}
            onChange={selected => onPageSelect(selected as Option)}
          />
        </div>
      </div>
    </div>
  )
}

export default WagesPayment



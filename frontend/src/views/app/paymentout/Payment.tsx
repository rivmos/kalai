import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Chart from 'react-apexcharts'
import Checkbox from '@/components/ui/Checkbox'
import { FaEye } from 'react-icons/fa';
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
type Person = {
  user: string;
  projectevent: string;
  taskeventtype: number;
  view: number;
  totaltimelogged: string;
  nonbillabletime: string;
  billabletime: string;
  netpayable: string;
  balancepayable: string;
  status: string;
}
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

const columns: ColumnDef<Person>[] = [
  {
    header: 'User',
    accessorKey: 'user',
  },
  {
    header: 'Project Event',
    accessorKey: 'projectevent',
  },
  {
    header: 'View',
    accessorKey: 'view',
    cell: () => (
      <div className="view-icon-cell">
        <FaEye className="view-icon" style={{ color: '#06b8c1 ' }} data-target="#exampleModal" />
      </div>
    ),
  },
  {
    header: 'Task Event Type',
    accessorKey: 'taskeventtype',
  },
  {
    header: 'Total Time Logged',
    accessorKey: 'totaltimelogged',
  },
  {
    header: 'Non Billable Time ',
    accessorKey: 'nonbillabletime',
  },
  {
    header: 'Billable Time',
    accessorKey: 'billabletime',
  },
  {
    header: 'Net Payable ',
    accessorKey: 'netpayable',
  },
  {
    header: 'Balance Payable',
    accessorKey: 'balancepayable',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  }

]

const data = [
  {
    user: 'harpreet singh',
    projectevent: "Podjinn Tools",
    taskeventtype: 24,
    view: 28,
    totaltimelogged: "2:43:00",
    nonbillabletime: '',
    billabletime: "3:10:00",
    netpayable: "7291.84",
    balancepayable: "0.00",
    status: ""
  },
  {
    user: 'harpreet singh',
    projectevent: "Marketing and Payment Integration",
    taskeventtype: 24,
    view: 28,
    totaltimelogged: "4:43:00",
    nonbillabletime: '',
    billabletime: "6:10:00",
    netpayable: "9291.84",
    balancepayable: "0.00",
    status: "not generated"
  },
  {
    user: 'harpreet singh',
    projectevent: "Paul Kabir- Event Management Hybrid App",
    taskeventtype: 24,
    view: 28,
    totaltimelogged: "5:43:00",
    nonbillabletime: '',
    billabletime: "6:30:00",
    netpayable: "4291.84",
    balancepayable: "0.00",
    status: "not generated"
  },
  {
    user: 'harpreet singh',
    projectevent: "Paul Kabir- Event Management Hybrid App",
    taskeventtype: 24,
    view: 28,
    totaltimelogged: "6:43:00",
    nonbillabletime: '',
    billabletime: "7:30:00",
    netpayable: "2291.84",
    balancepayable: "0.00",
    status: "not generated"
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

const wagesTypeOptions = [
  { value: 'logtime', label: 'Log time' },
  { value: 'manuallogtime', label: 'Manual Log Time' },
  { value: 'meetinlogtime', label: 'Meeting Log Time' },
  { value: 'milestonepayment', label: 'Milestone Payment' },

]

const Payment = () => {
  const [pageSize, setPageSize] = useState(options[0].value)
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const { DatePickerRange } = DatePicker
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

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

  const seriesData = [44, 65];
  const seriesData2 = [55, 35];
  const seriesData3 = [41, 98];
  const seriesData4 = [41, 98];

  const chartOptions = {
    colors: COLORS,
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: number) {
          return `Total Cost: ${value}`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          colors: COLORS,
          tooltip: {
            enabled: true,
            y: {
              formatter: function (value: number) {
                return `Total Cost: ${value}`;
              },
            },
          },
        },
      },
    ],
  };

  const chartOptions2 = {
    colors: COLORS,
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: number) {
          return `Total Audit Amount: ${value}`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          colors: COLORS,
          tooltip: {
            enabled: true,
            y: {
              formatter: function (value: number) {
                return `Total Audit Amount: ${value}`;
              },
            },
          },
        },
      },
    ],
  };

  const chartOptions3 = {
    colors: COLORS,
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: number) {
          return `Total Wages Amount: ${value}`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          colors: COLORS,
          tooltip: {
            enabled: true,
            y: {
              formatter: function (value: number) {
                return `Total Wages Amount: ${value}`;
              },
            },
          },
        },
      },
    ],
  };

  const chartOptions4 = {
    colors: COLORS,
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: number) {
          return `Net payable: ${value}`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          colors: COLORS,
          tooltip: {
            enabled: true,
            y: {
              formatter: function (value: number) {
                return `Total Audit Amount: ${value}`;
              },
            },
          },
        },
      },
    ],
  };

  return (
    <div>
    
      <Card className='mb-4 top-container flex'>
        <div className="mr-auto">
          <h3 onClick={handleShow}>Client Payment</h3>
        </div>
      </Card>
      <div className='row pb-6 pt-6'>
        <div className='col-md-4'>
          <h4 className='pb-2'>Statement Period</h4>
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
        <div className='col-md-4'>
          <h4 className='pb-2'>Task List</h4>
          <Select
            size="sm"
            className="mb-4 custom-select"
            placeholder="Please Select"
            options={colourOptions}
          ></Select>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <h4 className='pb-2'>Task </h4>
          <Select
            size="sm"
            className="mb-4 custom-select"
            placeholder="Please Select"
            options={colourOptions}
          ></Select>
        </div>
        <div className='col-md-4'>
          <h4 className='pb-2'>Wages Type</h4>
          <Select
            size="sm"
            className="mb-4 custom-select"
            placeholder="Log Time"
            options={wagesTypeOptions}
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
            <Chart
              options={{
                colors: COLORS,
                labels: [],
                tooltip: {
                  enabled: true,
                  y: {
                    formatter: function (value: number) {
                      return `Total Wages Amount: ${value}`;
                    },
                  },

                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: 'bottom',
                      },
                    },
                  },
                ],
              }}
              series={[44, 55]}
              height={300}
              type="pie"
            />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row mt-4 mb-12 w-70 mr-8 pb-8 pt-4'>
          <div className='col-md-3'>
            <h4 className=" pb-6" style={{ color: "#926cf2" }}>Work In Progress</h4>
            <Chart
              options={chartOptions}
              series={seriesData}
              type="donut"
              height={200}
            />
            <label>1-3 Days</label>
          </div>
          <div className='col-md-3'>
            <h4 className=" pb-6" style={{ color: "#926cf2" }}>In Audit Amonut</h4>
            <Chart
              options={chartOptions2}
              series={seriesData2}
              type="donut"
              height={200}
            />
            <label>7-4 Days</label>
          </div>
          <div className='col-md-3'>
            <h4 className=" pb-6" style={{ color: "#926cf2" }}>In Wages Amonut</h4>
            <Chart
              options={chartOptions3}
              series={seriesData3}
              type="donut"
              height={200}
            />
            <label>14-21 Days</label>
          </div>
          <div className='col-md-3'>
            <h4 className=" pb-6" style={{ color: "#926cf2" }}>Paid Amonut</h4>
            <Chart
              options={chartOptions4}
              series={seriesData4}
              type="donut"
              height={200}
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
      <div className="flex justify mt-6 mb-8">
        <Checkbox value="checkall">Check All </Checkbox>
        <Button className="mr-2 mb-2" variant="solid" color="green-600">
          Submit For Payment
        </Button>
      </div>
    </div>
  )
}

export default Payment



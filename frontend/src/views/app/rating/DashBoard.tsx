
import { useState } from 'react'
import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import '../../../assets/styles/custom.css';
import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


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


const DashBoard = () => {

  const data = [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ]
  return (
    <div>
      <Card className='mb-4 top-container flex'>
        <div className="mr-auto">
          <h3 style={{ color: "#455a64", fontSize: "24px" }}>Rating Dashboard</h3>
        </div>
      </Card>
      <Card className='mt-12'>
        <div className=''>
          <div className='row pt-6 pb-6 justify-content-center'>
            <div className='col-md-3'>
              <div className="max-w-xs">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-center"
                >
                  <div style={{ width: 80, height: 100, marginLeft: "30%" }}>
                    <CircularProgressbar value={66} />
                  </div>
                  <p style={{ fontSize: '15px', paddingTop: "2px" }}>Overall Rating: 7 Out of 10</p>
                  <h5 style={{ color: "#1e88e5", fontWeight: "700" }}>CLIENTS RATING</h5>
                  <p style={{ fontSize: '15px', paddingTop: "10px" }}>GIVEN BY PODJINNS</p>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="max-w-xs">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-center"
                >
                  <div style={{ width: 80, height: 100, marginLeft: "30%" }}>
                    <CircularProgressbar value={66} />
                  </div>
                  <p style={{ fontSize: '15px', paddingTop: "2px" }}>Overall Rating: 4 Out of 10</p>
                  <h5 style={{ color: "#755cff", fontWeight: "700" }}>PODS RATING </h5>
                  <p style={{ fontSize: '15px', paddingTop: "10px" }}>GIVEN BY CLIENTS</p>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="max-w-xs">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-center"
                >
                  <div style={{ width: 80, height: 100, marginLeft: "30%" }}>
                    <CircularProgressbar value={66} />
                  </div>
                  <p style={{ fontSize: '15px', paddingTop: "2px" }}>Overall Rating: 3 Out of 10</p>
                  <h5 style={{ color: "#8c47e2", fontWeight: "700" }}>PODJINN  RATING</h5>
                  <p style={{ fontSize: '15px', paddingTop: "10px" }}>GIVEN BY CLIENTS & JINNS</p>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="max-w-xs">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-center"
                >
                  <div style={{ width: 80, height: 100, marginLeft: "30%" }}>
                    <CircularProgressbar value={66} />
                  </div>
                  <p style={{ fontSize: '15px', paddingTop: "2px" }}>Overall Rating: 9 Out of 10</p>
                  <h5 style={{ color: "#9398f6", fontWeight: "700" }}>JINN RATING</h5>
                  <p style={{ fontSize: '15px', paddingTop: "10px" }}>GIVEN BY PODJINNS</p>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className=''>
          <div className='row pt-2'>
            <div className='col-md-3 pt-4'>
              <p className='pb-2' style={{ fontWeight: "300" }}>Project</p>
              <Select
                size="sm"
                placeholder="Please Select"
                options={colourOptions}
              ></Select>
            </div>
            <div className='col-md-3'>
              <p className='pb-2' style={{ fontWeight: "300" }}>Client</p>
              <Select
                size="sm"
                placeholder="Please Select"
                options={colourOptions}
              ></Select>
            </div>
            <div className='col-md-3'>
              <p className='pb-2'>Pods</p>
              <Select
                size="sm"
                placeholder="Please Select"
                options={colourOptions}
              ></Select>
            </div>
            <div className='col-md-3'>
              <p className='pb-2'>Podjinns </p>
              <Select
                size="sm"
                placeholder="Please Select"
                options={colourOptions}
              ></Select>
            </div>
          </div>
        </div>
        <div className='cta-section flex justify-between mb-4 pt-6'>
          <div className='flex items-center justify-center pb-4 pt-6'>
            <Button className="w-40" size="md" variant="twoTone" color="#7460ee" style={{ backgroundColor: '#7460ee', color: "white" }}>
              Search
            </Button>
            <Button className="w-40 ml-2" size="md" style={{ backgroundColor: "#465161", color: "white" }}>
              Reset
            </Button>
          </div>
        </div>
        <div className=''>
          <div className='row pb-12 pt-6'>
            <div className='col-md-6'>
              <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out text-center"
              >
                <h3 className="pb-6" style={{ color: "#455a64", fontSize: "24px", marginRight: "60%" }}>Project Rating</h3>
                <Chart
                  options={{
                    plotOptions: {
                      bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        borderRadius: 4,
                      },
                    },
                    colors: COLORS,
                    dataLabels: {
                      enabled: false,
                    },
                    stroke: {
                      show: true,
                      width: 2,
                      colors: ['transparent'],
                    },
                    xaxis: {
                      categories: [
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                      ],
                    },
                    fill: {
                      opacity: 1,
                    },
                    tooltip: {
                      y: {
                        formatter: (val) => `$${val} thousands`,
                      },
                    },
                  }}
                  series={data}
                  height={300}
                  type="bar"
                />
              </Card>
            </div>
            <div className='col-md-6'>
              <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out text-center"
              >
                <h3 className="pb-6" style={{ color: "#455a64", fontSize: "24px", marginRight: "60%" }}>Podjinn Rating</h3>
                <Chart
                  options={{
                    plotOptions: {
                      bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        borderRadius: 4,
                      },
                    },
                    colors: COLORS,
                    dataLabels: {
                      enabled: false,
                    },
                    stroke: {
                      show: true,
                      width: 2,
                      colors: ['transparent'],
                    },
                    xaxis: {
                      categories: [
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                      ],
                    },
                    fill: {
                      opacity: 1,
                    },
                    tooltip: {
                      y: {
                        formatter: (val) => `$${val} thousands`,
                      },
                    },
                  }}
                  series={data}
                  height={300}
                  type="bar"
                />
              </Card>
            </div>
          </div>
        </div>
        <div className='mt-6'>
          <div className=''>
            <Table>
              <THead>
                <Tr>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Client Name</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Project</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Podjinn Rating</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Pod Rating</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Project Rating</Th>
                </Tr>
              </THead>
              <TBody style={{ fontSize: "18px" }}>
                <Tr>
                  <Td>Alfreds Futterkiste</Td>
                  <Td>Maria Anders</Td>
                  <Td>Germany</Td>
                  <Td>Germany</Td>
                  <Td>Germany</Td>
                </Tr>
                <Tr>
                  <Td>Centro comercial Moctezuma</Td>
                  <Td>Francisco Chang</Td>
                  <Td>Mexico</Td>
                  <Td>Francisco Chang</Td>
                  <Td>Francisco Chang</Td>
                </Tr>
                <Tr>
                  <Td>Ernst Handel</Td>
                  <Td>Roland Mendel</Td>
                  <Td>Austria</Td>
                  <Td>Mexico</Td>
                  <Td>Mexico</Td>
                </Tr>
                <Tr>
                  <Td>Ernst Handel</Td>
                  <Td>Roland Mendel</Td>
                  <Td>Austria</Td>
                  <Td>Mexico</Td>
                  <Td>Mexico</Td>
                </Tr>
                <Tr>
                  <Td>Ernst Handel</Td>
                  <Td>Roland Mendel</Td>
                  <Td>Austria</Td>
                  <Td>Mexico</Td>
                  <Td>Mexico</Td>
                </Tr>
                <Tr>
                  <Td>Ernst Handel</Td>
                  <Td>Roland Mendel</Td>
                  <Td>Austria</Td>
                  <Td>Mexico</Td>
                  <Td>Mexico</Td>
                </Tr>
                <Tr>
                  <Td>Ernst Handel</Td>
                  <Td>Roland Mendel</Td>
                  <Td>Austria</Td>
                  <Td>Mexico</Td>
                  <Td>Mexico</Td>
                </Tr>
              </TBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DashBoard



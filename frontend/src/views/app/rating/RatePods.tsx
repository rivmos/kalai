
import { useState } from 'react'
import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import '../../../assets/styles/custom.css';
import Chart from 'react-apexcharts'
import Pagination from '@/components/ui/Pagination'
import Rating from '@mui/material/Rating';
import { COLORS } from '@/constants/chart.constant'
import Button from '@/components/ui/Button'
import Popup from "reactjs-popup";
import Input from '@/components/ui/Input'
import 'reactjs-popup/dist/index.css';

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


const RatePods = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onPaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const cardData = [
    { rating: 7, text: 'Overall Rating: 7 Out of 10', label: 'CLIENTS RATING', givenBy: 'GIVEN BY PODJINNS' },

  ];

  const visibleCards = cardData.slice(startIndex, endIndex);

  const data = [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 53, 89, 97],
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 75, 97],
    },
    {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 54, 75, 45],
    },
  ]

  return (
    <div>
      <div className="modal-design">
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="modal-reset">
            <button className="close" onClick={closeModal}>
              &times;
            </button>
            <Card
              header={<span>Rate POD</span>}
              headerClass="font-semibold text-lg text-indigo-600"
              bodyClass="text-center"
              footerClass="flex flex-col-reverse justify-end items-end"
            >
              <div className=''>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>Skills</h5>
                  </div>
                  <div className='col-md-4'>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  </div>
                </div>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>Quality of Work</h5>
                  </div>
                  <div className='col-md-4'>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  </div>
                </div>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>Availability</h5>
                  </div>
                  <div className='col-md-4'>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  </div>
                </div>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>Adherence to Schedule</h5>
                  </div>
                  <div className='col-md-4'>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  </div>
                </div>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>Communication</h5>
                  </div>
                  <div className='col-md-4'>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  </div>
                </div>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>Overall Rating</h5>
                  </div>
                  <div className='col-md-4'>
                    0.0/5
                  </div>
                </div>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>FeedBack</h5>
                  </div>
                  <div className='col-md-4'>
                    <Input placeholder="Text area example" textArea />
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <Button
                  variant="solid"
                  style={{ height: "35px", marginRight: "10px", backgroundColor: "#36b37e" }}
                >
                  Submit
                </Button>
                <Button
                  variant="solid"
                  style={{ height: "35px", marginRight: "10px" }}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        </Popup>
      </div>
      <Card className='mb-4 top-container flex'>
        <div className="mr-auto">
          <h3 style={{ color: "#455a64", fontSize: "24px" }}>Rating Pods</h3>
        </div>
      </Card>
      <div className=''>
        <div className='row pt-2'>
          <div className='col-md-3 pt-4'>
            <Select
              size="md"
              placeholder="All"
              options={colourOptions}
            ></Select>
          </div>
        </div>
      </div>
      <div className=''>
        <div className='row pb-12 pt-6'>
          <div className='col-md-12'>
            <Card
              clickable
              className="hover:shadow-lg transition duration-150 ease-in-out text-center"
            >
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
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      "Dec"
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
      <Card className='mb-4 top-container flex'>
        <div className='rate-pods-sec'>
          <div className='row'>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/ceo.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-2.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-16.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-3.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-4.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-5.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-6.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-7.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-8.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-9.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-10.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-11.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-13.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-14.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h5 className="rate-pods-heading">Podjinn Team</h5>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 className='rate-pods-heading4 '>Over All : 2</h4>
                  <img
                    src="/img/avatars/thumb-15.jpg"
                    alt="Podjinn Team"
                   className='rate-pods-img'
                  />
                  <Button variant="solid" className='rate-pods-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 pagination-container mt-6'>
              <Pagination onChange={onPaginationChange} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default RatePods


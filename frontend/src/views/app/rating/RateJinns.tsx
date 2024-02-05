import { useState } from 'react'
import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import '../../../assets/styles/custom.css';
import Rating from '@mui/material/Rating';
import Table from '@/components/ui/Table'
import Popup from "reactjs-popup";
import Button from '@/components/ui/Button'
import 'reactjs-popup/dist/index.css';

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

const Ratejinn = () => {

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

  return (
    <div>
      <div className="modal-design">
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="modal-reset">
            <button className="close" onClick={closeModal}>
              &times;
            </button>
            <Card
              header={<span>Princy Jain</span>}
              headerClass="font-semibold text-lg text-indigo-600"
              bodyClass="text-center"
              footerClass="flex justify-end"
            >
              <div className='conatiner'>
                <div className='row' style={{ fontSize: "18px" }}>
                  <div className='col-md-3'>Pod</div>
                  <div className='col-md-3'>Project's Name</div>
                  <div className='col-md-3'>Rate By</div>
                  <div className='col-md-3'>Comment</div>
                </div>
                <div className='row' style={{ fontSize: "18px" }}>
                  <div className='col-md-3'>Podjinn project</div>
                  <div className='col-md-3'>Pipe Dream Contentful Integration's</div>
                  <div className='col-md-3'>Not Rated Yet !</div>
                  <div className='col-md-3'><Button variant="solid">Rate jinn</Button></div>
                </div>
              </div>
              <div className='col-md-3'><Button variant="solid" onClick={closeModal}>Close</Button></div>
            </Card>
          </div>
        </Popup>
      </div>
      <Card className='mb-4 top-container flex'>
        <div className="mr-auto">
          <h3 style={{ color: "#455a64", fontSize: "24px" }}>Ratings Jinns</h3>
        </div>
      </Card>
      <div className=''>
        <div className='row mt-2'>
          <div className='col-md-3 mt-6'>
            <Select
              size="md"
              placeholder="All"
              options={colourOptions}
            ></Select>
          </div>
        </div>
      </div>
      <Card className='mb-6 top-container flex mt-6' style={{ height: '60px', backgroundColor: "#926cf2", width: "100%" }}>
        <div className="mr-auto">
          <h3 style={{ fontSize: "24px", color: "white" }}>Top 5 High Rated Jinns </h3>
        </div>
      </Card>
      <Card className='mb-4 top-container rate-secc'>
        <div className='rate-jinn'>
          <div className='row'>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px' }}>Upendra Prasad Chaurasia</h4>
                  <h4 style={{ fontSize: '15px', paddingBottom: "2px" }}>tech@maxxmann.in</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <img
                    src="/img/avatars/ceo.jpg"
                    alt="Podjinn Team"
                    className='rating-jinn-card-img'
                  />
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px' }}>Upendra Prasad Chaurasia</h4>
                  <h4 style={{ fontSize: '15px', paddingBottom: "2px" }}>tech@maxxmann.in</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <img
                    src="/img/avatars/ceo.jpg"
                    alt="Podjinn Team"
                    className='rating-jinn-card-img '
                  />
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px' }}>Upendra Prasad Chaurasia</h4>
                  <h4 style={{ fontSize: '15px', paddingBottom: "2px" }}>tech@maxxmann.in</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <img
                    src="/img/avatars/ceo.jpg"
                    alt="Podjinn Team"
                    className='rating-jinn-card-img '
                  />
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px' }}>Upendra Prasad Chaurasia</h4>
                  <h4 style={{ fontSize: '15px', paddingBottom: "2px" }}>tech@maxxmann.in</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <img
                    src="/img/avatars/ceo.jpg"
                    alt="Podjinn Team"
                    className='rating-jinn-card-img '
                  />
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px' }}>Upendra Prasad Chaurasia</h4>
                  <h4 style={{ fontSize: '15px', paddingBottom: "2px" }}>tech@maxxmann.in</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <img
                    src="/img/avatars/ceo.jpg"
                    alt="Podjinn Team"
                    className='rating-jinn-card-img '
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
        <Card className='mb-2 top-container flex mt-4' style={{ height: '60px', backgroundColor: "#926cf2", width: "100%", marginBottom: "32px" }}>
          <div className="mr-auto">
            <h3 style={{ fontSize: "24px", color: "white" }}>All Jinns </h3>
          </div>
        </Card>
        <div className='row pb-6 mb-6'>
          <div className='col-md-12'>
            <Table style={{ width: "100%" }}>
              <THead>
                <Tr>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Jinn </Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Project</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Task</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Over all</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>E-mail</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Date</Th>
                  <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Actions</Th>
                </Tr>
              </THead>
              <TBody style={{ fontSize: "18px" }}>
                <Tr>
                  <Td style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/img/avatars/ceo.jpg"
                      alt="Jinn Image"
                      className='rating-jinn-table-img'
                    />
                    <span style={{ marginLeft: '10px' }}>Admin</span>
                  </Td>
                  <Td>Project</Td>
                  <Td>Task</Td>
                  <Td>0.5</Td>
                  <Td>admin@maxxmann.in</Td>
                  <Td>12/12/2020</Td>
                  <Td><Button variant="solid" size="sm" onClick={openModal}>View</Button></Td>
                </Tr>
                <Tr>
                  <Td style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/img/avatars/ceo.jpg"
                      alt="Jinn Image"
                      className='rating-jinn-table-img'
                    />
                    <span style={{ marginLeft: '10px' }}>Admin</span>
                  </Td>
                  <Td>Project</Td>
                  <Td>Task</Td>
                  <Td>0.5</Td>
                  <Td>admin@maxxmann.in</Td>
                  <Td>12/12/2020</Td>
                  <Td><Button variant="solid" size="sm" onClick={openModal}>View</Button></Td>
                </Tr>
                <Tr>
                  <Td style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/img/avatars/ceo.jpg"
                      alt="Jinn Image"
                      className='rating-jinn-table-img'
                    />
                    <span style={{ marginLeft: '10px' }}>Admin</span>
                  </Td>
                  <Td>Project</Td>
                  <Td>Task</Td>
                  <Td>0.5</Td>
                  <Td>admin@maxxmann.in</Td>
                  <Td>12/12/2020</Td>
                  <Td><Button variant="solid" size="sm" onClick={openModal}>View</Button></Td>
                </Tr>
                <Tr>
                  <Td style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/img/avatars/ceo.jpg"
                      alt="Jinn Image"
                      className='rating-jinn-table-img'
                    />
                    <span style={{ marginLeft: '10px' }}>Admin</span>
                  </Td>
                  <Td>Project</Td>
                  <Td>Task</Td>
                  <Td>0.5</Td>
                  <Td>admin@maxxmann.in</Td>
                  <Td>12/12/2020</Td>
                  <Td><Button variant="solid" size="sm" onClick={openModal}>View</Button></Td>
                </Tr>
                <Tr>
                  <Td style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/img/avatars/ceo.jpg"
                      alt="Jinn Image"
                      className='rating-jinn-table-img'
                    />
                    <span style={{ marginLeft: '10px' }}>Admin</span>
                  </Td>
                  <Td>Project</Td>
                  <Td>Task</Td>
                  <Td>0.5</Td>
                  <Td>admin@maxxmann.in</Td>
                  <Td>12/12/2020</Td>
                  <Td><Button variant="solid" size="sm" onClick={openModal}>View</Button></Td>
                </Tr>
                <Tr>
                  <Td style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/img/avatars/ceo.jpg"
                      alt="Jinn Image"
                      className='rating-jinn-table-img'
                    />
                    <span style={{ marginLeft: '10px' }}>Admin</span>
                  </Td>
                  <Td>Project</Td>
                  <Td>Task</Td>
                  <Td>0.5</Td>
                  <Td>admin@maxxmann.in</Td>
                  <Td>12/12/2020</Td>
                  <Td><Button variant="solid" size="sm" onClick={openModal}>View</Button></Td>
                </Tr>
                <Tr>
                  <Td style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/img/avatars/ceo.jpg"
                      alt="Jinn Image"
                      className='rating-jinn-table-img'
                    />
                    <span style={{ marginLeft: '10px' }}>Admin</span>
                  </Td>
                  <Td>Project</Td>
                  <Td>Task</Td>
                  <Td>0.5</Td>
                  <Td>admin@maxxmann.in</Td>
                  <Td>12/12/2020</Td>
                  <Td><Button variant="solid" size="sm" onClick={openModal}>View</Button></Td>
                </Tr>
              </TBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Ratejinn


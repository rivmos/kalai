
import { useState } from 'react'
import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import '../../../assets/styles/custom.css';
import Rating from '@mui/material/Rating';
import Popup from "reactjs-popup";
import Input from '@/components/ui/Input'
import 'reactjs-popup/dist/index.css';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';

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


const RateProjects = () => {

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
              header={<span>Rate Project</span>}
              headerClass="font-semibold text-lg text-indigo-600"
              bodyClass="text-center"
              footerClass="flex flex-col-reverse justify-end items-end"
            >
              <div className=''>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>Cost Effective</h5>
                  </div>
                  <div className='col-md-4'>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  </div>
                </div>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>Time Management</h5>
                  </div>
                  <div className='col-md-4'>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  </div>
                </div>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>Performance</h5>
                  </div>
                  <div className='col-md-4'>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  </div>
                </div>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>Creativity</h5>
                  </div>
                  <div className='col-md-4'>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  </div>
                </div>
                <div className='row popup-Bottom'>
                  <div className='col-md-4'>
                    <h5>Hire us again</h5>
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
          <h3 style={{ color: "#455a64", fontSize: "24px" }}>Rating Projects</h3>
        </div>
      </Card>
      <div className=''>
        <div className='row mt-2'>
          <div className='col-md-3 mt-6 d-flex justify-content-end'>
            <Select
              size="md"
              placeholder="All"
              options={colourOptions}
            ></Select>
          </div>
        </div>
      </div>
      <Card className='mt-6'>
        <div className='rating-pod-sec'>
          <div className='row pb-4'>
             <div className='col-md-3'>
              <div className="">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div> 
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr/>
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr/>
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr/>
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr/>
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr/>
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr/>
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="s">
                <Card
                  clickable
                  className="hover:shadow-lg transition duration-150 ease-in-out text-left relative"
                >
                  <h4 style={{ fontSize: '15px', paddingBottom: "12px" }}>Maxxmann Systems-Podjinn Communication Center</h4>{" "}
                  <hr />
                  <h4 style={{ fontSize: '15px', paddingTop: "10px" }}>Over All : 2</h4>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  <Button variant="solid" className='rating-project-button' onClick={openModal}>View</Button>
                </Card>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 pagination-container mb-6'>
              <Pagination onChange={onPaginationChange} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default RateProjects


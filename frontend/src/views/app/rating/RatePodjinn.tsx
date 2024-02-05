import { useState } from 'react'
import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import '../../../assets/styles/custom.css';
import Rating from '@mui/material/Rating';
import Table from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import Popup from "reactjs-popup";
import Input from '@/components/ui/Input'
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


const RatePodjinn = () => {

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
                            header={<span>Rate Podjinn</span>}
                            headerClass="font-semibold text-lg text-indigo-600"
                            bodyClass="text-center"
                            footerClass="flex flex-col-reverse justify-end items-end"
                        >
                            <div className=''>
                                <div className='row popup-Bottom' >
                                    <div className='col-md-4'>
                                        <h5>Quality of work</h5>
                                    </div>
                                    <div className='col-md-4'>
                                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                    </div>
                                </div>
                                <div className='row popup-Bottom' >
                                    <div className='col-md-4'>
                                        <h5>Time Management</h5>
                                    </div>
                                    <div className='col-md-4'>
                                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                    </div>
                                </div>
                                <div className='row popup-Bottom' >
                                    <div className='col-md-4'>
                                        <h5>Responsiveness</h5>
                                    </div>
                                    <div className='col-md-4'>
                                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                    </div>
                                </div>
                                <div className='row popup-Bottom' >
                                    <div className='col-md-4'>
                                        <h5>Communication</h5>
                                    </div>
                                    <div className='col-md-4'>
                                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                    </div>
                                </div>
                                <div className='row popup-Bottom'>
                                    <div className='col-md-4'>
                                        <h5>Behavior</h5>
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
                                <div className='row popup-Bottom' >
                                    <div className='col-md-4'>
                                        <h5>FeedBack</h5>
                                    </div>
                                    <div className='col-md-4'>
                                        <Input placeholder="Text area example" textArea />
                                    </div>
                                </div>
                            </div>
                            <div style={{ position: 'relative'}}>
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
                    <h3 style={{ color: "#455a64", fontSize: "24px" }}>Rating Podjinn</h3>
                </div>
            </Card>
            <div className='qwe'>
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
            <Card className='mb-2 top-container flex mt-6' style={{ height: '60px', backgroundColor: "#926cf2", width: "100%" }}>
                <div className="mr-auto">
                    <h3 style={{ fontSize: "24px", color: "white" }}>Top 5 High Rated Podjinns </h3>
                </div>
            </Card>
            <div className='rate-pods-sec my-6'>
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Card className='mb-2 top-container flex mt-4' style={{ height: '60px', backgroundColor: "#926cf2", width: "100%" }}>
                <div className="mr-auto">
                    <h3 style={{ fontSize: "24px", color: "white" }}>All Podjinns </h3>
                </div>
            </Card>
            <div className='rate-pods-sec my-6'>
                <div className='row pb-6'>
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
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
                                <Button variant="solid" size="sm" className='rating-podjinn-button' onClick={openModal}>Rate Podjinn</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    className='rating-podjinn-img'
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Card>
                <div className='row pb-4'>
                    <div className='col-md-12'>
                        <Table>
                            <THead>
                                <Tr>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Client </Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>jinn</Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Podjinn</Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Project</Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Rate by Client</Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Rate by jinn</Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Rating</Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Date</Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "70px" }}>Reviews</Th>
                                </Tr>
                            </THead>
                            <TBody style={{ fontSize: "18px" }}>
                                <Tr>
                                    <Td>Alfreds Futterkiste</Td>
                                    <Td>Maria Anders</Td>
                                    <Td>Germany</Td>
                                    <Td>Germany</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>19-12-2023</Td>
                                </Tr>
                                <Tr>
                                    <Td>Centro comercial Moctezuma</Td>
                                    <Td>Francisco Chang</Td>
                                    <Td>Mexico</Td>
                                    <Td>Francisco Chang</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>19-12-2023</Td>
                                </Tr>
                                <Tr>
                                    <Td>Ernst Handel</Td>
                                    <Td>Roland Mendel</Td>
                                    <Td>Austria</Td>
                                    <Td>Mexico</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>19-12-2023</Td>
                                </Tr>
                                <Tr>
                                    <Td>Ernst Handel</Td>
                                    <Td>Roland Mendel</Td>
                                    <Td>Austria</Td>
                                    <Td>Mexico</Td>
                                    <Td><Rating name="half-rating" defaultValue={5.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>19-12-2023</Td>
                                </Tr>
                                <Tr>
                                    <Td>Ernst Handel</Td>
                                    <Td>Roland Mendel</Td>
                                    <Td>Austria</Td>
                                    <Td>Mexico</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>19-12-2023</Td>
                                </Tr>
                                <Tr>
                                    <Td>Ernst Handel</Td>
                                    <Td>Roland Mendel</Td>
                                    <Td>Austria</Td>
                                    <Td>Mexico</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>19-12-2023</Td>
                                </Tr>
                                <Tr>
                                    <Td>Ernst Handel</Td>
                                    <Td>Roland Mendel</Td>
                                    <Td>Austria</Td>
                                    <Td>Mexico</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>19-12-2023</Td>
                                </Tr>
                            </TBody>
                        </Table>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default RatePodjinn


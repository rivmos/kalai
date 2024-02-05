import { useState } from 'react'
import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import '../../../assets/styles/custom.css';
import Rating from '@mui/material/Rating';
import Table from '@/components/ui/Table'
import Popup from "reactjs-popup";
import Button from '@/components/ui/Button'
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


const RateClients = () => {

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
                            header={<span>Rate Client</span>}
                            headerClass="font-semibold text-lg text-indigo-600"
                            bodyClass="text-center"
                            footerClass="flex flex-col-reverse justify-end items-end"
                        >
                            <div className=''>
                                <div className='row popup-Bottom'>
                                    <div className='col-md-4'>
                                        <h5>Co-operation</h5>
                                    </div>
                                    <div className='col-md-4'>
                                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                    </div>
                                </div>
                                <div className='row popup-Bottom'>
                                    <div className='col-md-4'>
                                        <h5>Time Availability</h5>
                                    </div>
                                    <div className='col-md-4'>
                                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                    </div>
                                </div>
                                <div className='row popup-Bottom'>
                                    <div className='col-md-4'>
                                        <h5>Responsiveness</h5>
                                    </div>
                                    <div className='col-md-4'>
                                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                    </div>
                                </div>
                                <div className='row popup-Bottom'>
                                    <div className='col-md-4'>
                                        <h5>Payments</h5>
                                    </div>
                                    <div className='col-md-4'>
                                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                    </div>
                                </div>
                                <div className='row popup-Bottom'>
                                    <div className='col-md-4'>
                                        <h5>Work Ethics</h5>
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
                    <h3 style={{ color: "#455a64", fontSize: "24px" }}>Rating Clients </h3>
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
                                <Button variant="solid" size="sm" style={{ position: 'absolute', top: '0', right: '0', height: "35px", marginTop: "110px", marginRight: "10px" }} onClick={openModal}>Rate Client</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    style={{ position: 'absolute', top: '0', right: '0', maxWidth: '50px', maxHeight: '50px', borderRadius: '50%', marginRight: "5px" }}
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
                                <Button variant="solid" size="sm" style={{ position: 'absolute', top: '0', right: '0', height: "35px", marginTop: "110px", marginRight: "10px" }} onClick={openModal}>Rate Client</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    style={{ position: 'absolute', top: '0', right: '0', maxWidth: '50px', maxHeight: '50px', borderRadius: '50%', marginRight: "5px" }}
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
                                <Button variant="solid" size="sm" style={{ position: 'absolute', top: '0', right: '0', height: "35px", marginTop: "110px", marginRight: "10px" }} onClick={openModal}>Rate Client</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    style={{ position: 'absolute', top: '0', right: '0', maxWidth: '50px', maxHeight: '50px', borderRadius: '50%', marginRight: "5px" }}
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
                                <Button variant="solid" size="sm" style={{ position: 'absolute', top: '0', right: '0', height: "35px", marginTop: "110px", marginRight: "10px" }} onClick={openModal}>Rate Client</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    style={{ position: 'absolute', top: '0', right: '0', maxWidth: '50px', maxHeight: '50px', borderRadius: '50%', marginRight: "5px" }}
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
                                <Button variant="solid" size="sm" style={{ position: 'absolute', top: '0', right: '0', height: "35px", marginTop: "110px", marginRight: "10px" }} onClick={openModal}>Rate Client</Button>
                                <img
                                    src="/img/avatars/ceo.jpg"
                                    alt="Podjinn Team"
                                    style={{ position: 'absolute', top: '0', right: '0', maxWidth: '50px', maxHeight: '50px', borderRadius: '50%', marginRight: "5px" }}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Card className='mb-2 top-container flex mt-4' style={{ height: '60px', backgroundColor: "#926cf2", width: "100%", marginBottom: "32px" }}>
                <div className="mr-auto">
                    <h3 style={{ fontSize: "24px", color: "white" }}>All Clients </h3>
                </div>
            </Card>
            <Card className='mt-6 top-container rate-secc'>
                <div className='row mt-6 mb-6'>
                    <div className='col-md-12'>
                        <Table>
                            <THead>
                                <Tr>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}> </Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Client </Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Over all</Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>E-mail</Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Rate by Podjinn</Th>
                                    <Th style={{ fontWeight: 'bold', fontSize: "15px", height: "60px" }}>Action</Th>
                                </Tr>
                            </THead>
                            <TBody style={{ fontSize: "18px" }}>
                                <Tr>
                                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src="/img/avatars/ceo.jpg"
                                            alt="Jinn Image"
                                            className="rate-client-img"
                                        />
                                    </Td>
                                    <Td>Maria Anders</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>sumeep@gmail.com</Td>
                                    <Td>Germany</Td>
                                    <Td> <Button variant="solid" size="sm" className="smallButton" onClick={openModal}>
                                        Rate Client
                                    </Button></Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src="/img/avatars/ceo.jpg"
                                            alt="Jinn Image"
                                            className="rate-client-img"
                                        />
                                    </Td>
                                    <Td>Maria Anders</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>sumeep@gmail.com</Td>
                                    <Td>Germany</Td>
                                    <Td> <Button variant="solid" size="sm" className="smallButton" onClick={openModal}>
                                        Rate Client
                                    </Button></Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src="/img/avatars/ceo.jpg"
                                            alt="Jinn Image"
                                            className="rate-client-img"
                                        />
                                    </Td>
                                    <Td>Maria Anders</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>sumeep@gmail.com</Td>
                                    <Td>Germany</Td>
                                    <Td> <Button variant="solid" size="sm" className="smallButton" onClick={openModal}>
                                        Rate Client
                                    </Button></Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src="/img/avatars/ceo.jpg"
                                            alt="Jinn Image"
                                            className="rate-client-img"
                                        />
                                    </Td>
                                    <Td>Maria Anders</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>sumeep@gmail.com</Td>
                                    <Td>Germany</Td>
                                    <Td> <Button variant="solid" size="sm" className="smallButton" onClick={openModal}>
                                        Rate Client
                                    </Button></Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src="/img/avatars/ceo.jpg"
                                            alt="Jinn Image"
                                            className="rate-client-img"
                                        />
                                    </Td>
                                    <Td>Maria Anders</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>sumeep@gmail.com</Td>
                                    <Td>Germany</Td>
                                    <Td> <Button variant="solid" size="sm" className="smallButton" onClick={openModal}>
                                        Rate Client
                                    </Button></Td>
                                </Tr>
                                <Tr>
                                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src="/img/avatars/ceo.jpg"
                                            alt="Jinn Image"
                                            className="rate-client-img"
                                        />
                                    </Td>
                                    <Td>Maria Anders</Td>
                                    <Td><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Td>
                                    <Td>sumeep@gmail.com</Td>
                                    <Td>Germany</Td>
                                    <Td> <Button variant="solid" size="sm" className="smallButton" onClick={openModal}>
                                        Rate Client
                                    </Button></Td>
                                </Tr>
                            </TBody>
                        </Table>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default RateClients


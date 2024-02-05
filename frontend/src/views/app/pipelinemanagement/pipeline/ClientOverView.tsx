
import React, { useEffect, useState } from 'react'
import Tabs from '@/components/ui/Tabs';
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import "../../../../assets/styles/custom.css"
import reducer, { useAppSelector } from './store';
import { injectReducer, useAppDispatch } from '@/store';
import { getprojectoverview, OverViewState } from './store';
import { useParams } from 'react-router-dom';
import { apiGetProjectOverview } from '@/services/WebService';
import { string } from 'yup';

injectReducer('pipeline', reducer)

const { TabNav, TabList, TabContent } = Tabs;

const ClientOverView = () => {
    const [projectOverviewData, setProjectOverviewData] = useState<OverViewState | null>(null);
    const image = projectOverviewData?.data?.crmLead?.clientRepresentative?.image;
    const { projectId } = useParams();
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getprojectoverview())
    }, [dispatch, projectId])

    useEffect(() => {
        const fetchSingleClientOverviewData = async () => {
            try {
                const id = projectId ? parseInt(projectId) : undefined;
                if (id !== undefined && !isNaN(id)) {
                    const response = await apiGetProjectOverview<OverViewState>(id);
                    setProjectOverviewData(response.data);
                } else {
                    console.error('Invalid project ID:', projectId);
                }
            } catch (error) {
                console.error('Error fetching project overview data:', error);
            }
        };
        fetchSingleClientOverviewData();
    }, [projectId]);

    const horizontalLineStyle = {
        borderTop: '1px solid #D3D3D3',
    };

    return (
        <div>
            <div className="what-we-sec">
                <div className='container' style={{ marginTop: "20px" ,marginBottom:"40px" }}>
                    <Card className='mb-4 top-container flex'>
                        <div className="mr-auto">
                            <span className="navbar-brand mb-2 h1">Client Overview</span>
                        </div>
                    </Card>
                    <Tabs defaultValue="tab1">
                        <TabList>
                            <TabNav value="tab1">
                                <h4 style={{ color: '#926cf2' }}>Client Overview</h4>
                            </TabNav>
                        </TabList>
                    </Tabs>
                    <Card
                        headerClass="font-semibold text-lg text-indigo-600"
                        bodyClass="text-center"
                        footerClass="flex justify-end"
                    >
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <Button variant="solid" style={{ backgroundColor: '#36b37e', fontSize: "20px" }}>Create Proposal</Button>
                            <Button variant="solid" style={{ backgroundColor: '#36b37e', fontSize: "20px" }}>Revised Package</Button>
                        </div>
                        <div className='row' style={{ paddingTop: "50px", paddingLeft: "80px" }}>
                            <div className="actions-container">
                                <nav className="navbar navbar-light bg-light" style={{ paddingBottom: "30px" }}>
                                    <h3>Lead Source</h3>
                                </nav>
                            </div>
                        </div>
                        <div style={horizontalLineStyle}></div>
                        <div className='container'>
                            <div className='row' style={{ paddingRight: "80px", paddingTop: "50px" }}>
                                <div className='col-md-3'>
                                    <h4 style={{ marginBottom: "20px" }}>Lead Vertical</h4>
                                    <h4>{projectOverviewData?.data.crmLead.lead_vertical.name}</h4>
                                </div>
                                <div className='col-md-3'>
                                    <h4 style={{ marginBottom: "20px" }}>Lead Location</h4>
                                    <h4>{projectOverviewData?.data?.crmLead?.lead_location}</h4>
                                </div>
                                <div className='col-md-3'>
                                    <h4 style={{ marginBottom: "20px" }}>Lead Source</h4>
                                    <h4>{projectOverviewData?.data?.crmLead?.lead_source?.name}</h4>
                                </div>
                                <div className='col-md-3'>
                                    <h4 style={{ marginBottom: "20px" }}> Client Representative </h4>
                                    {<h4>{projectOverviewData?.data?.crmLead?.client_representative}</h4>}
                                </div>
                            </div>
                        </div>
                        <div className='row' style={{ paddingTop: "50px", paddingLeft: "80px" }}>
                            <div className="actions-container">
                                <nav className="navbar navbar-light bg-light" style={{ paddingBottom: "30px" }}>
                                    <h3>Representative Details</h3>
                                </nav>
                            </div>
                        </div>
                        <div style={horizontalLineStyle}></div>
                        <div className='col-md-3' style={{ paddingTop: "30px" }}><h4>Profile Image</h4>
                            {/* {image && <img src={image} alt="Client Representative" />} */}
                            <img src={'/img/avatars/man-avtar.avif'} alt="Profile" style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                        <div className='row' style={{ marginTop: "30px", marginBottom: "30px" }}>
                            <div className='col-md-3'><h4>Name</h4> <h4>{projectOverviewData?.data?.crmLead?.clientRepresentative?.name}</h4></div>
                            <div className='col-md-3'><h4>Email</h4> <h4>{projectOverviewData?.data?.crmLead?.clientRepresentative?.email}</h4></div>
                            <div className='col-md-3'><h4>Phone</h4> <h4>{projectOverviewData?.data?.crmLead?.clientRepresentative?.phone_number}</h4></div>

                            <div className='col-md-3'><h4>Product </h4> <h4>- </h4></div>
                            <div className='col-md-3'><h4>Region</h4> <h4>- </h4></div>
                            <div className='col-md-3'><h4>Street Address</h4><h4>Chandigarh </h4></div>
                            <div className='col-md-3'><h4> Country</h4><h4>{projectOverviewData?.data?.crmLead?.clientRepresentative?.country} </h4></div>

                            <div className='col-md-3'><h4>State </h4> <h4>{projectOverviewData?.data?.crmLead?.clientRepresentative?.state}</h4></div>
                            <div className='col-md-3'><h4>City</h4> <h4>{projectOverviewData?.data?.crmLead?.clientRepresentative?.city}</h4></div>
                            <div className='col-md-3'><h4>Pin/Zip Code</h4><h4>{projectOverviewData?.data?.crmLead?.clientRepresentative?.zipcode} </h4></div>
                        </div>
                        <div className='row' style={{ paddingTop: "50px", paddingLeft: "80px" }}>
                            <div className="actions-container">
                                <nav className="navbar navbar-light bg-light" style={{ paddingBottom: "30px" }}>
                                    <h3>Lead Details</h3>
                                </nav>
                            </div>
                        </div>
                        <div style={horizontalLineStyle}></div>
                        <div className='row' style={{ marginTop: "30px", marginBottom: "30px" }}>
                            <div className='col-md-3'><h4>Client Type </h4> <h4>{projectOverviewData?.data?.crmLead?.client_type}</h4></div>
                            <div className='col-md-3'><h4>Client Name</h4><h4>{projectOverviewData?.data?.crmLead?.client_name}</h4></div>
                            <div className='col-md-3'><h4>Email</h4><h4>{projectOverviewData?.data?.crmLead?.email}</h4></div>
                            <div className='col-md-3'><h4>Phone </h4><h4>{projectOverviewData?.data?.crmLead?.phone}</h4></div>
                            <div className='col-md-3'><h4>Skype ID </h4><h4>{projectOverviewData?.data?.crmLead?.skype_id}</h4></div>
                            <div className='col-md-3'><h4>Designation</h4><h4>{projectOverviewData?.data?.crmLead?.designation}</h4></div>
                            <div className='col-md-3'><h4>Country</h4><h4>{projectOverviewData?.data?.crmLead?.country}</h4></div>
                            <div className='col-md-3'><h4>State</h4><h4>{projectOverviewData?.data?.crmLead?.state}</h4></div>
                            <div className='col-md-3'><h4>City</h4><h4>{projectOverviewData?.data?.crmLead?.city}</h4></div>
                            <div className='col-md-3'><h4>Member Since</h4><h4>{projectOverviewData?.data?.crmLead?.member_since}</h4></div>
                            <div className='col-md-3'><h4>Payment Method</h4><h4>{projectOverviewData?.data?.crmLead?.payment_method}</h4></div>
                            <div className='col-md-3'><h4>Number of Hires</h4><h4>{projectOverviewData?.data?.crmLead?.number_of_hires}</h4></div>
                            <div className='col-md-3'><h4>Hire Rate</h4><h4>{projectOverviewData?.data?.crmLead?.hire_rate}</h4></div>
                            <div className='col-md-3'><h4>No. of Job Posted</h4><h4>{projectOverviewData?.data?.crmLead?.no_of_job_posted}</h4></div>
                            <div className='col-md-3'><h4>Open Jobs</h4><h4>{projectOverviewData?.data?.crmLead?.open_jobs}</h4></div>
                            <div className='col-md-3'><h4>Total Spent</h4><h4>{projectOverviewData?.data?.crmLead?.total_spent}</h4></div>
                            <div className='col-md-3'><h4>Average Hourly Rate</h4><h4>{projectOverviewData?.data?.crmLead?.average_hourly_rate}</h4></div>
                            <div className='col-md-3'><h4>Hours Billed</h4><h4>{projectOverviewData?.data?.crmLead?.hours_billed}</h4></div>
                        </div>
                        <div className='row' style={{ paddingTop: "50px", paddingLeft: "80px" }}>
                            <div className="actions-container">
                                <nav className="navbar navbar-light bg-light" style={{ paddingBottom: "30px" }}>
                                    <h3>Project Details</h3>
                                </nav>
                            </div>
                        </div>
                        <div style={horizontalLineStyle}></div>
                        <div className='row' style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <div className='col-md-3'><h4>Project Title</h4> <h4>{projectOverviewData?.data?.crmLead?.project_title}</h4></div>
                            <div className='col-md-3'><h4>URL</h4> <p style={{ fontSize: "15px" }}>{projectOverviewData?.data?.crmLead?.project_url}</p></div>
                            <div className='col-md-3'><h4>Service</h4> <h4>{projectOverviewData?.data?.crmLead?.project_service}</h4></div>
                            <div className='col-md-3'><h4>Specific Services</h4><h4>{projectOverviewData?.data?.crmLead?.project_specific_services}</h4></div>
                            <div className='col-md-3'><h4>Bidding Executive</h4><h4>{projectOverviewData?.data?.crmLead?.project_bidding_executive}</h4></div>
                            <div className='col-md-3'><h4>Action</h4> <h4>{projectOverviewData?.data?.crmLead?.project_action}</h4></div>
                        </div>
                        <div className='row' style={{ paddingTop: "50px", paddingLeft: "40px" }}>
                            <div className="actions-container">
                                <nav className="navbar navbar-light bg-light" style={{ paddingBottom: "30px" }}>
                                    <h3>Assigned To</h3>
                                </nav>
                            </div>
                        </div>
                        <div style={horizontalLineStyle}></div>
                        <div className="" style={{ paddingTop: "20px", fontWeight: 'bold', width: "30%" }}>
                            {Array.isArray(projectOverviewData?.data?.emp_assigned_estimation) ? (
                                projectOverviewData.data.emp_assigned_estimation.map((item: any) => (
                                    <Card
                                        clickable
                                        key={item.id}
                                        className="flex hover:shadow-lg transition duration-150 ease-in-out"
                                        onClick={(e) => console.log('Card Clickable', e)}
                                        style={{ backgroundColor: "#E5E4E2" }}
                                    >
                                        <div className="flex-1">
                                            <h5 className="text-left">PHP Laravel - New</h5>
                                            <p className="mt-2 text-left" style={{ color: "#71797E" }}>{item.name}</p>
                                            <p className="mt-2 text-left" style={{ color: "#71797E" }}>Address:{item.current_address}</p>
                                            <p className="mt-2 text-left" style={{ color: "#71797E" }}>Phone:{item.phone_number}</p>
                                            <p className="mt-2 text-left" style={{ color: "#71797E", fontSize: "15px" }}>Email:{item.email}</p>
                                            <p className="mt-2 text-left" style={{ color: "#71797E" }}>Contact:{item.phone}</p>
                                        </div>
                                        <div className="flex-none ml-4">
                                            <img src={item.image} alt="Client Representative" />
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <p>emp_assigned_estimation is not an array</p>
                            )}
                        </div>
                        <div className='row' style={{ paddingTop: "50px", paddingLeft: "20px" }}>
                            <div className="actions-container">
                                <nav className="navbar navbar-light bg-light" style={{ paddingBottom: "30px" }}>
                                    <h3>Requested For Proposal</h3>
                                </nav>
                            </div>
                        </div>
                        <div style={horizontalLineStyle}></div>
                        <div className="max-w-xs" style={{ paddingTop: "20px", fontWeight: 'bold', width: "30%" }}>
                            {Array.isArray(projectOverviewData?.data?.emp_assigned_proposal) ? (
                                projectOverviewData.data.emp_assigned_proposal.map((item: any) => (
                                    <Card
                                        clickable
                                        key={item.id}
                                        className="flex hover:shadow-lg transition duration-150 ease-in-out"
                                        onClick={(e) => console.log('Card Clickable', e)}
                                        style={{ backgroundColor: "#E5E4E2" }}
                                    >
                                        <div className="flex-1">
                                            <h5 className="text-left">PHP Laravel - New</h5>
                                            <p className="mt-2 text-left" style={{ color: "#71797E" }}>{item.name}</p>
                                            <p className="mt-2 text-left" style={{ color: "#71797E" }}>Address:{item.current_address}</p>
                                            <p className="mt-2 text-left" style={{ color: "#71797E" }}>Phone:{item.phone_number}</p>
                                            <p className="mt-2 text-left" style={{ color: "#71797E", fontSize: "15px" }}>Email:{item.email}</p>
                                            <p className="mt-2 text-left" style={{ color: "#71797E" }}>Contact:{item.phone}</p>
                                        </div>
                                        <div className="flex-none ml-4">
                                            <img src={item.image} alt="Client Representative" />
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <p>emp_assigned_estimation is not an array</p>
                            )}
                        </div>
                        <div className='row' style={{ paddingTop: "50px", paddingLeft: "30px" }}>
                            <div className="actions-container">
                                <nav className="navbar navbar-light bg-light" style={{ paddingBottom: "30px" }}>
                                    <h3>Requested For Estimate</h3>
                                </nav>
                            </div>
                        </div>
                        <div style={horizontalLineStyle}></div>
                        <div className='row' style={{ paddingTop: "20px", paddingLeft: "20px" }}>
                            <h4>Not send request for estimate to any client representative.</h4>
                            <h4>{projectOverviewData?.data?.crmLead?.requested_for_estimate}</h4>
                        </div>
                    </Card>
                </div >
            </div >
        </div >

    )
}

export default ClientOverView


import React, { useEffect } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select'
import Tabs from '@/components/ui/Tabs';
import reducer, { useAppSelector } from './store';
import { useNavigate, Link } from "react-router-dom"
import { injectReducer, useAppDispatch } from '@/store';
import { LeadpipelineState, getLeadpipeline } from './store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../../../../assets/styles/custom.css";

injectReducer('pipeline', reducer)

const { TabNav, TabList, TabContent } = Tabs;

const LeadPipeline = () => {

  const horizontalLineStyle = {
    borderTop: '1px solid #D3D3D3',
    margin: '10px 0',
  };

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLeadpipeline())
  }, [])

  const allPipeline = useAppSelector(state => state.pipeline.data.leadpipeline.data);
  console.log("allPipeline", allPipeline);

  const formik = useFormik({
    initialValues: {
      selectedServices: '',
      selectedSpecificServices: ''
    },
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
  });

  const ProjectListCard = ({ projectList }: { projectList: LeadpipelineState }) => {

    return (
      <div className="col-md-4">
        <div className="inner-box">
          <div className="what-box-head">
            <Link to={`/app/pipelinemanagement/pipeline/clientoverview/${projectList.id}`}>
              <h5 className='leadpipelineheading'>{projectList.project_title}</h5>
            </Link>
          </div>
          <div style={horizontalLineStyle}></div>
          <Tabs defaultValue="tab">
            <TabList>
              <TabNav value="tab">Description</TabNav>
            </TabList>
            <div className="p-4">
              <TabContent value={`tab`}>
                <p>{projectList.project_description}</p>
              </TabContent>
            </div>
          </Tabs>
          <p>Total Spend Hours</p>
          {projectList.total_spent}
          <p>Project Status </p>
          {projectList.project_status}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="what-we-sec">
        <Card className='mb-4 top-container flex'>
          <div className="mr-auto">
            <span className="navbar-brand mb-0 h1">Lead Pipeline</span>
          </div>
        </Card>
        <form onSubmit={formik.handleSubmit}>
          <div className='container' style={{ marginTop: '56px' }}>
            <div className='row'>
              <div className='col-md-4'>
                <h5 style={{ paddingBottom: '10px' }}>Select Services</h5>
                <Select
                  name="selectedServices"
                  placeholder="Select Services"
                  // options={selectOptions}
                  onChange={(value) => formik.setFieldValue('selectedServices', value)}
                  onBlur={formik.handleBlur}
                  value={formik.values.selectedServices}
                ></Select>
              </div>
              <div className='col-md-4'>
                <h5 style={{ paddingBottom: '10px' }}>Select Specific Services</h5>
                <Select
                  name="selectedServices"
                  placeholder="Select Specific Services"
                  // options={SpecificServices}
                  onChange={(value) => formik.setFieldValue('selectedSpecificServices', value)}
                  onBlur={formik.handleBlur}
                  value={formik.values.selectedSpecificServices}
                ></Select>
              </div>
              <div className='col-md-4'>
                <h5 style={{ paddingBottom: "10px" }}>Project Name</h5>
                <Select
                  placeholder="Project Name"
                ></Select>
              </div>
            </div>
          </div>
        </form>
        <div className="container" style={{ marginTop: "40px",marginBottom:"40px"  }}>
          <div className="row">
            {allPipeline && allPipeline.map((project: any) => <ProjectListCard key={project.id} projectList={project} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadPipeline











import React, { useEffect } from 'react'
import reducer, { useAppSelector } from './store';
import { injectReducer, useAppDispatch } from '@/store';
import { BidpipelineState, getBidpipeline } from './store';
import Card from '@/components/ui/Card'
import { useFormik } from 'formik';
import Select from '@/components/ui/Select'
injectReducer('pipeline', reducer)


const BidPipeLine = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getBidpipeline())
  }, [])
  const bidPipeline = useAppSelector(state => state.pipeline.data.bidpipeline.data);
  console.log("bidPipeline", bidPipeline);

  const cardStyle = {
    width: '350px',
    height: '250px',
  };

  const formik = useFormik({
    initialValues: {
      selectedServices: '',
      selectedSpecificServices: ''
    },
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
  });


  return (
    <>
      <Card className='mb-4 top-container flex'>
        <div className="mr-auto">
          <span className="navbar-brand mb-0 h1">Bid Pipeline</span>
        </div>
      </Card>
      <form onSubmit={formik.handleSubmit}>
        <div className='container' style={{ marginTop: "40px" }}>
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
      <div className="container" style={{ marginTop: "40px" ,marginBottom:"40px" }}>
        <div className="row">
          {bidPipeline.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="inner-box">
                <div className="what-box-head">
                  <Card
                    style={cardStyle}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.package_slug}</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  )


}

export default BidPipeLine























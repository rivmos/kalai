import React from 'react'
import { FeatureCardState } from '@/@types/webData'
import PageHeader from '../components/PageHeader';
import ServiceFeatures from '../components/ServiceFeatures'
import PathComponent from '../components/PathComponent';

const featuresData: FeatureCardState[] = [
    {
      id: 22,
      title: "Create New App",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/mobility/cna.png",
      path: "",
    },
    {
      id: 23,
      title: "Mobile App Backend",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/mobility/mobile_app.png",
      path: "",
    },
    {
      id: 24,
      title: "Software Testing/QA",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/mobility/qa.png",
      path: "",
    },
    {
      id: 25,
      title: "Business Analysis",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/mobility/business_analysis.png",
      path: "",
    },
  ];
  
const Mobility = () => {
    const ServiceName = 'Mobility'
    return (
        <div>
            <PathComponent title={ServiceName}/>
            <PageHeader direction='ltr' showButton={true} isImage heading='Service' largeHeading="On-the-Go Innovation" subHeading='Stay connected with your audience on the go with our mobile app development and solutions.' imageSrc='/img/web/offer/mobility.png' contendtext='Craft a unique identity for your business with our branding services, including logo design and brand strategy. Craft a unique identity for your business with our branding services, including logo design and brand strategy.' lbtnText='Get Free Audit' />
            <ServiceFeatures heading={`${ServiceName} Features`} largeHeading='Features that ease your work.' subHeading='We Offer real-time monitoring of your project management for efficient and timely delivery as we contruct projects.The client -centric project management tool is used to create new projects, hire new pods to deliver projects, or choose a podjinn to attain delivery.' featuresData={featuresData} />
        </div>
    )
}

export default Mobility
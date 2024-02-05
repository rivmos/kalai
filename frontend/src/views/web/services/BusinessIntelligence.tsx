import React, {useEffect} from 'react'
import PageHeader from '../components/PageHeader'
import ServiceFeatures from '../components/ServiceFeatures'
import { FeatureCardState } from '@/@types/webData'
import PathComponent from '../components/PathComponent'

const featuresData: FeatureCardState[] = [
    {
      id: 49,
      title: "Data Visualisation",
      description: "Transform your data into insightful visualizations that enhance decision-making and online visibility through targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/bi/dv.png",
      path: "",
    },
    {
      id: 50,
      title: "Data Mining",
      description: "Uncover valuable insights from your data with data mining techniques and amplify your online visibility with our Search Engine Optimization strategies.",
      image: "/img/web/icons/bi/dm.png",
      path: "",
    },
    {
      id: 51,
      title: "Online Analytical Processing",
      description: "Streamline data analysis with Online Analytical Processing and boost online visibility through tailored Search Engine Optimization campaigns.",
      image: "/img/web/icons/bi/oap.png",
      path: "",
    },
    {
      id: 52,
      title: "Performance Management",
      description: "Optimize your business performance with effective performance management strategies and enhance online visibility through Search Engine Optimization campaigns.",
      image: "/img/web/icons/bi/pm.png",
      path: "",
    },
  ];
  

const BusinessIntellingence = () => {
    const ServiceName = 'Buisness Intelligence'
    return (
        <div>
            <PathComponent title={ServiceName}/>
            <PageHeader direction='ltr' showButton={true} isImage heading='Service' largeHeading="Data, Decisions, Growth" subHeading='Unlock valuable insights and data-driven decision-making with our business intelligence solutions.' imageSrc='/img/web/offer/buisness_intelligence.png' contendtext='Craft a unique identity for your business with our branding services, including logo design and brand strategy. Craft a unique identity for your business with our branding services, including logo design and brand strategy.' lbtnText='Get Free Audit' />
            <ServiceFeatures heading={`${ServiceName} Features`} largeHeading='Features that ease your work.' subHeading='We Offer real-time monitoring of your project management for efficient and timely delivery as we contruct projects.The client -centric project management tool is used to create new projects, hire new pods to deliver projects, or choose a podjinn to attain delivery.' featuresData={featuresData} />
        </div>
    )
}

export default BusinessIntellingence
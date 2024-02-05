import { FeatureCardState } from '@/@types/webData'
import PageHeader from '../components/PageHeader';
import ServiceFeatures from '../components/ServiceFeatures'
import PathComponent from '../components/PathComponent';

const featuresData: FeatureCardState[] = [
    {
      id: 13,
      title: "Create New Website",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/websol/create_web.png",
      path: "",
    },
    {
      id: 14,
      title: "Upgrade Website",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/websol/upgrade_web.png",
      path: "",
    },
    {
      id: 15,
      title: "Web Hosting",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/websol/web_hosting.png",
      path: "",
    },
    {
      id: 16,
      title: "API Creation",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/websol/api_creation.png",
      path: "",
    },
    {
      id: 17,
      title: "API Integration",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/websol/api_integration.png",
      path: "",
    },
    {
      id: 19,
      title: "Business Analysis",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/websol/buisness_analysis.png",
      path: "",
    },
    {
      id: 20,
      title: "Software Testing/QA",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/websol/qa.png",
      path: "",
    },
    {
      id: 21,
      title: "GIS Services",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/websol/gis.png",
      path: "",
    },
  ];
  

const WebSol = () => {
    const ServiceName = 'Web Solutions'
    return (
        <div>
            <PathComponent title={ServiceName}/>
            <PageHeader direction='ltr' showButton={true} isImage heading='Service' largeHeading="Crafting Online Success" subHeading='Our web solutions are tailored to meet your business needs, from responsive websites to e-commerce platforms.' imageSrc='/img/web/offer/web_solutions.png' contendtext='Craft a unique identity for your business with our branding services, including logo design and brand strategy. Craft a unique identity for your business with our branding services, including logo design and brand strategy.' lbtnText='Get Free Audit' />
            <ServiceFeatures heading={`${ServiceName} Features`} largeHeading='Features that ease your work.' subHeading='We Offer real-time monitoring of your project management for efficient and timely delivery as we contruct projects.The client -centric project management tool is used to create new projects, hire new pods to deliver projects, or choose a podjinn to attain delivery.' featuresData={featuresData} />
        </div>
    )
}

export default WebSol 
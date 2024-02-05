import { FeatureCardState } from '@/@types/webData'
import PageHeader from '../components/PageHeader';
import ServiceFeatures from '../components/ServiceFeatures'
import PathComponent from '../components/PathComponent';

const featuresData: FeatureCardState[] = [
    {
      id: 26,
      title: "Search Engine Optimization (SEO)",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/seo.png",
      path: "",
    },
    {
      id: 27,
      title: "Social Media Optimization (SMO)",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/smo.png",
      path: "",
    },
    {
      id: 28,
      title: "Search Engine Marketing (SEM)",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/sem.png",
      path: "",
    },
    {
      id: 29,
      title: "Social Media Marketing (SMM)",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/smm.png",
      path: "",
    },
    {
      id: 30,
      title: "In-App Advertising",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/in_app.png",
      path: "",
    },
    {
      id: 31,
      title: "SMS Marketing",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/sms.png",
      path: "",
    },
    {
      id: 32,
      title: "Email Marketing",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/email.png",
      path: "",
    },
    {
      id: 33,
      title: "Online Marketplace Product Listing",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/online_marketplace.png",
      path: "",
    },
    {
      id: 34,
      title: "Content Creation & Research",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/content_creation.png",
      path: "",
    },
    {
      id: 35,
      title: "App Store Optimization (ASO)",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/aso.png",
      path: "",
    },
    {
      id: 36,
      title: "Voice Call Campaign",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/voice_call.png",
      path: "",
    },
    {
      id: 37,
      title: "Newsletter Promotion",
      description: "Gain online visibility to meet your business objectives. We plan targeted Search Engine Optimization campaigns.",
      image: "/img/web/icons/digital_marketing/newsletter.png",
      path: "",
    },
  ];
  

const DigitalMarketing = () => {
    const ServiceName = 'Digital Marketing'
    return (
        <div>
            <PathComponent title={ServiceName}/>
            <PageHeader direction='ltr' showButton={true} isImage heading='Service' largeHeading="Drive, Engage, Convert" subHeading='Boost your online presence with our digital marketing strategies, including SEO, social media, and more.' imageSrc='/img/web/offer/digital_marketing.png' contendtext='Craft a unique identity for your business with our branding services, including logo design and brand strategy. Craft a unique identity for your business with our branding services, including logo design and brand strategy.' lbtnText='Get Free Audit' />
            <ServiceFeatures heading={`${ServiceName} Features`} largeHeading='Features that ease your work.' subHeading='We Offer real-time monitoring of your project management for efficient and timely delivery as we contruct projects.The client -centric project management tool is used to create new projects, hire new pods to deliver projects, or choose a podjinn to attain delivery.' featuresData={featuresData} />
        </div>
    )
}

export default DigitalMarketing
import { FeatureCardState } from '@/@types/webData'
import PageHeader from '../components/PageHeader';
import ServiceFeatures from '../components/ServiceFeatures'
import PathComponent from '../components/PathComponent';


const featuresData: FeatureCardState[] = [
  {
    id: 38,
    title: "Banner",
    description: "Create eye-catching banners for your brand and increase your online visibility with our targeted Search Engine Optimization campaigns.",
    image: "/img/web/icons/design/banner.png",
    path: "",
  },
  {
    id: 39,
    title: "Web",
    description: "Enhance your website's visibility with our tailored Search Engine Optimization campaigns and web design services.",
    image: "/img/web/icons/design/web.png",
    path: "",
  },
  {
    id: 40,
    title: "Mobile App",
    description: "Optimize your mobile app's presence and gain online visibility through our expert Search Engine Optimization strategies.",
    image: "/img/web/icons/mobility/cna.png",
    path: "",
  },
  {
    id: 41,
    title: "Logo",
    description: "Strengthen your brand identity with a captivating logo and boost online visibility via Search Engine Optimization campaigns.",
    image: "/img/web/icons/design/logo.png",
    path: "",
  },
  {
    id: 42,
    title: "Document",
    description: "Improve the visibility of your documents online through our targeted Search Engine Optimization campaigns.",
    image: "/img/web/icons/design/document.png",
    path: "",
  },
  {
    id: 43,
    title: "Outdoor & Signage",
    description: "Maximize your outdoor and signage visibility with our dedicated Search Engine Optimization campaigns and design services.",
    image: "/img/web/icons/design/signage.png",
    path: "",
  },
  {
    id: 44,
    title: "Print",
    description: "Amplify your print materials' online reach with our effective Search Engine Optimization campaigns.",
    image: "/img/web/icons/design/print.png",
    path: "",
  },
  {
    id: 45,
    title: "Social Media",
    description: "Harness the power of social media to enhance your online visibility with our targeted Search Engine Optimization campaigns.",
    image: "/img/web/icons/mobility/business_analysis.png",
    path: "",
  },
  {
    id: 46,
    title: "Graphic",
    description: "Elevate your online visibility with engaging graphics and our focused Search Engine Optimization campaigns.",
    image: "/img/web/icons/design/graphic.png",
    path: "",
  },
  {
    id: 47,
    title: "Video Creation",
    description: "Boost your online presence through captivating video content and targeted Search Engine Optimization campaigns.",
    image: "/img/web/icons/design/video.png",
    path: "",
  },
  {
    id: 48,
    title: "Virtual Reality",
    description: "Immerse your audience in a virtual reality experience and increase your online visibility with our Search Engine Optimization strategies.",
    image: "/img/web/icons/design/vr.png",
    path: "",
  },
];

const Design = () => {
    const ServiceName = 'Design'
    return (
        <div>
            <PathComponent title={ServiceName}/>
            <PageHeader direction='ltr' showButton={true} isImage heading='Service' largeHeading="Where Creativity Meets Purpose" subHeading='Elevate your brand with our creative design services, including graphic design, UI/UX, and more.' imageSrc='/img/web/offer/design.png' contendtext='Craft a unique identity for your business with our branding services, including logo design and brand strategy. Craft a unique identity for your business with our branding services, including logo design and brand strategy.' lbtnText='Get Free Audit' />
            <ServiceFeatures heading={`${ServiceName} Features`} largeHeading='Features that ease your work.' subHeading='We Offer real-time monitoring of your project management for efficient and timely delivery as we contruct projects.The client -centric project management tool is used to create new projects, hire new pods to deliver projects, or choose a podjinn to attain delivery.' featuresData={featuresData} />
        </div>
    )
}

export default Design
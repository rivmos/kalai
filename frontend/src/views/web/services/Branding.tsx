import PageHeader from '../components/PageHeader'
import PathComponent from '../components/PathComponent'
import ServiceFeatures from '../components/ServiceFeatures'
import { FeatureCardState } from '@/@types/webData'

const featuresData: FeatureCardState[] = [
    {
      id: 1,
      title: "Banner Design",
      description: "Get professional banner design services and enhance your online presence with creative designs.",
      image: "/img/web/icons/branding/banner.png",
      path: "",
    },
    {
      id: 2,
      title: "Website Design",
      description: "Create a mobile-friendly WordPress website for your products and services with the expertise of certified website designers in Chandigarh.",
      image: "/img/web/icons/branding/web.png",
      path: "",
    },
    {
      id: 3,
      title: "Email Design",
      description: "Transform your emails with high-end Laravel solutions. Bug-free development, competitive pricing, and 24*7 support.",
      image: "/img/web/icons/branding/layout.png",
      path: "",
    },
    {
      id: 4,
      title: "App Screen Design",
      description: "Enhance your app's user interface with the help of Magento developers and optimize your eCommerce platform.",
      image: "/img/web/icons/branding/app.png",
      path: "",
    },
    {
      id: 5,
      title: "Logo Design",
      description: "Elevate your brand with top Joomla Website Design Agency. Affordable services with quick support and creative designers to boost your brand value.",
      image: "/img/web/icons/branding/logo.png",
      path: "",
    },
    {
      id: 6,
      title: "Outdoor & Signage",
      description: "Discover the best Drupal web development and design services offered by highly qualified and experienced professionals.",
      image: "/img/web/icons/branding/signage.png",
      path: "",
    },
    {
      id: 7,
      title: "Video Editing",
      description: "Utilize in-app advertising solutions to reach a more advanced audience through video editing and motion graphics.",
      image: "/img/web/icons/branding/video.png",
      path: "",
    },
    {
      id: 8,
      title: "Merchandise",
      description: "Enhance your marketing efforts with creative designs. A simple phone call at the right time can have an enormous effect on your campaign.",
      image: "/img/web/icons/branding/label.png",
      path: "",
    },
    {
      id: 9,
      title: "Virtual Reality",
      description: "Explore the world of virtual reality and make your marketing more effective with our affordable SMS marketing services.",
      image: "/img/web/icons/branding/vr.png",
      path: "",
    },
    {
      id: 10,
      title: "Social Creatives",
      description: "Get your message noticed with Maxxmann Communications' email marketing services and stand out on social media.",
      image: "/img/web/icons/branding/social.png",
      path: "",
    },
    {
      id: 11,
      title: "Print Designs",
      description: "Promote your email newsletter with our creative newsletter promotion services and captivate your audience with compelling designs.",
      image: "/img/web/icons/branding/brochure.png",
      path: "",
    },
    {
      id: 12,
      title: "Card/Catalogue Designs",
      description: "Boost your online presence with creative designs. Promote your pages with our effective Online Reputation Management services.",
      image: "/img/web/icons/branding/greeting.png",
      path: "",
    },
  ];
  

const Branding = () => {
    const ServiceName = 'Branding'
    return (
        <div>
            <PathComponent title={ServiceName}/>
            <PageHeader showButton={true} direction='ltr'  isImage heading='Service' largeHeading="Unleash Your Identity" subHeading='Craft a unique identity for your business with our branding services, including logo design and brand strategy.' imageSrc='/img/web/offer/branding.png' lbtnText='Get Free Audit' contendtext='Craft a unique identity for your business with our branding services, including logo design and brand strategy. Craft a unique identity for your business with our branding services, including logo design and brand strategy.' />
            <ServiceFeatures heading={`${ServiceName} Features`} largeHeading='Features that ease your work.' subHeading='We Offer real-time monitoring of your project management for efficient and timely delivery as we contruct projects.The client -centric project management tool is used to create new projects, hire new pods to deliver projects, or choose a podjinn to attain delivery.' featuresData={featuresData} />
        </div>
    )
}

export default Branding
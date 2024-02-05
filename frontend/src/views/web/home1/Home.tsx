import React, { useEffect } from 'react'
import Banner from './components/Banner'
// import reducer, { getBannerData } from './newStore'
//import reducer from './store'
import Pricing from './components/Pricing'
import Services from './components/Services'
import Video from './components/Video'
import Management from './components/management/Management'
import Support from './components/Support'
import Features from '../components/Features'
import Campaign from './components/campaign/Campaign'
import Testimonial from './components/testimonial/Testimonial'
import reducer, { getHome, useAppSelector } from './store';
import { injectReducer, useAppDispatch } from '@/store';
injectReducer('homePage', reducer)

const Home = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getHome())
    }, [])

    const allHomeData = useAppSelector(state => state.homePage.data.data)

    const fallbackData = {
        banner: {
            largeHeading: "Welcome To Podjinn",
            subHeading: "A new Innovative way to deliver IT Projects",
            btnText: "Discover more",
            btnLink: "",
            image: ""
        },
        offer: {
            heading: "WHAT WE OFFER",
            largeHeading: "We solve digital challenges",
            subHeading: "Here at Podjinn we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.",
            btnText: "MORE ABOUT US",
            btnLink: "NA",
            cards: [
                {
                    id: 34,
                    title: "Web Solutions",
                    description: "Our web solutions are tailored to meet your business needs, from responsive websites to e-commerce platforms.",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/services\/1700827606webDevelopmentpng.png",
                    path: "web\/offer\/websolutions"
                },
                {
                    id: 33,
                    title: "Mobility",
                    description: "Stay connected with your audience on the go with our mobile app development and solutions.",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/services\/1700827569mobilitypng.png",
                    path: "web\/offer\/mobility"
                },
                {
                    id: 32,
                    title: "Digital Marketing",
                    description: "Boost your online presence with our digital marketing strategies, including SEO, social media, and more.",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/services\/1700827530digitalMarketingpng.png",
                    path: "web\/offer\/digitalmarketing"
                },
                {
                    id: 31,
                    title: "Design",
                    description: "levate your brand with our creative design services, including graphic design, UI\/UX, and more.",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/services\/1700827493desigingpng.png",
                    path: "web\/offer\/design"
                },
                {
                    id: 30,
                    title: "Branding",
                    description: "Craft a unique identity for your business with our branding services, including logo design and brand strategy.",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/services\/1700827385brandingpng.png",
                    path: "web\/offer\/branding"
                },
                {
                    id: 29,
                    title: "Business Intelligence",
                    description: "Unlock valuable insights and data-driven decision-making with our business intelligence solutions.",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/services\/1700827339businessIntelligencepng.png",
                    path: "web\/offer\/businessintelligence"
                }
            ]
        },
        video: {
            heading: "VIDEO TUTORIAL OF PODJINN",
            largeHeading: "You'll Learn more effectively using videos.",
            image: "http:\/\/127.0.0.1:8000\/assets\/images\/arrival\/1700485165video-imagejpg.jpg",
            videoLink: "https:\/\/podjinn.com\/public\/podjinn_new_template\/video\/1.mp4"
        },
        features: {
            heading: "FEATURES",
            largeHeading: "Features that ease your work.",
            subHeading: "We Offer real-time monitoring of your project management for efficient and timely delivery as we contruct projects. The client -centric project management tool is used to create new projects, hire new pods to deliver projects, or choose a podjinn to attain delivery.",
            featureCards: [
                {
                    id: 117,
                    title: "Projects",
                    description: "Explore and manage your projects",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/featurescards\/1700487895_project.png",
                    path: "web\/feature\/websolutions"
                },
                {
                    id: 118,
                    title: "Resources",
                    description: "Access valuable resources and documentation",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/featurescards\/1700487895_resources.png",
                    path: "web\/feature\/websolutions"
                },
                {
                    id: 119,
                    title: "Communication",
                    description: "Stay connected with team members",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/featurescards\/1700487895_communication.png",
                    path: "web\/feature\/websolutions"
                },
                {
                    id: 120,
                    title: "Audit",
                    description: "Review and audit your business operations",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/featurescards\/1700487895_preview.png",
                    path: "web\/feature\/websolutions"
                },
                {
                    id: 121,
                    title: "Performance Analysis",
                    description: "Analyze performance metrics and data",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/featurescards\/1700487895_performance.png",
                    path: "web\/feature\/websolutions"
                },
                {
                    id: 122,
                    title: "Pipeline Management",
                    description: "Manage your sales and business pipelines",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/featurescards\/1700487895_pipeline.png",
                    path: "web\/feature\/websolutions"
                },
                {
                    id: 123,
                    title: "Payments",
                    description: "View and manage payments and transactions",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/featurescards\/1700487895_wallet.png",
                    path: "web\/feature\/websolutions"
                },
                {
                    id: 124,
                    title: "24\/7 Support",
                    description: "Get assistance and support around the clock",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/featurescards\/1700487895_24-hours-support.png",
                    path: "web\/feature\/websolutions"
                }
            ]
        },
        pricing: {
            heading: "Pricing",
            large_heading: "We Solve digital Challenges",
            buttonText: "Explore Features",
            buttonLink: "NA"
        },
        subscription: [
            {
                name: "plan_basic",
                description: null,
                monthlyPrice: null,
                yearlyPrice: "547.4",
                image: "http:\/\/127.0.0.1:8000\/assets\/images\/subscription",
                features: [
                    ""
                ]
            },
            {
                name: "plan_advanced",
                description: null,
                monthlyPrice: null,
                yearlyPrice: "1098.2",
                image: "http:\/\/127.0.0.1:8000\/assets\/images\/subscription",
                features: [
                    ""
                ]
            },
            {
                name: "plan_pro",
                description: null,
                monthlyPrice: null,
                yearlyPrice: "2448.2",
                image: "http:\/\/127.0.0.1:8000\/assets\/images\/subscription",
                features: [
                    ""
                ]
            }
        ],
        projectManagement: {
            heading: "Why Podjinn for Project Management?",
            sub_heading: "Serving thousands of clients, we are a full-service, holistic agency with a five-star rating in digital marketing. From email marketing, website design, and web development to PPC management, social media, SEO, and web development, our digital agency handles every facet of online marketing.",
            buttonText: "Ask a Podjinn",
            buttonLink: "NA",
            cards: [
                {
                    id: 43,
                    title: "TRANSPARENCY",
                    heading: "100% Projets transparency",
                    subHeading: "We work hard to foster an atmosphere of openness and communication in everything we do. You won't have to wonder about the status of your campaign since we'll keep you informed and in charge.",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/projectscards\/1701169351_Stats.jpg"
                },
                {
                    id: 44,
                    title: "TEAM OF EXPERTS",
                    heading: "Frendly team of experts",
                    subHeading: "You can reach our pros and experts via phone or email at any time. You can also stop by our office to talk about your ideas and goals over a cup of coffee if you would rather speak with someone in person. We're available to you.",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/projectscards\/1701169351_pexels-kindel-media-7688169.webp"
                },
                {
                    id: 45,
                    title: "RESULTS",
                    heading: "Pick a partner who gets you",
                    subHeading: "Your objectives and concerns form the basis of all our decisions. We want to know what keeps you up at night, whether it's website design, SEO, PPC, or anything else, so we can provide the desired business outcomes.",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/projectscards\/1701170022_Stats2.jpg"
                }
            ]
        },
        campaign: {
            sectionName: "CAMPAIGNS",
            heading: "Campaigns & Outcome",
            subHeading: "Create engaging campaigns in seconds with programming, targeting exactly why you want to reach with a rich set of real time filters.Track and Analyze Campaign Performance in Real-Time.Generate a Social Score of your digital presence.",
            cardLink: '',
            campaignCards: [
                {
                    id: 21,
                    title: "MAXXSCORE",
                    upto: "UpTo +90%",
                    subTitle: "Quantify Online Presence",
                    imgLink: "http:\/\/127.0.0.1:8000\/assets\/images\/campaignscards\/1701252759_score.jpg",
                    tags: [
                        "In-Depth Analysis",
                        "Social Metric",
                        "Key Metric"
                    ]
                },
                {
                    id: 22,
                    title: "MAXXIFI",
                    upto: "UpTo +80%",
                    subTitle: "Manage Post Scheduling",
                    imgLink: "http:\/\/127.0.0.1:8000\/assets\/images\/campaignscards\/1701252759_xfi.jpg",
                    tags: [
                        "Multi Platform Integration",
                        "Mobile Compatibility"
                    ]
                },
                {
                    id: 23,
                    title: "MAXXRESPONSE",
                    upto: "UpTo +90%",
                    subTitle: "Optimal Response",
                    imgLink: "http:\/\/127.0.0.1:8000\/assets\/images\/campaignscards\/1701252944_resp.jpg",
                    tags: [
                        "SEO",
                        "Search",
                        "Social"
                    ]
                },
                {
                    id: 24,
                    title: "MAXXCAMPAIGN",
                    upto: "UpTo +80%",
                    subTitle: "Efficient Campaign System",
                    imgLink: "http:\/\/127.0.0.1:8000\/assets\/images\/campaignscards\/1701252944_camp.jpg",
                    tags: [
                        "Work",
                        "Talent",
                        "Social"
                    ]
                }
            ]
        },
        reviewSection: {
            heading: "5000+ Client reviews",
            buttonText: "View all reviews",
            buttonLink: "NA",
            cards: [
                {
                    id: 8,
                    testimonial: "\u201cThe entire staff at Numerique has been phenomenal. They are quick with their replies and incredibly helpful.\u201d",
                    name: "Edward Kennedy",
                    position: "Director, Client Experience",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/reviewcards\/1701265269_GettyImages-1193505273-1024x417.webp"
                },
                {
                    id: 9,
                    testimonial: "\u201cThe entire staff at Numerique has been phenomenal. They are quick with their replies and incredibly helpful.\u201d",
                    name: "Edward Kennedy",
                    position: "Director, Client Experience",
                    image: "http:\/\/127.0.0.1:8000\/assets\/images\/reviewcards\/1701265269_GettyImages-1193505273-1024x417.webp"
                }
            ]
        },
        contacts: {
            title: "Check out how we may assist with the growth of your company.",
            message: "Ready to speak with a expert Podjinn? Give us a ring",
            phoneNumber: "888-400-5050",
            buttonText: "Ask a Podjinn",
            buttonLink: "NA"
        }
    }

    return (
        <div>
            <Banner data={allHomeData.banner ?? fallbackData.banner} />
            <Services data={allHomeData.offer ?? fallbackData.offer} />
            <Video data={allHomeData.video ?? fallbackData.video}/>
            <Features data={allHomeData.Features ?? fallbackData.features}/>
            <Management data={allHomeData.projectManagement ?? fallbackData.projectManagement}/>
            <Campaign data={allHomeData.campaign ?? fallbackData.campaign}/>
            <Pricing />
            <Testimonial data={allHomeData.reviewSection ?? fallbackData.reviewSection}/>
            <Support data={allHomeData.contacts ?? fallbackData.contacts}/>
        </div>
    )
}

export default Home

// export const pricingData = [
//     {
//         name: 'Basic',
//         description: 'Best option for personal use & for your next project.',
//         price: 29,
//         image: '/img/icons/starter.png',
//         billingCycle: '/month',
//         features: [
//             'Individual configuration',
//             'No setup or hidden fees',
//         ],
//     },
//     {
//         name: 'Standard',
//         description: 'Relevant for multiple users, extended & premium support.',
//         price: 99,
//         image: '/img/icons/company.png',
//         billingCycle: '/month',
//         features: [
//             'Individual configuration',
//             'No setup or hidden fees',
//             'Team size: 10 developers',
//             'Premium support: 24 months',
//             'Free updates: 24 months',
//         ],
//     },
//     {
//         name: 'Enterprise',
//         description:
//             'Best for large scale uses and extended redistribution rights.',
//         price: 499,
//         image: '/img/icons/enterprise.png',
//         billingCycle: '/month',
//         features: [
//             'Individual configuration',
//             'No setup or hidden fees',
//         ],
//     },
// ]

import { WEB_PREFIX_PATH } from "@/constants/route.constant"

export const pricingData = [
  {
    name: "Basic",
    description: 'Best option for personal use & for your next project.',
    monthlyPrice: 1900.99,
    yearlyPrice: 199.99,
    image: '/img/icons/starter.png',
    features: [
      {
        name: "Individual configuration",
        included: true
      },
      {
        name: "No setup or hidden fees",
        included: true
      },
      {
        name: "Team size: 10 developers",
        included: false
      },
      {
        name: "Premium support: 24 months",
        included: false
      },
      {
        name: "Free updates: 24 months",
        included: false
      },
    ]
  },
  {
    name: "Enterprise",
    description: 'Best for large scale uses and extended redistribution rights.',
    monthlyPrice: 5900.99,
    yearlyPrice: 599.99,
    image: '/img/icons/enterprise.png',
    features: [
      {
        name: "Individual configuration",
        included: true
      },
      {
        name: "No setup or hidden fees",
        included: true
      },
      {
        name: "Team size: 10 developers",
        included: true
      },
      {
        name: "Premium support: 24 months",
        included: true
      },
      {
        name: "Free updates: 24 months",
        included: true
      },
    ]
  },
  {
    name: "Standard",
    description: 'Relevant for multiple users, extended & premium support.',
    monthlyPrice: 3900.99,
    yearlyPrice: 399.99,
    image: '/img/icons/company.png',
    features: [
      {
        name: "Individual configuration",
        included: true
      },
      {
        name: "No setup or hidden fees",
        included: true
      },
      {
        name: "Team size: 10 developers",
        included: true
      },
      {
        name: "Premium support: 24 months",
        included: false
      },
      {
        name: "Free updates: 24 months",
        included: false
      },
    ]
  },
]


export const servicesData = {
  heading: 'We solve digital challenges',
  subHeading: 'Here at Podjinn we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.',
  offerCards: [
    {
      id: 1,
      title: 'Web Solutions',
      description:
        'Our web solutions are tailored to meet your business needs, from responsive websites to e-commerce platforms.',
      image: '/img/web/icons/coding.png',
      path: `${WEB_PREFIX_PATH}/offer/websolutions`,
    },
    {
      id: 2,
      title: 'Mobility',
      description:
        'Stay connected with your audience on the go with our mobile app development and solutions.',
      image: '/img/web/icons/mobility.png',
      path: `${WEB_PREFIX_PATH}/offer/mobility`,
    },
    {
      id: 3,
      title: 'Digital Marketing',
      description:
        'Boost your online presence with our digital marketing strategies, including SEO, social media, and more.',
      image: '/img/web/icons/digital-marketing.png',
      path: `${WEB_PREFIX_PATH}/offer/digitalmarketing`,
    },
    {
      id: 4,
      title: 'Design',
      description:
        'Elevate your brand with our creative design services, including graphic design, UI/UX, and more.',
      image: '/img/web/icons/paint-palette.png',
      path: `${WEB_PREFIX_PATH}/offer/design`,
    },
    {
      id: 5,
      title: 'Branding',
      description:
        'Craft a unique identity for your business with our branding services, including logo design and brand strategy.',
      image: '/img/web/icons/branding.png',
      path: `${WEB_PREFIX_PATH}/offer/branding`,
    },
    {
      id: 6,
      title: 'Business Intelligence',
      description:
        'Unlock valuable insights and data-driven decision-making with our business intelligence solutions.',
      image: '/img/web/icons/artificial-intelligence.png',
      path: `${WEB_PREFIX_PATH}/offer/businessintelligence`,
    },
  ]
}

export const homePageData =
{
  banner: {
    largeHeading: "Welcome To Podjinn",
    subHeading: "A new Innovative way to deliver IT Projects",
    btnText: "Discover more",
    btnLink: null
  },
  offer: {
    heading: "WHAT WE OFFER",
    largeHeading: "We solve digital challenges",
    subHeading: "Here at Podjinn we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.",
    btnText: "MORE ABOUT US",
    btnLink: null,
    cards: [
      {
        id: 24,
        title: "Business Intelligence",
        description: "Unlock valuable insights and data-driven decision-making with our business intelligence solutions.",
        image: '/img/web/icons/artificial-intelligence.png',
        path: "web/offer/businessintelligence"
      },
      {
        id: 23,
        title: "Branding",
        description: "Craft a unique identity for your business with our branding services, including logo design and brand strategy.",
        image: '/img/web/icons/branding.png',
        path: "web/offer/branding"
      },
      {
        id: 22,
        title: "Design",
        description: "Elevate your brand with our creative design services, including graphic design, UI/UX, and more.",
        image: '/img/web/icons/paint-palette.png',
        path: "web/offer/design"
      },
      {
        id: 21,
        title: "Digital Marketing",
        description: "Boost your online presence with our digital marketing strategies, including SEO, social media, and more.",
        image: '/img/web/icons/digital-marketing.png',
        path: "web/offer/digitalmarketing"
      },
      {
        id: 20,
        title: "Mobility",
        description: "Stay connected with your audience on the go with our mobile app development and solutions.",
        image: '/img/web/icons/mobility.png',
        path: "web/offer/mobility"
      },
      {
        id: 19,
        title: "Web Solutions",
        description: "Our web solutions are tailored to meet your business needs, from responsive websites to e-commerce platforms.",
        image: '/img/web/icons/coding.png',
        path: "web/offer/websolutions"
      }
    ]
  },
  video: {
    heading: 'VIDEO TUTORIAL OF PODJINN',
    largeHeading: 'You"ll Learn more effectively using videos.',
    url: 'https://podjinn.com/public/podjinn_new_template/video/1.mp4'
  },

  campaign: {
    heading: 'Campaigns & Outcome',
    subHeading:
      'Create engaging campaigns in seconds with programming, targeting exactly why you want to reach with a rich set of real time filters.Track and Analyze Campaign Performance in Real-Time.Generate a Social Score of your digital presence.',
    campaignCards: [
      {
        id: 1,
        title: 'MAXXSCORE',
        upto: '+90%',
        subTitle: 'Quantify Online Presence',
        imgLink: '/img/web/score.jpg',
        tags: [
          {
            tagName: 'In-Depth Analysis',
            link: '',
          },
          {
            tagName: 'Social Metric',
            link: '',
          },
          {
            tagName: 'Key Metric',
            link: '',
          },
        ],
      },
      {
        id: 2,
        title: 'MAXXIFI',
        upto: '+80%',
        subTitle: 'Manage Post Scheduling',
        imgLink: '/img/web/xfi.jpg',
        tags: [
          {
            tagName: 'Multi Platform Integration',
            link: '',
          },
          {
            tagName: 'Mobile Compatibility',
            link: '',
          },
        ],
      },
      {
        id: 3,
        title: 'MAXXRESPONSE',
        upto: '+90%',
        subTitle: 'Optimal Response',
        imgLink: '/img/web/resp.jpg',
        tags: [
          {
            tagName: 'SEO',
            link: '',
          },
          {
            tagName: 'Search',
            link: '',
          },
          {
            tagName: 'Social',
            link: '',
          },
        ],
      },
      {
        title: 'MAXXCAMPAIGN',
        upto: '+80%',
        subTitle: 'Efficient Campaign System',
        imgLink: '/img/web/camp.jpg',
        tags: [
          {
            tagName: 'Work',
            link: '',
          },
          {
            tagName: 'Talent',
            link: '',
          },
          {
            tagName: 'Social',
            link: '',
          },
        ],
      },
    ],

  },
  features: {
    heading: 'Features',
    subHeading: 'We Offer real-time monitoring of your project management for efficient and timely delivery as we contruct projects.The client -centric project management tool is used to create new projects, hire new pods to deliver projects, or choose a podjinn to attain delivery.',
    largeHeading: 'Features that ease your work.',
    featureCards: [
      {
        id: 1,
        title: 'Projects',
        description: 'Explore and manage your projects',
        image: '/img/web/icons/project.png',
        path: `${WEB_PREFIX_PATH}/feature/websolutions`,
      },
      {
        id: 2,
        title: 'Resources',
        description: 'Access valuable resources and documentation',
        image: '/img/web/icons/resources.png',
        path: `${WEB_PREFIX_PATH}/feature/websolutions`,
      },
      {
        id: 3,
        title: 'Communication',
        description: 'Stay connected with team members',
        image: '/img/web/icons/communication.png',
        path: `${WEB_PREFIX_PATH}/feature/websolutions`,
      },
      {
        id: 4,
        title: 'Audit',
        description: 'Review and audit your business operations',
        image: '/img/web/icons/preview.png',
        path: `${WEB_PREFIX_PATH}/feature/websolutions`,
      },
      {
        id: 5,
        title: 'Performance Analysis',
        description: 'Analyze performance metrics and data',
        image: '/img/web/icons/performance.png',
        path: `${WEB_PREFIX_PATH}/feature/websolutions`,
      },
      {
        id: 6,
        title: 'Pipeline Management',
        description: 'Manage your sales and business pipelines',
        image: '/img/web/icons/pipeline.png',
        path: `${WEB_PREFIX_PATH}/feature/websolutions`,
      },
      {
        id: 7,
        title: 'Payments',
        description: 'View and manage payments and transactions',
        image: '/img/web/icons/wallet.png',
        path: `${WEB_PREFIX_PATH}/feature/websolutions`,
      },
      {
        id: 8,
        title: '24/7 Support',
        description: 'Get assistance and support around the clock',
        image: '/img/web/icons/24-hours-support.png',
        path: `${WEB_PREFIX_PATH}/feature/websolutions`,
      },
    ]
  }
}

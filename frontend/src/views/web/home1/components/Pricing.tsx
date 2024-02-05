import React from 'react'
// import { useGetPricingDataQuery } from '../store'
import { useAppSelector } from '@/store'
import classNames from 'classnames'

export type PriceCardState = {
    // [x: string]: any
    name: string
    description: string
    monthlyPrice: number
    yearlyPrice: number
    image: string
    features: { name: string, included: Boolean }[]
}

export const dummyData: PriceCardState[] = [
    {
        name: "Basic",
        description: 'Best option for personal use & for your next project.',
        monthlyPrice: 19.99,
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
        monthlyPrice: 59.99,
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
        monthlyPrice: 39.99,
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


export type PricingData = PriceCardState[] | undefined

const Pricing = () => {
    const allPricingCards = dummyData?.map((p) => {
        return (
            <div key={p.name} className="pricong-inner">
                <div className="imgg">
                    <img className="" src={p.image} />
                </div>
                <h3 className="">{p.name}</h3>
                <p className="">{p.description}</p>
                {/* <!-- List --> */}
                <ul role="list" className="">
                    {p.features.map((feature) => {
                        return (
                            feature.included && <li key={feature.name}>
                                {/* <!-- Icon --> */}
                                <><img className="" src="/img/icons/tick.png" /><span>{feature.name}</span></>
                            </li>
                        )
                    })}
                </ul>
                <div className="pricing">
                    <span className="">
                        <sup>$</sup>
                        {p.monthlyPrice}
                    </span>
                    <span className="">{'/month'}</span>
                </div>
                <a href="#" className="p-btn">
                    Go
                </a>
            </div>
        )
    })

    return (
        <div className="pricing-sec">
            <div className="pricing-img-box">
                <div className="container">
                    <img src="https://numerique.vamtam.com/wp-content/uploads/2023/05/GettyImages-1193505273-1024x417.jpg" alt="" />
                </div>
            </div>
            <div className="pricing-inner-top">
                <div className="container">
                    <div className="what-head">
                        <div className="row">
                            <div className="col-md-6">
                                <h5>Pricing</h5>
                                <h2>We solve digital challenges</h2>
                                <a href="" className="btn-txt">
                                    Explore Features
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="pricing-box-sec">{allPricingCards}</div>
                </div>
            </div>
        </div>
    )
}

export default Pricing

import { useState } from 'react'
import PathComponent from '../components/PathComponent'
import { Radio } from '@/components/ui'
import { PriceCardState } from '../home/components/Pricing';
const PricingPage = () => {
  const [cycle, setCycle] = useState<string>('Monthly')

  const onCycleChange = (val: string) => {
    setCycle(val)
  }

  const dummyData: PriceCardState[] = [
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

  return (
    <div>
      <PathComponent title='Pricing'/>
      <div className='main-pricing-sec'>
        <div className='container'>
          <div className='inner-pricing-box'>
            <div className='row'>
              <div className='col-md-3'>
                <div className="card-box first">
                  <h3>Pick Your Plan</h3>
                  <div>
                    <Radio.Group vertical value={cycle} onChange={onCycleChange}>
                      <Radio value={'Monthly'}>Monthly Billing</Radio>
                      <Radio value={'Yearly'} className=' flex items-center'>Yearly Billing<span className='btn-type ml-2 bg-gray-400 text-white px-2 py-1 rounded-md'>Save 20%</span></Radio>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              {dummyData.map((plan,index)=>
                <div key={index} className='col-md-3'>
                  <div className="card-box">
                    <h3>{plan.name}</h3>
                    <h4>${cycle === 'Monthly' ? plan.monthlyPrice : plan.yearlyPrice} <sub>{cycle === 'Monthly' ? '/month' : '/year'}</sub></h4>
                    <button className='btn'>Go</button>
                  </div>
                </div>
              )}
            </div>
            <div className='pricing-inner-details'>
            {
                dummyData?.[0].features.map((feature, index) => {
                  return (
                    <div key={index} className='row'>
                      <div className='col-md-3'><div>{feature.name}</div></div>
                      <div className='col-md-3'>{dummyData[0].features[index].included ? 
                      <img src='/img/icons/tick.png' className='w-4' /> : <span className='text-xl font-bold'>-</span>}</div>

                      <div className='col-md-3'>{dummyData[1].features[index].included ? 
                      <img src='/img/icons/tick.png' className='w-4' /> : <span className='text-xl font-bold'>-</span>}</div>

                      <div className='col-md-3'>{dummyData[2].features[index].included ? 
                      <img src='/img/icons/tick.png' className='w-4' /> : <span className='text-xl font-bold'>-</span>}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
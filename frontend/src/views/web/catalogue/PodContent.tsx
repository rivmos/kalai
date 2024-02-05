import React, { useEffect } from 'react'
import { AiFillDollarCircle, AiFillPlusSquare } from "react-icons/ai";
import Tabs from '@/components/ui/Tabs'
import { useAppSelector } from './store';
import { getPods } from './store';
import { PodState } from './store';
import { useAppDispatch } from '@/store';
import AvatarGroup from '@/components/ui/Avatar/AvatarGroup';
import { Avatar } from '@/components/ui';
import acronym from '@/utils/acronym';
import { CiMoneyBill, CiTimer } from 'react-icons/ci';
import { Loading } from '@/components/shared';

const { TabNav, TabList, TabContent } = Tabs

const PodContent = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPods())
  }, [])

  const allPods = useAppSelector(state => state.catalogue.data.pods.data)
  const loading = useAppSelector(state => state.catalogue.data.loading)

  const PodCard = ({ podData }: { podData: PodState }) => {


    return (
        <div className="col-md-3">
          <div className="box-card">
            <h6 className="text-center mb-2">{podData.pod_name.slice(0, 20)}...</h6>
            <div className='text-center'>
              <div>
                <label>{podData.services[0].name}</label>
              </div>
            </div>              
            <div className="flex justify-center items-center  m-auto bg-indigo-50 mt-5 p-4 lg:p-4 rounded-2xl">
              <p className='flex flex-col items-center'>
                <CiMoneyBill className='text-2xl text-black' />
                <span>${podData?.pod_average_hourly_rate}/hour</span>
              </p>
            </div>            
            <div className='mt-6 flex justify-between items-center'>
                <button className="btn-txt mx-0">Buy Now</button>
                <AvatarGroup chained maxCount={2} omittedAvatarProps={{ shape: 'circle' }}>
                  {podData.assigned_jinns.map(jinn => <Avatar key={jinn.id} shape='circle' src={jinn.image && jinn.image}>{jinn.image === '' && acronym(jinn.name)}</Avatar>)}
                </AvatarGroup>
              </div>
          </div>
        </div>
    )
  }

  return (

    <div className="what-we-sec">
      <div className="pods-project-sec">
        <Loading loading={loading}>
          <div className="row">
            {allPods?.map(pod => <PodCard key={pod.id} podData={pod} />)}
          </div>
        </Loading>
      </div>
    </div>
  )
}

export default PodContent
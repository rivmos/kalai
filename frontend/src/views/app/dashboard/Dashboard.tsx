import React, { useEffect } from 'react'
import reducer, { getDashboardData, useAppDispatch, useAppSelector } from './store'
import { injectReducer } from '@/store'
import Statistic from './components/Statistic'

injectReducer('dashboardSlice', reducer)

const Dashboard = () => {

  const dispatch = useAppDispatch()
  const dashboardData = useAppSelector(state => state.dashboardSlice.data.dashboard)

  useEffect(() => {
    dispatch(getDashboardData())
  }, [])

  return (
    <>
      <h4 className='mb-4'>
        Dashboard
      </h4>
      <Statistic data={dashboardData} />
    </>
  )
}

export default Dashboard
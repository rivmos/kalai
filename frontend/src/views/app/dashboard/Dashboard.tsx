import React from 'react'
import { useAppSelector } from '@/store'
//import { defineAbilitiesFor } from '@/can'
//import Can from '@/can'

const Dashboard = () => {
  const user = useAppSelector(state => state.auth.user)
  //const ability = defineAbilitiesFor(user)
  /* return (
    <div>
      {ability.can('read', 'adminData') && <div>For Admin</div>}
      {ability.can('read', 'userData') && <div>For User</div>}
      {ability.can('read', 'BlogPost') && <div>Blog Posts</div>}
      <div>{JSON.stringify(user)}</div>
    </div>
  ) */
  return(
    <div></div>
  )
}

export default Dashboard
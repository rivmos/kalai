import React from 'react'
import { useAppSelector } from '@/store'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
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
  return (
    <div className='container'>
      <div className='mb-2'>
        <h4>Hello, <span className="capitalize">Admin!</span></h4>
        <p>Here are all the actions you can take.</p>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {/* <Link to="/app/artists/add">
          <Button className='!w-full !h-52 !border-dashed'>Add Artist</Button>
        </Link> */}
      </div>
    </div>
  )
}

export default Dashboard
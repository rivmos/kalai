import type { SyntheticEvent } from 'react'
import Dropdown from '@/components/ui/Dropdown'
import reducer from "./store"
import { injectReducer } from "@/store"
import { useAppDispatch, useAppSelector } from "./store"
import { getTeamList } from "./store"
import { UserDataState } from './store'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import PathComponent from '../../components/PathComponent'
import 'swiper/swiper-bundle.css';

injectReducer('teamList', reducer)

const ProfileCard = ({ profile } : {profile:UserDataState}) => {
  return (
    <div className="col-md-3">
      <div className="inner-cards">
        <Link to={`/web/users/profile/${profile.userId}`} key={profile.userId}>
          <div className="img-box">
            <img src={profile.funPhoto} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div className="card-txt">
            <h4>{profile.name}</h4>
            {/* <span>{profile.location}</span> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

const ViewAll = () => {


  const dropdownCountries = [
    { key: 'a', name: 'India' },
    { key: 'b', name: 'USA' },
    { key: 'c', name: 'Australia' },
    { key: 'd', name: 'Canada' },
    { key: 'd', name: 'UAE' },
    { key: 'd', name: 'UK' },
  ]

  
  const [selectCountry, setSelectedCountry] = useState(dropdownCountries[0].name)


  const onCountryChange = (country: any) => {
    // console.log('Dropdown Item Clicked', e) 
    setSelectedCountry(country)
  }

  const onDropdownClick = (e: SyntheticEvent) => {
    console.log('Dropdown Clicked', e)
  }

  const dispatch = useAppDispatch()
  const teamList: UserDataState[] = useAppSelector(state => state.teamList.data.data.userdetail)

  useEffect(() => {
    dispatch(getTeamList())
  }, [])



  return (
    <div className="about-sec">
      <PathComponent title='Teams' />


      <div className="team-member-sec">
        <div className="team-member-img">
          <img src="/img/web/about-second-img.jpg" alt="" />
        </div>
        <div className="container">
          <h3>
            Team Members
            <div className='about-head'>
              <label>Select Country :</label>
              <Dropdown title={selectCountry} onClick={onDropdownClick}>
                {dropdownCountries.map((item) => (
                  <Dropdown.Item
                    key={item.key}
                    onSelect={(key, e: SyntheticEvent) => onCountryChange(item.name)}
                  >
                    {item.name}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          </h3>
          <div className="row">
            {teamList.map((teamMember) => (
              <ProfileCard key={teamMember.id} profile={teamMember} />
            ))}
          </div>

        </div>
      </div>

      <div className="clients">
        <div className="container">
          <h2 className="text-3xl font-semibold mb-6">Our Clients</h2>
          <ul>
            <li><img src="/img/web/client-img1.png" alt="" /></li>
            <li><img src="/img/web/client-img2.png" alt="" /></li>
            <li><img src="/img/web/client-img3.png" alt="" /></li>
            <li><img src="/img/web/client-img4.png" alt="" /></li>
            <li><img src="/img/web/client-img5.png" alt="" /></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ViewAll
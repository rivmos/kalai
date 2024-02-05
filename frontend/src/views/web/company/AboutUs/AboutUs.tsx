import { useEffect, useState } from 'react'
import 'swiper/swiper-bundle.css';
import type { SyntheticEvent } from 'react'
import Dropdown from '@/components/ui/Dropdown'
import { useAppDispatch, useAppSelector } from "./store"
import { getTeamList } from "./store"
import { UserDataState } from './store'
import PathComponent from '../../components/PathComponent'
import PageHeader from '../../components/PageHeader'
import { injectReducer } from "@/store"
import { Link, useNavigate } from 'react-router-dom';
import { WEB_PREFIX_PATH } from '@/constants/route.constant'
import reducer from "./store"

injectReducer('teamList', reducer)

const ProfileCard = ({ profile }: { profile: UserDataState }) => {
  return (
    <div className="col-md-3">
      <div className="inner-cards">
        <Link to={`/web/users/profile/${profile.id}`} key={profile.id}>
          <div className="img-box">
            <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div className="card-txt">
            <h4>{profile.name}</h4>
            <span>{profile.location}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate(`${WEB_PREFIX_PATH}/AboutUs/team`);
  };

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
    setSelectedCountry(country)
  }

  const onDropdownClick = (e: SyntheticEvent) => {
    console.log('Dropdown Clicked', e)
  }

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTeamList())
  }, [])

  const teamList: UserDataState[] = useAppSelector(state => state.teamList.data.data.userdetail)
  console.log(teamList)
  const visibleTeamMembers = teamList?.slice(0, 4);


  return (
    <div className="about-sec">
      <PathComponent title='About Us' />


      <PageHeader showButton={false} isImage largeHeading='Our Vision' subHeading={`Podjinn is a one-stop destination for establishing professional connections with clients from around the world. Our platform offers a smooth and effective means of collaboration, whether you're an exceptionally talented individual willing to offer your skills or an agency looking for top-tier experts for your projects.`} imageSrc='/img/web/visson-img.jpg' direction='ltr' />

      <div className='mb-28'>
        <div className='container'>
          <svg xmlns="http://www.w3.org/2000/svg" height="41" viewBox="0 0 1281 41" width="1281"><path d="m681.26 0c16.95 0 33.1 7.17 44.46 19.71l.4.46c11.1958 12.6130166 27.254825 19.8308421 44.12 19.83h510.76v1h-510.76c-16.937962.0011746-33.087086-7.1580522-44.46-19.71l-.4-.46c-11.1958-12.61301661-27.254825-19.83084209-44.12-19.83h-88.86c-16.41473-.0012407-32.037784 7.05444958-42.89 19.37l-.4.46c-11.041724 12.7995683-27.105901 20.16186-44.01 20.17h-505.1v-1h505.09c16.41473.0012407 32.037784-7.0544496 42.89-19.37l.4-.46c11.044006-12.80221079 27.112409-20.16476637 44.02-20.17z" opacity=".1" /></svg>
        </div>
      </div>

      <PageHeader showButton={false} isImage largeHeading='Our Mission' subHeading={`At Podjinn, we stay apprised of the changing nature of the job market and the rising popularity of working independently and remote work alternatives. Our goal is to close the communication gap between resources and clients so that they may more easily locate one another and collaborate effectively.`} imageSrc='/img/web/about-first-img.jpg' direction='rtl' />

      <div className="pt-20 team-headd">
        <PageHeader
          direction='ltr'
          showButton={false}
          heading="Empowering Team globally"
          largeHeading="Let's work together to solve all your problems."
          isImage={false}
          imageSrc="path/to/your-image.jpg"
          contendtext="At Podjinn, we empower you to manage every aspect of your projects effectively. From task assignments and timelines to resource allocation, view workload of resource, Load balancing on resources based on avaiability, progress tracking and secure payment process."
        />
      </div>



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
            {visibleTeamMembers?.map((teamMember) => (
              <ProfileCard key={teamMember.id} profile={teamMember} />
            ))}
          </div>
          {teamList?.length > visibleTeamMembers?.length && (
            <div className='view-button' >
              <button onClick={handleViewAllClick} className="btn-txt" >View All</button>
            </div>
          )}
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

export default AboutUs

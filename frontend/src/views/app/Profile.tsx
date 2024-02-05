import { useEffect, useState } from 'react'
import { BsFillCircleFill } from 'react-icons/bs'
import { AiFillDollarCircle } from 'react-icons/ai'
import { HiBadgeCheck } from 'react-icons/hi'
import { FaGraduationCap } from 'react-icons/fa'
import { AiFillCloud } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom';
import { ResponseState, UserDataState } from '../web/company/AboutUs/store'
import Chart from 'react-apexcharts'
import { COLORS, COLOR_2 } from '@/constants/chart.constant'
import { useAppSelector } from '../web/company/AboutUs/store'
import { apiGetUserProfile } from '@/services/UserService'
import './profile.css'
import { color } from 'framer-motion'
import classNames from 'classnames'

const Profile = () => {

    const [loading, setLoading] = useState<Boolean>(true)
    const [profile, setProfile] = useState<UserDataState>()

    const { id } = useParams()

    // const users = useAppSelector(state => state.teamList.data.data.userdetail)

    // const profile = users.find(user => user.user_id === Number(id))

    useEffect(() => {
        apiGetUserProfile<ResponseState>(Number(id)).then((res) => {
            setProfile(res?.data?.userdetail[0])
            setLoading(false)
        })
    }, [])

    const linedata = [
        {
            name: 'Desktops',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
    ]
    return (
        <>
        <div className="profile-page-sec">
            <div className='container'>
                <div className="profile-heading">Profile</div>
                <div className='dp-boxx'>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="avatar-group">
                                <img src={profile?.photo} className='dp-img' />
                                <div className="avatar-badge">
                                    <img src="/img/web/badge.png"/>
                                </div>
                            </div>
                            <div className="dolr-mg">
                                <ul>
                                    <li>
                                        <div className={classNames({ 'active': Boolean(profile?.isActive), 'inactive': true })}><i></i></div>
                                        <span>{Boolean(profile?.isActive) ? 'Active' : 'InActive'}</span>
                                    </li>
                                    <li>
                                        <AiFillDollarCircle size={20} color="#3F007B" />
                                        <span>{(Number(profile?.offeredCtc)/(22*8*80)).toFixed(1)}$ USD/Hour</span>
                                    </li>
                                    <li>
                                        <div className="img">
                                            <img src="/img/web/usa-flag.png" alt="" />
                                        </div>
                                        <span>{profile?.location}</span>
                                    </li>
                                    <li>
                                        <HiBadgeCheck size={22} color="#3F007B" />
                                        <span>Joined: {new Date(profile?.dateOfJoining!).toDateString()}</span>
                                    </li>
                                    <li>
                                        <div className="img">
                                            <img src="/img/web/university-icon.png" alt="" />
                                        </div>
                                        <span>{profile?.qualification ? profile?.qualification : 'Not Available'}</span>
                                    </li>
                                    <li>
                                        <FaGraduationCap size={24} color="#3F007B" />
                                        <span>B.tech(CSE)</span>
                                    </li>
                                    <li>
                                        <AiFillCloud size={24} color="#3F007B" />
                                        <span>Cloud</span>
                                    </li>
                                </ul>                    
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className='dp-detail'>
                                <h3>{profile?.name}</h3>
                                <h6>Sr. PHP Developer</h6>
                                <div className="experience">
                                    <strong>Experience: </strong> <span> 3 years, 4 months</span>
                                </div>
                                <div className="rating-star">                            
                                    {Array.from({ length: 4 }).map((item, index) => (
                                        <AiFillStar key={index} className="text-yellow-500" />
                                    ))}
                                    {Array.from({ length: 5 - 4 }).map((item, index) => (
                                        <AiOutlineStar key={index} className="text-yellow-500" />
                                    ))}
                                    <strong>5/5</strong>
                                </div>
                                <div className="job-completion">
                                    <span className='jc-s'>Jobs Completion: <strong>100%</strong></span>
                                    <span>OnTime: <strong>100%</strong></span>
                                </div>
                            </div>
                            <div className="cinema-badge">
                                <div className="reward">
                                    <img src="/img/web/cinema-ticket.png" alt="" />
                                    <span>Reward Movie <strong>Ticket</strong></span>
                                </div>
                            </div>

                            <div className="description">
                                <p>Hii, I am Podjinn will go along to thrive towards its goal of industry leading and sustainability visions in the upcoming quarter of the year.</p>
                                <p>Podjinn will go along to thrive towards its goal of industry-leading and sustainability visions in the upcoming quarter od the year. Since we do that, we commit that we will be working very hard to excel in our execution in the aspects where results are very strong,while excitingly addressing those areas of our functioning in which we recognize the biggest chances for improvement.</p>                    
                                <p>Thank You for visiting my profile</p>
                            </div>
                            <div className="graph-section">
                                <div>
                                    Skills
                                </div>
                                <div className="skills">
                                    <div className="skill-1">
                                        <ul>
                                            <li><span>HTML</span></li>
                                            <li><span>CSS</span></li>
                                            <li><span>CSS3</span></li>
                                            <li><span>SASS</span></li>
                                            <li><span>LESS</span></li>
                                            <li><span>BootStrap</span></li>
                                            <li><span>AMP</span></li>
                                            <li><span>Javascript</span></li>
                                            <li><span>Jquery</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="graph-section">
                                <div className='date-avl'>
                                    Availability
                                    <div className="">
                                        <input type="date" name="date"></input>
                                        <span>To</span>
                                        <input type="date" name="date"></input>
                                    </div>
                                </div>
                                <ul className='avl'>
                                    <li>48 Hours / Weekly</li>
                                    <li>181 Hours / Monthly</li>
                                    <li>580 Hours / Quarterly</li>
                                </ul>
                                <Chart
                                    options={{
                                        chart: {
                                            type: 'line',
                                            zoom: {
                                                enabled: false,
                                            },
                                        },
                                        dataLabels: {
                                            enabled: false,
                                        },
                                        stroke: {
                                            curve: 'smooth',
                                            width: 3,
                                        },
                                        colors: [COLOR_2],
                                        xaxis: {
                                            categories: [
                                                'Jan',
                                                'Feb',
                                                'Mar',
                                                'Apr',
                                                'May',
                                                'Jun',
                                                'Jul',
                                                'Aug',
                                                'Sep',
                                            ],
                                        },
                                    }}
                                    series={linedata}
                                    height={300}
                                />
                            </div>
                            <div className="graph-section">
                                <div>
                                    Certifications
                                </div>
                                <ul className='cer-nme'>
                                    <li><img src="/img/web/certifications-img1.png" alt="" /></li>
                                    <li><img src="/img/web/certifications-img2.png" alt="" /></li>
                                </ul>
                            </div>
                            <div className="graph-section">
                                <div>
                                    Portfolio
                                </div>
                                <ul className='cer-nme'>
                                    <li><img src="/img/web/portfolio-img1.png" alt="" /></li>
                                    <li><img src="/img/web/portfolio-img2.png" alt="" /></li>
                                </ul>
                            </div>
                            <div className="graph-section">
                                <div>
                                    Work
                                </div>
                                <Chart
                                    options={{
                                        colors: COLORS,
                                        // labels: [
                                        //     'Team A',
                                        //     'Team B',
                                        //     'Team C',
                                        //     'Team D',
                                        //     'Team E',
                                        // ],
                                        responsive: [
                                            {
                                                breakpoint: 480,
                                                options: {
                                                    chart: {
                                                        width: 200,
                                                    },
                                                    legend: {
                                                        position: 'bottom',
                                                    },
                                                },
                                            },
                                        ],
                                    }}
                                    series={[44, 55, 13, 43, 22]}
                                    height={300}
                                    type="pie"
                                />
                            </div>
                            <div className="graph-section">
                                <div>
                                Socials
                                </div>
                                <ul className='cer-nme'>
                                    <li><img src="/img/web/socail-img1.png" alt="" /></li>
                                </ul>
                            </div>



                        </div>
                    </div>
                    

                    

                    

                </div>




                
                
                
                
                

                
            </div>
        </div>
        </>
    )
}

export default Profile

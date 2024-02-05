import React, { useEffect } from 'react'
import Tabs from '@/components/ui/Tabs';
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from '@/store';
import { ProjectState, getProjects, useAppSelector } from './store';
import { Link } from 'react-router-dom'
import { Loading } from '@/components/shared';
import { CiMoneyBill } from 'react-icons/ci';
import { AiOutlineHourglass } from 'react-icons/ai';
import { CiTimer } from "react-icons/ci";

const { TabNav, TabList, TabContent } = Tabs;


const ProjectContent = () => {

  const horizontalLineStyle = {
    borderTop: '1px solid #D3D3D3',
    margin: '10px 0',
  };

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProjects())
  }, [])

  const allProjects = useAppSelector(state => state.catalogue.data.projects.data)
  const loading = useAppSelector(state => state.catalogue.data.loading)

  const navigate = useNavigate();

  const ProjectCard = ({ projectData }: { projectData: ProjectState }) => {

    return (
      <div className='col-md-3'>
        <div className="box-card">
          <div className="">
            <Link to={`/web/catalogue/project/${projectData.id}`}>
              <h6 className="text-center mb-2">{projectData.title}</h6>
            </Link>
            <div className='text-center'>
              <div>
                {/* <label>Service : </label> */}
                <label>{projectData.serviceName}</label>
              </div>
              <div>
                {/* <label>Specific Service : </label> */}
                <label>{projectData.specificServiceName}</label>
              </div>
            </div>
            <div className="grid grid-cols-2  m-auto bg-indigo-50 mt-5 p-4 lg:p-4 rounded-2xl">
              <p className='flex flex-col items-center'>
                <CiMoneyBill className='text-2xl text-black' />
                <span>${projectData.totalCost}</span>
              </p>
              <p className='flex flex-col items-center'>
                <CiTimer className='text-2xl text-black' />
                <span>{projectData.totalTime} Hrs</span>
              </p>
            </div>
            <div className='flex flex-col gap-3 mt-6'>
              <button className="btn-txt">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="what-we-sec">
        <div className='pods-project-sec'>
          <Loading loading={loading}>
            <div className="row">
              {
                allProjects.map(project => <ProjectCard key={project.id} projectData={project} />)
              }
            </div>
          </Loading>
        </div>
      </div>
    </div>

  )
}

export default ProjectContent
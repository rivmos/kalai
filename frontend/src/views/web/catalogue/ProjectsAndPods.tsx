import React, { useState } from 'react'
import PathComponent from '../components/PathComponent';
import ProjectContent from './ProjectContent'
import PodContent from './PodContent'
import { injectReducer } from '@/store'
import reducer from './store';
import { Button, Input } from '@/components/ui';
import { CiSearch } from "react-icons/ci";
import { AiFillPlusSquare } from "react-icons/ai";
import { Link } from 'react-router-dom';

injectReducer('catalogue', reducer)

const ProjectsAndPods = () => {

  const [activeTab, setActiveTab] = useState('project');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const tabName = activeTab === 'project' ? 'Projects' : 'Pods'

  return (
    <div>
      <PathComponent title='Projects And Pods' />
      <div className='container flex flex-col gap-8'>
        <p className="text-center px-40">Connect with your target audience and transform your business with our digital marketing solutions. Being the best digital marketing company in USA, we offer you comprehensive marketing strategies that encompass new insights and help you stand apart from your counterparts. We leverage all digital channels to boost your ROI and apply creative marketing tactics with measurable results.</p>      
      <div className="srch-btn-secc">
        <div className='flex justify-center'>
          <input className="rounded-lg w-[600px]" placeholder={`Search ${tabName}`} />
        </div>
        <div className="">
          <Link to="/app/projects/createproject">
            <Button variant='default' className='btn'>Create Custom {tabName}</Button>
          </Link>
        </div>                
      </div>

        <div className="pods-tab-btn">
          <div className='flex items-center gap-4 justify-center'>
            <Button className={`btn-txt ${activeTab === 'project' ? 'active' : ''}`} onClick={() => handleTabClick('project')}>Projects</Button>
            <Button className={`btn-txt ${activeTab === 'pods' ? 'active' : ''}`} onClick={() => handleTabClick('pods')}>Pods</Button>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <h4>Ready to Go {tabName}</h4>          
        </div>

        <div className="actions-container">
          {activeTab === 'project' && <ProjectContent />}
          {activeTab === 'pods' && <PodContent />}
        </div>
      </div>
    </div>
  )
}

export default ProjectsAndPods                      
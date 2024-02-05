import React from 'react'
import Card from '@/components/ui/Card'
import CardComponent from './CardComponent'
import ProposedList from './ProposedList';
import ActionBar from '../../project/ProjectList/components/ActionBar';
import Bar from './PublishedBar';
const ArchivedList = () => {
  const dummyData = [
    {
      id: 1,
      name: 'Project 1',
      category: 'Category 1',
      desc: 'Description 1',
      attachmentCount: 3,
      totalTask: 10,
      completedTask: 5,
      progression: 50,
      dayleft: 7,
      status: 'In Progress',
      member: [
        { name: 'John Doe', img: 'http://localhost:5174/img/avatars/thumb-5.jpg' },
        { name: 'Jane Doe', img: 'http://localhost:5174/img/avatars/thumb-8.jpg' },
      ],
    },
    
    {
      id: 2,
      name: 'Project 2',
      category: 'Category 2',
      desc: 'Description 2',
      attachmentCount: 1,
      totalTask: 8,
      completedTask: 3,
      progression: 37.5,
      dayleft: 5,
      status: 'Completed',
      member: [
        { name: 'Alice Smith', img: 'http://localhost:5174/img/avatars/thumb-5.jpg' },
        { name: 'Bob Johnson', img: 'http://localhost:5174/img/avatars/thumb-8.jpg' },
      ],
    },
   
    {
      id: 2,
      name: 'Project 2',
      category: 'Category 2',
      desc: 'Description 2',
      attachmentCount: 1,
      totalTask: 8,
      completedTask: 3,
      progression: 37.5,
      dayleft: 5,
      status: 'Completed',
      member: [
        { name: 'Alice Smith', img: 'http://localhost:5174/img/avatars/thumb-6.jpg' },
        { name: 'Bob Johnson', img: 'http://localhost:5174/img/avatars/thumb-3.jpg' },
      ],
    }, {
      id: 2,
      name: 'Project 2',
      category: 'Category 2',
      desc: 'Description 2',
      attachmentCount: 1,
      totalTask: 8,
      completedTask: 3,
      progression: 37.5,
      dayleft: 5,
      status: 'Completed',
      member: [
        { name: 'Alice Smith', img: 'http://localhost:5174/img/avatars/thumb-3.jpg' },
        { name: 'Bob Johnson', img: 'http://localhost:5174/img/avatars/thumb-6.jpg' },
      ],
    },
    // Add more objects as needed
  ];
  return (
    <div>
    
<Bar title='Archived List'/>

<div className="grid grid-cols-4 gap-4">
      {dummyData.map((project) => (
        <div key={project.id}>
          <ProposedList data={project} />
         
        </div>
      ))}
    </div>
</div>
  )
}

export default ArchivedList
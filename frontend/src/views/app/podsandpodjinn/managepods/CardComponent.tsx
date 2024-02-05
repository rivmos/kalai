import React from 'react';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Modal from './Modal';
import { Link } from 'react-router-dom';

const CardComponent = () => {
    const cardFooter = (

        <div className="flex items-center">
            <span>
                <h6 className="text-sm">Harpreet Singh</h6>
                <span className="text-m font-bold">Marketing and Integration Expert</span>
                <br />
            </span>
            <div className='ml-8'>
                <Avatar.Group
                    chained
                    maxCount={4}
                    omittedAvatarProps={{ shape: 'circle' }}
                    omittedAvatarTooltip
                    onOmittedAvatarClick={() => console.log('Omitted Avatar Clicked')}
                >
                    <Avatar shape="circle" src="/img/avatars/thumb-1.jpg" />
                    <Avatar shape="circle" src="/img/avatars/thumb-2.jpg" />
                    <Avatar shape="circle" src="/img/avatars/thumb-3.jpg" />
                    <Avatar shape="circle" src="/img/avatars/thumb-4.jpg" />
                    <Avatar shape="circle" src="/img/avatars/thumb-5.jpg" />
                    <Avatar shape="circle" src="/img/avatars/thumb-6.jpg" />
                </Avatar.Group>
            </div>
        </div>
    );

    return (
        <Link to="/podsandpodjinn/poddetails">
        <div className="flex space-x-4">
            
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid w-1/3"
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <span className='font-lg text-lg' >Assigned Project</span>
                <br />
                <br />
                <span className='font-bold text-lg text-purple-600' >Marketing and Payment Integration</span>
                <br />
                <div className='flex items-center'>
                    <span className='font-bold mt-3' style={{ color: "gray" }}>Status:    </span>
                 
                        
                        <span className='font-bold text-lg mt-2 ml-3 mr-1' style={{ color: 'green' }}>●</span>
                 
                    <span className='font-bold text-m mt-2 text-gray-600'>In Progress</span>
                </div>
            </Card>
           
            

            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid w-1/3"
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <span className='font-lg text-lg' >Assigned Project</span>
                <br />
                <br />
                <span className='font-bold text-lg text-purple-600' >Marketing and Payment Integration</span>
                <br />
                <div className='flex items-center'>
                    <span className='font-bold mt-3' style={{ color: "gray" }}>Status:    </span>
                    <span className='font-bold text-lg mt-2 ml-3 mr-1' style={{ color: 'green' }}>●</span>
                    <span className='font-bold text-m mt-2 text-gray-600'>In Progress</span>
                </div>
              
            </Card>

        </div>
        </Link>
    );
};

export default CardComponent;

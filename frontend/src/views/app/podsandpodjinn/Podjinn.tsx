// PodjinnsTable.tsx
import React, { useEffect } from 'react';
import Table from '@/components/ui/Table';
import reducer, { useAppSelector } from './store';
import { injectReducer, useAppDispatch } from '@/store';
import { getPodjinns, PodjinnsState } from './store';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { HiOutlineEye, HiOutlinePlusCircle, HiOutlineSearch } from 'react-icons/hi';
import Avatar from '@/components/ui/Avatar';
import Input from '@/components/ui/Input';
import { IoEyeOutline } from 'react-icons/io5';
import AddPodjinn from './AddPodjinn';
import { Link } from 'react-router-dom';

injectReducer('podjinns', reducer);

const { Tr, Th, Td, THead, TBody } = Table;

const PodjinnsTable = () => {
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPodjinns());
  }, []);

  const ApiData = useAppSelector((state) => state.podjinns.data.podjinns);
  console.log('ApiData', ApiData);

  const getInitials = (name: string): { initials: string; bgColor: string } => {
    const names = name.split(' ');
    let initials = '';
  
    if (names.length === 1) {
      // User doesn't have a surname
      initials = names[0].substring(0, 2).toUpperCase();
    } else {
      // User has a surname
      for (let i = 0; i < names.length; i++) {
        if (i === 2) {
          break;
        }
        initials += names[i].charAt(0).toUpperCase();
      }
    }

    // Generate a random background color
    const bgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    return { initials, bgColor };
  };

  const ProjectListCard = ({ projectList }: { projectList: PodjinnsState }) => {
    const { initials, bgColor } = getInitials(projectList.name);

    return (
      <Tr key={projectList.id}>
        <Td>
          {projectList.image ? (
            <Avatar shape="circle" src={projectList.image} size={30} />
          ) : (
            <div
            className="avatar-placeholder"
            style={{
              backgroundColor: bgColor,
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: 'white', fontSize: '14px', lineHeight: '1' }}>
              {initials}
            </span>
          </div>
          )}
        </Td>
        <Td>
          <p>{projectList.name}</p>
        </Td>

        <Td>{projectList.service}</Td>
        <Td>{projectList.technology}</Td>
        <Td>
          <span className="text-blue-500 cursor-pointer">
            <Link to={`/web/users/profile/${projectList.id}`}>
              <IoEyeOutline color="grey" size="20" />
            </Link>
          </span>
        </Td>
      </Tr>
    );
  };

  return (
    <div>
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">Podjinns</h3>
        <div className="flex flex-col md:flex-row md:items-center gap-1">
          <Input
            size="sm"
            className="rounded-md input-filedd"
            placeholder="Search"
            prefix={<HiOutlineSearch />}
          />

          <AddPodjinn  />
        </div>
      </div>

      <br />

      <Table>
        <THead>
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>

            <Th>Service</Th>
            <Th>Technology</Th>
            <Th>Action</Th>
          </Tr>
        </THead>
        <TBody>
          {ApiData?.podjinns?.map((project: any) => (
            <ProjectListCard key={project.id} projectList={project} />
          ))}
        </TBody>
      </Table>
    </div>
  );
};

export default PodjinnsTable;

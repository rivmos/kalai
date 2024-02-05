import React, { useEffect } from 'react';
import Card from '@/components/ui/Card';
import CardComponent from './CardComponent';
import ProposedList from './ProposedList';
import ActionBar from '../../project/ProjectList/components/ActionBar';
import Bar from './PublishedBar';
import PublishedBar from './PublishedBar';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { getPods, useAppDispatch, useAppSelector } from '../store';
import { PodState } from '@/views/web/catalogue/store';

const PublishedPods: React.FC = () => {
  const pods = useAppSelector((state) => state.podjinns?.data?.pods?.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPods());
  }, [dispatch]);

  return (
    <div>
      <PublishedBar title='Published Pods' />

      <div className="grid grid-cols-4 gap-4">
        {pods && Array.isArray(pods) ? (
          pods.map((pod: PodState) => (
            <div key={pod.id}>
              <div>{pod.pod_name}</div>
              <div>{pod.pod_average_hourly_rate}</div>
              <div>{pod.podjinn?.id}</div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PublishedPods;

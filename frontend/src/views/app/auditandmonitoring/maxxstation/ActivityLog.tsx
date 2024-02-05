import React, { useState, useEffect } from "react";
import Card from '@/components/ui/Card';
import Checkbox from '@/components/ui/Checkbox'
import Timeline from '@/components/ui/Timeline';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Tag from '@/components/ui/Tag';
import { HiTag } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Tooltip from '@/components/ui/Tooltip'
import type { AvatarProps } from '@/components/ui/Avatar'
import reducer, { useAppSelector } from './store';
import { injectReducer, useAppDispatch } from '@/store';
import { ActivityLogsState, getActivitylog } from './store/maxxstationSlice';
import acronym from '../../../../utils/acronym';
import LogList from "../LogList/LogList";
import Spinner from '@/components/ui/Spinner'

injectReducer('maxxstation', reducer)


type TimelineAvatarProps = AvatarProps

const TimelineAvatar = ({ children, ...rest }: TimelineAvatarProps) => {
  return (
    <Avatar {...rest} size={25} shape="circle">
      {children}
    </Avatar>
  )
}

const ActivityLog = () => {

  const dispatch = useAppDispatch()
  const [checkedValues, setCheckedValues] = useState<any[]>([]);
  const ActivityLogData = useAppSelector(state => state.maxxstation.data.activitylog.activitydata);
  const ActivityLogLoading = useAppSelector((state) => state.maxxstation.data.loading);

  useEffect(() => {
    dispatch(getActivitylog())
  }, [])

  const handleCheckboxChange = (value: any) => {
    if (checkedValues.includes(value)) {
      setCheckedValues(checkedValues.filter((item: any) => item !== value));
    } else {
      setCheckedValues([...checkedValues, value]);
    }
  };

  return (
    <>
      {ActivityLogLoading ? (
        <div className="center-spinner">
          <Spinner size={40} />
        </div>
      ) : (
        <div className="activity-log-sec">
          <div className='row'>
            <div className='col-md-9'>
              <h3 className="pb-12">Activity Log</h3>
              <Timeline>
                {((ActivityLogData[0]?.data || []) as any).map((item: any) => (
                  <div key={item.id}>
                    <Timeline.Item
                      media={
                        <Tooltip title={item.user.name}>
                          <TimelineAvatar className={item.user.name === "vishal"
                                ? "bg-yellow-500"
                                : item.user.name === "Devesh"
                                  ? "bg-green-500"
                                  : item.user.name === "harpreet singh"
                                    ? "bg-orange-500"
                                    : "bg-emerald-500"}>
                            {acronym(item.user.name)}
                          </TimelineAvatar>
                        </Tooltip>
                      }
                    >
                      <Link to={`/app/anm/maxxstations/taskscreen/${item.user.id}&taskId${item.task.id}`}>
                        <div className="my-1 flex items-center">
                          <span className="">
                            <strong className="mr-2">{item.project.project_name}{''}</strong>
                            ({item.task.task_name})
                          </span>
                          <Tooltip title="View Screen">
                            <span className="mx-2">
                              <strong className="mr-2">
                                has changed{''}
                              </strong>
                              the status to
                            </span>
                          </Tooltip>
                          <Badge
                            className={
                              item.status === "Pending"
                                ? "bg-yellow-500"
                                : item.status === "Approve"
                                  ? "bg-green-500"
                                  : item.status === "Disprove"
                                    ? "bg-red-500"
                                    : "bg-emerald-500"
                            }
                          ></Badge>
                          {/* <Tooltip title={item.approved_hour}> */}
                          <span className="ml-2">
                            <strong>{item.status}</strong>
                          </span>
                          {/* </Tooltip> */}
                          <span className="ml-2">{item.spent_time_minutes}hr ago</span>
                        </div>
                      </Link>
                    </Timeline.Item>
                    {/* <Timeline.Item
                      media={
                        <TimelineAvatar
                          src={item.user.image}
                          className="bg-amber-500"
                        />
                      }
                    >
                      <div className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {item.user.name}
                        </span>
                        <span className="mx-2">comment on your </span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          Post
                        </span>
                        <span className="ml-3 rtl:mr-3">2d ago</span>
                      </div>
                      {item.description ? <Card className="mt-4">
                        <p>
                          {item.description}
                        </p>
                      </Card> : null
                      }
                      {item.is_manual_log !== 0 ?
                        <div className="flex items-center">
                          <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Manual log{' '}
                            {item.meeting_type}
                          </span>
                          <span className="ml-3 rtl:mr-3">2d ago</span>
                        </div> : null
                      }
                    </Timeline.Item> */}
                  </div>
                ))}
              </Timeline>
            </div>
            <div className='col-md-3 flex flex-col mb-5'>
              <div className="btn-boxx">
                <Link to="/app/anm/Loglist">View Log List</Link>
              </div>
              <h4 style={{ fontWeight: 700, paddingTop: "40px" }}>Filter Activity</h4>
              <Checkbox.Group vertical style={{ paddingTop: "12px" }}>
                <Checkbox value="Ticket status" onChange={() => handleCheckboxChange("Ticket status")}>Complete</Checkbox>
                <Checkbox value="Assign ticket" onChange={() => handleCheckboxChange("Assign ticket")}>On Going</Checkbox>
                <Checkbox value="New ticket" onChange={() => handleCheckboxChange("New ticket")}>Over Due</Checkbox>
              </Checkbox.Group>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ActivityLog


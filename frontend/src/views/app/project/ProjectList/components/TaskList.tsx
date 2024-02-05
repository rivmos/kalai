import React, { Dispatch, SetStateAction, useState } from 'react'
import Accordion from '@/components/ui/Accordian/Accordian'
import { CreateProjectState } from './CreateProject';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import classNames from 'classnames';
import { Button } from '@/components/ui';
import { IoMdAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md'
import { IoIosArrowDown } from "react-icons/io";
import { FaTasks } from "react-icons/fa";

const TaskList = ({ userSelection, handleDeleteTask }: { userSelection: CreateProjectState, handleDeleteTask: (taskTitle: string) => void }) => {
    const [expanded, setExpanded] = useState<false | number>(0);

    return (
        <div>
            {userSelection.taskList.length > 0 && (
            <div className="flex flex-col">
                <div className="bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="relative w-full overflow-hidden p-4">
                        {userSelection.taskList.map((task, index) => {
                            const isOpen = index === expanded;
                            return (
                                <div key={index}>
                                    <div className={classNames("relative cursor-pointer transition-all duration-300")} onClick={() => setExpanded(isOpen ? false : index)}>
                                        <div className={classNames("p-5 bg-white rounded-lg flex mb-4 items-center justify-between space-x-8 transition-all duration-300", {'!bg-slate-200 transition-colors duration-800':isOpen})}>
                                            <div className="flex-1 flex justify-between items-center">
                                                <div className='flex items-center gap-2'>
                                                    <div className='flex items-center bg-violet-300 p-2 rounded-full text-white'>
                                                        <FaTasks />
                                                    </div>
                                                    <span className='flex items-center gap-2 font-semibold'>
                                                        {task.title}
                                                    </span>
                                                </div>

                                                <div className="rounded-lg bg-purple-300">
                                                    <Button variant="default" className='relative !p-2' onClick={() => { handleDeleteTask(task.title) }}><MdDelete /></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Accordion isOpen={isOpen} >
                                        <div className='px-4'>
                                            <label>{task.title}</label>
                                            <p className="text-gray-700">{task.description}</p>
                                            <div>
                                                <strong>Priority:</strong> {task.priority === 0 ? 'None' : task.priority === 1 ? 'Low' : task.priority === 2 ? 'Medium' : 'High'}
                                            </div>
                                            <div>
                                                <strong>Estimated Time:</strong> {task.estimatedTime} Hrs
                                            </div>
                                        </div>
                                    </Accordion>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )}
        </div>
    )
}

export default TaskList
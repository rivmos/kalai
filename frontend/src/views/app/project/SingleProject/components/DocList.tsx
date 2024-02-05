import { useConfig } from '@/components/ui/ConfigProvider';
import React from 'react'
import { CiImageOn } from "react-icons/ci";
import { VscNotebook } from "react-icons/vsc";
import { CiLink } from "react-icons/ci";

const FileCard = () => {
    const { primaryColorLevel, themeColor } = useConfig()
    return (
        <div className={`bg-zinc-50 rounded-md p-4 h-24 flex flex-col justify-between`}>
            <div className='flex items-center gap-2'>
                <span className={`bg-${themeColor}-${primaryColorLevel - 500} rounded-full p-2`}>
                    <CiImageOn className={`text-2xl text-${themeColor}-${primaryColorLevel-200} font-semibold`} />
                </span>
                <span className='text-xl text-black'>File name</span>
            </div>
            <div className='underline text-[8px] text-right'>Click To View</div>
        </div>
    )
}

const NotebookCard = () => {
    return (
        <div className={`bg-zinc-50 rounded-md p-4 h-32 flex flex-col justify-between`}>
            <div className='flex items-center gap-2'>
                <span className={`bg-amber-100 rounded-full p-2`}>
                    <VscNotebook className={`text-2xl text-amber-400 font-semibold`} />
                </span>
                <span className='text-xl text-black'>Notebook</span>
            </div>
            <div className='text-[10px] text-black'>This is description for the notebook.</div>
            <div className='underline text-[8px] text-right'>Click To View</div>
        </div>
    )
}

const LinkCard = () => {
    return (
        <div className={`bg-zinc-50 rounded-md p-4 h-32 flex flex-col justify-between`}>
            <div className='flex items-center gap-2'>
                <span className={`bg-pink-100 rounded-full p-2`}>
                    <CiLink className={`text-2xl text-pink-400 font-semibold`} />
                </span>
                <div className='flex flex-col'>
                    <span className='text-xl text-black'>Link Name</span>
                    <span className='text-[8px] text-black'>http://www.google.com/</span>
                </div>
            </div>
            <div className='underline text-[8px] text-right'>Click To View</div>
        </div>
    )
}


const DocList = () => {
    return (
        <div className='space-y-16'>
            <div>
                <h4 className='text-gray-400 mb-2'>Files</h4>
                <div className='grid grid-cols-8 gap-4'>
                    {
                        [1, 2, 3, 4].map(file => {
                            return (
                                <FileCard key={file} />
                            )
                        })
                    }
                </div>
            </div>


            <div>
                <h4 className='text-gray-400 mb-2'>Notebook</h4>
                <div className='grid grid-cols-8 gap-4'>
                    {
                        [1].map(file => {
                            return (
                                <NotebookCard key={file} />
                            )
                        })
                    }
                </div>

            </div>

            <div>
                <h4 className='text-gray-400 mb-2'>Links</h4>
                <div className='grid grid-cols-8 gap-4'>
                    {
                        [1].map(file => {
                            return (
                                <LinkCard key={file} />
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default DocList
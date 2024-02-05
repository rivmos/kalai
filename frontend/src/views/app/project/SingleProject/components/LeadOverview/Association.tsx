import { Avatar, Card } from '@/components/ui'
import React from 'react'

const Association = () => {
    return (
        <div className='flex flex-col gap-4'>
            {/* <h6 className='ml-1'>Association</h6> */}
            <div>
                <label>Assigned To</label>
                <div className="cursor-pointer bg-gray-50 rounded-xl flex items-center gap-4 p-4 duration-300 hover:bg-white">
                    <Avatar shape='circle' src='sd' />
                    <div className='flex flex-col'>
                        <span className="text-sm font-semibold text-center">Anchal Sharma</span>
                        <label className='text-xs'>SR</label>
                    </div>
                </div>
            </div>

            <div>
                <label>Estimation Request</label>
                <div className="cursor-pointer bg-gray-50 rounded-xl flex items-center gap-4 p-4 duration-300 hover:bg-white">
                    <Avatar shape='circle' src='sd' />
                    <div className='flex flex-col'>
                        <span className="text-sm font-semibold text-center">Harpreet Singh</span>
                        <label className='text-xs'>PODJINN</label>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Association
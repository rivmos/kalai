import { Avatar, Card } from '@/components/ui'
import React from 'react'

const ProjectDetail = () => {
    return (
        <div>
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="font-semibold">Project Title</label>
                        <p>Facebook Ad Issue</p>
                    </div>

                    <div>
                        <label className="font-semibold">URL</label>
                        <p><a href="https://www.upwork.com/jobs/~0146beb0eab1e7bc87" target="_blank" rel="noopener noreferrer">https://www.upwork.com/jobs/~0146beb0eab1e7bc87</a></p>
                    </div>

                    <div>
                        <label className="font-semibold">Service</label>
                        <p>Digital Marketing</p>
                    </div>

                    <div>
                        <label className="font-semibold">Specific Services</label>
                        <p>Social Media Marketing (SMM)</p>
                    </div>

                    <div>
                        <label className="font-semibold">Bidding Executive</label>
                        <p>Anchal Sharma</p>
                    </div>

                    <div>
                        <label className="font-semibold">Action</label>
                        <p>Chat</p>
                    </div>

                </div>
        </div>
    )
}

export default ProjectDetail
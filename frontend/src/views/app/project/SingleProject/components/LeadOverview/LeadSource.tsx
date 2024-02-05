import { Avatar, Card } from '@/components/ui'
import React from 'react'

const LeadSource = () => {
    return (
        <div>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="font-semibold">Vertical</label>
                        <p>Bidding Portal</p>
                    </div>

                    <div>
                        <label className="font-semibold">Location</label>
                        <p>United States</p>
                    </div>

                    <div>
                        <label className="font-semibold">Source</label>
                        <p>Upwork</p>
                    </div>

                    <div>
                        <label className="font-semibold">Representative</label>
                        <p>Sumeep Singh</p>
                    </div>

                </div>
        </div>
    )
}

export default LeadSource
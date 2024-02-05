import React from 'react'
import PathComponent from '../components/PathComponent'

const PnP = () => {
    return (
        <div>
            <PathComponent title='Privacy & Policy' />
            <div className='privacy-content'>
                <div className="container">

                    <h5>Company Overview</h5>
                    <p>For us, your privacy is of utmost importance. To safeguard the privacy of your data, we are hereby providing you with detailed notice explaining the various online data practices that we follow and the different ways the data is collected and utilized. To make this policy readily noticeable, we have given it the space on our homepage.</p>

                    <h5>Data Collection</h5>

                    <p>This policy is applicable to all kinds of data that is either collected or is submitted through the website of Podjinn. There are pages where you have to submit your contact details for subscriptions or have to register yourself to receive the services. The different kinds of personal data that is collected through these pages are as follows:</p>
                    <ul>
                        <li>Name</li>
                        <li>Company Name</li>
                        <li>Email Address</li>
                        <li>Company Address</li>
                        <li>Phone Number</li>
                        <li>Web Address</li>
                        <li>Description of the Associated Business</li>
                        <li>Issues Facing</li>
                    </ul>

                    <h5>Data Usage</h5>
                    <ul>
                        <li>Information about you and your business is used to reply whatever inquiries you put forward.</li>
                        <li>The email addresses are used to revert to the mails we receive. The email addresses are never utilized for any other purpose or are disclosed with the third parties.</li>
                        <li>Aggregate and non-identifying data is used to enhance the user experience on our website.</li>
                        <li>Any kind of personal information is never used or shared in ways that are not related to our services.</li>
                    </ul>

                    <h5>Data Security</h5>

                    <p>To maintain the utmost sense of data security, accurate utilization of the information and unauthorized access, we have placed appropriate electronic, physical and organisation procedures to ensure that the data privacy is never compromised.</p>


                </div>
            </div>
        </div>
    )
}

export default PnP
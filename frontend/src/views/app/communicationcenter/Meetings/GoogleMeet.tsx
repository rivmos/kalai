import React from 'react';
import Customers from '../../crm/Customers';

const Googlemeet = () => {
  // Dummy data for the table
  const dummyData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'active', lastOnline: 1672531199 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'blocked', lastOnline: 1672532199 },
    // Add more dummy data as needed
  ];

  return (
    <div>
      Googlemeet
      {/* <Customers data={dummyData} /> */}
    </div>
  );
}

export default Googlemeet;

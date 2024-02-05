import React, { useEffect, useState } from 'react';
import ProposedList, { PodData } from './ProposedList';

const Pods = () => {
  const [podData, setPodData] = useState<PodData[]>([]);

  useEffect(() => {
    const fetchPods = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-pods');
        const data = await response.json();
        if (data.status && data.data) {
          setPodData(data.data);
        } else {
          console.error('Error fetching pods:', data.message);
        }
      } catch (error:any) {
        console.error('Error fetching pods:', error.message);
      }
    };

    fetchPods();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {podData.map((pod) => (
        <div key={pod.id}>
          <ProposedList podData={pod} />
        </div>
      ))}
    </div>
  );
};

export default Pods;

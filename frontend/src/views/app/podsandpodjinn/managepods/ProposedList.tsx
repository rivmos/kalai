interface ProposedListProps {
  podData: PodData;
}

const ProposedList: React.FC<ProposedListProps> = ({ podData }) => {
  return (
    <div>
      <h2>{podData.pod_name ?? 'No Pod Name'}</h2>
      {/* Other parts of the component */}
    </div>
  );
};

export default ProposedList;

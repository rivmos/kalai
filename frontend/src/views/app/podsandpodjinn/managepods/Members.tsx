import Avatar from "@/components/ui/Avatar/Avatar";

export type Member = {
    id: number;
    name: string;
    image: string;
  };
  
  export type MembersProps = {
    members: Member[];
  };
  
  const Members: React.FC<MembersProps> = ({ members }) => {
    return (
      <div className="flex space-x-2 items-center">
        {members.map((member) => (
          <Avatar key={member.id} src={member.image} alt={member.name} />
        ))}
      </div>
    );
  };
  
  export default Members;
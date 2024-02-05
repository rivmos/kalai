import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import { Avatar } from '@/components/ui'
import AvatarGroup from '@/components/ui/Avatar/AvatarGroup'
import acronym from '@/utils/acronym'

type MembersProps = {
    members: {
        id:number,
        name: string
        image: string
    }[]
}

const Members = ({ members }: MembersProps) => {
    return (<AvatarGroup chained omittedAvatarProps={{ size: 30, shape: 'circle' }}>
        {members.map(member => {
            return (
                <Avatar shape='circle' key={member.id} src={member.image} size={30} icon={acronym(member.name)} />
            )
        })}
    </AvatarGroup>)
}

export default Members

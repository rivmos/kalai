import Card from '@/components/ui/Card'
import ItemDropdown from './ItemDropdown'
import Members from './Members'
import ProgressionBar from './ProgressionBar'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { ProjectState } from '../store'
import { UsersAvatarGroup } from '@/components/shared'

type ListItemProps = {
    data: ProjectState
    cardBorder?: boolean
    path:string
    activeTab:string | undefined
}

const ListItem = ({ data, cardBorder, path, activeTab}: ListItemProps) => {
    const {id, title, description, totalCompletedTask, totalTask, jinns, podjinn } = data
    console.log(path)
    return (
        <div className="mb-4">
            <Card bordered={cardBorder}>
                <div className="grid gap-x-4 grid-cols-12">
                    <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-3 lg:col-span-3 md:flex md:items-center">
                        <div className="flex flex-col">
                            <h6 className="font-bold">
                                <Link to={path}>
                                    {title}
                                </Link>
                            </h6>
                            <span>{description}</span>
                        </div>
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-2 lg:col-span-2 md:flex md:items-center md:justify-end">
                        <div className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-full">
                            <HiOutlineClipboardCheck className="text-base" />
                            <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                {totalCompletedTask} / {totalTask}
                            </span>
                        </div>
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 md:col-span-2 lg:col-span-3 md:flex md:items-center">
                        <ProgressionBar progression={(totalCompletedTask/totalTask)*100} />
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 md:col-span-3 lg:col-span-3 md:flex md:items-center">
                        {/* <Members members={[...jinns, ...podjinn]} /> */}
                        <UsersAvatarGroup users={[...podjinn, ...jinns].map(user => { return { name: user.name, img: user.image } })} />
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 sm:col-span-1 flex md:items-center justify-end">
                        <ItemDropdown projectId={id} activeTab={activeTab}/>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ListItem

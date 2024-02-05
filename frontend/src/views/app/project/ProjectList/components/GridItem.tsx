import Card from '@/components/ui/Card'
import ItemDropdown from './ItemDropdown'
import Members from './Members'
import ProgressionBar from './ProgressionBar'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Tabs } from '@/components/ui'
import { ProjectState, useAppDispatch, useAppSelector } from '../store'
import { UsersAvatarGroup } from '@/components/shared'

const {TabContent, TabList, TabNav} = Tabs

export type GridItemProps = {
    data: ProjectState,
    path:string
    activeTab:string | undefined
}

const GridItem = ({ data, path, activeTab}: GridItemProps) => {
    const { id, title, description, totalCompletedTask, totalTask, serviceName, specificServiceName, jinns, podjinn } = data
    return (
        <Card bodyClass="h-full">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between">
                    <Link to={path}>
                        <h6>{title}</h6>
                        <label>{description}</label>
                    </Link>
                    <ItemDropdown projectId={id} activeTab={activeTab}/>
                </div>
                {/* <p className="mt-4">{desc}</p> */}
                <div className="mt-3">
                    <ProgressionBar progression={(totalCompletedTask / totalTask) * 100} />
                    <div className="flex items-center justify-between mt-2">
                        {/* <Members members={[...jinns, ...podjinn]} /> */}
                        <UsersAvatarGroup users={[...podjinn, ...jinns].map(user => { return { name: user.name, img: user.image } })} />
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                <HiOutlineClipboardCheck className="text-base" />
                                <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                    {totalCompletedTask} / {totalTask}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default GridItem

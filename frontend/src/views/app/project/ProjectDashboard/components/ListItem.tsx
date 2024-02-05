import Card from '@/components/ui/Card'
// import ItemDropdown from './ItemDropdown'
import Members from '../../ProjectList/components/Members'
import ProgressionBar from '../../ProjectList/components/ProgressionBar'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { DashboardProject } from '../store'
import ItemDropdown from '../../ProjectList/components/ItemDropdown'

type ListItemProps = {
    data: DashboardProject
    cardBorder?: boolean
}

const ListItem = ({ data, cardBorder }: ListItemProps) => {
    const {id, title, description, totalCompletedTask, totalTask, jinns, podjinn } = data

    return (
        <div className="mb-4">
            <Card bordered={cardBorder}>
                <div className="grid gap-x-4 grid-cols-12">
                    <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-3 lg:col-span-3 md:flex md:items-center">
                        <div className="flex flex-col">
                            <h6 className="font-bold">
                                <Link to={`/app/project/${id}`}>
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
                        <Members members={[...jinns, ...podjinn]} />
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 sm:col-span-1 flex md:items-center justify-end">
                        <ItemDropdown />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ListItem

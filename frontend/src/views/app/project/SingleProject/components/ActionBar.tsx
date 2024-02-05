import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import { FaFilter } from "react-icons/fa";
import {
    toggleView,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { Link } from 'react-router-dom'

const ActionBar = () => {
    const dispatch = useAppDispatch()

    const projectOverview = useAppSelector((state) => state.project.data.projectOverview)

    return (
        <div className="lg:flex items-center justify-between mb-4">
            <h3 className="mb-4 lg:mb-0">{projectOverview.projectMilestones ? 'Milestones' : 'Tasks'}</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-1">
                <Link to='/app/projects/createproject'>
                    <Button
                        size="sm"
                        variant="plain"
                        className='!border-[1px]'
                    >
                        Common Pool
                    </Button>
                </Link>
                <Link to='/app/projects/createproject'>
                    <Button
                        size="sm"
                        variant="plain"
                        className='!border-[1px]'
                    >
                        Create Task List
                    </Button>
                </Link>
                <Tooltip title="Filter">
                    {/* <Button
                        className="hidden md:flex"
                        variant="plain"
                        size="sm"
                        icon={<FaFilter />}
                        onClick={() => onViewToggle()}
                    /> */}
                </Tooltip>
            </div>
        </div>
    )
}

export default ActionBar

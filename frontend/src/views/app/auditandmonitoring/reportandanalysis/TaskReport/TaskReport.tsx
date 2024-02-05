import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import TaskTable from './components/TaskTable'
import TaskTableTools from './components/TaskTableTools'

injectReducer('taskList', reducer)

const taskList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Tasks Report</h3>
                <TaskTableTools />
            </div>
            <TaskTable />
        </AdaptableCard>
    )
}

export default taskList

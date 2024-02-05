import ActionBar from './components/ActionBar'
import ProjectListContent from '../../project/ProjectList/components/ProjectListContent'
import Container from '@/components/shared/Container'
import reducer, {getPipelineLeads, useAppDispatch, useAppSelector} from './store'
import { injectReducer } from '@/store'
import { useEffect } from 'react'

injectReducer('leadpipeline', reducer)

const LeadPipeline = () => {
    const dispatch = useAppDispatch()

    const leads = useAppSelector(
        (state) => state.leadpipeline.data.pipelineLeads
    )
    
    const loading = useAppSelector(
        (state) => state.leadpipeline.data.loading
    )

    const view = useAppSelector((state) => state.leadpipeline.data.view)

    const { sort, search } = useAppSelector(
        (state) => state.leadpipeline.data.query
    )

    useEffect(() => {
        dispatch(getPipelineLeads())
        // dispatch(getList({ sort, search }))
    }, [dispatch, sort, search])
    
    return (
        <>
        <ActionBar />
        <ProjectListContent data={leads} loading={loading} query={{view:view, sort:sort, search:search}}/>
        </>
    )
}

export default LeadPipeline

import { useEffect } from 'react'
import ActionBar from './components/ActionBar'
import ProjectListContent from './components/ProjectListContent'
import reducer, { getDraftProjects, useAppSelector, useAppDispatch } from './store'
import { injectReducer } from '@/store'

injectReducer('projectList', reducer)

const ProjectList = () => {

    const dispatch = useAppDispatch()

    const { sort, search } = useAppSelector(
        (state) => state.projectList.data.query
    )

    const view = useAppSelector(
        (state) => state.projectList.data.view
    )

    const draftProjects = useAppSelector(
        (state) => state.projectList.data.draftProjects
    )

    const loading = useAppSelector(
        (state) => state.projectList.data.loading
    )
        
    useEffect(() => {
        // dispatch(getList({ sort, search }))
        dispatch(getDraftProjects())
    }, [dispatch, sort, search])

    const projectsToShow = () => {
        const filteredDraftProjects = draftProjects.filter(project => project.title.toLowerCase().includes(search))
        // if(sort === 'asc'){
        //     return filteredDraftProjects.sort((a:any,b:any) => a.title.localeCompare(b.title))
        // }
        // if(sort === 'desc'){
        //     return filteredDraftProjects.sort((a:any,b:any) => b.title.localeCompare(a.title))
        // }
        return filteredDraftProjects
    } 
    return (
        <div>
            <ActionBar text='Draft Projects' />
            <ProjectListContent data={draftProjects} loading={loading} query={{view:view, sort:sort, search:search}}/>
        </div>
    )
}

export default ProjectList

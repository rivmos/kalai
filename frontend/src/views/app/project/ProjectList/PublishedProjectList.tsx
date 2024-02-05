import { useEffect, useState } from 'react'
import ActionBar from './components/ActionBar'
import ProjectListContent from './components/ProjectListContent'
import reducer, { useAppSelector, useAppDispatch, getAllProjects } from './store'
import { injectReducer } from '@/store'

injectReducer('projectList', reducer)

const ProjectList = () => {

    const [currentTab, setCurrentTab] = useState('active')

    const dispatch = useAppDispatch()

    const { sort, search } = useAppSelector(
        (state) => state.projectList.data.query
    )

    const view = useAppSelector(
        (state) => state.projectList.data.view
    )

    const publishedProjects = useAppSelector(
        (state) => state.projectList.data.publishedProjects
    )

    const loading = useAppSelector(
        (state) => state.projectList.data.loading
    )

    useEffect(() => {
        // dispatch(getList({ sort, search }))
        dispatch(getAllProjects(currentTab))
    }, [dispatch, sort, search, currentTab])

    const projectsToShow = () => {
        const filteredPublishedProjects = publishedProjects.filter(project => project.title.toLowerCase().includes(search))
        // if(sort === 'asc'){
        //     return filteredPublishedProjects.sort((a:any,b:any) => a.title.localeCompare(b.title))
        // }
        // if(sort === 'desc'){
        //     return filteredPublishedProjects.sort((a:any,b:any) => b.title.localeCompare(a.title))
        // }
        return filteredPublishedProjects
    }

    return (
        <div>
            <ActionBar text='Published Projects' />
            <ProjectListContent data={publishedProjects} loading={loading} query={{view:view, sort:sort, search:search}}/>
        </div>
    )
}

export default ProjectList

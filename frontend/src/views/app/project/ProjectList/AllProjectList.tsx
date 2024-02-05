import { useEffect, useState } from 'react'
import ActionBar from './components/ActionBar'
import ProjectListContent from './components/ProjectListContent'
import reducer, { useAppSelector, useAppDispatch, getAllProjects } from './store'
import { injectReducer } from '@/store'
import Tabs from '@/components/ui/Tabs'

injectReducer('projectList', reducer)

const { TabContent, TabList, TabNav } = Tabs

const ProjectList = () => {

    const [currentTab, setCurrentTab] = useState('active')

    const dispatch = useAppDispatch()

    const { sort, search } = useAppSelector(
        (state) => state.projectList.data.query
    )

    const view = useAppSelector(
        (state) => state.projectList.data.view
    )

    const allProjects = useAppSelector(
        (state) => state.projectList.data.allProjects
    )

    const filteredProjects = useAppSelector(
        (state) => state.projectList.data.filteredProjects
    )

    const loading = useAppSelector(
        (state) => state.projectList.data.loading
    )

    useEffect(() => {
        // dispatch(getList({ sort, search }))
        dispatch(getAllProjects(currentTab))
    }, [dispatch, sort, search, currentTab])

    // const projectsToShow = () => {
    //     const filteredAllProjects = allProjects.filter(project => project.title.toLowerCase().includes(search))
    //     // if(sort === 'asc'){
    //     //     return filteredAllProjects.sort((a:any,b:any) => a.title.localeCompare(b.title))
    //     // }
    //     // if(sort === 'desc'){
    //     //     return filteredAllProjects.sort((a:any,b:any) => b.title.localeCompare(a.title))
    //     // }
    //     return filteredAllProjects
    // }

    const HeaderStart = () => {
        return (
            <Tabs defaultValue={currentTab} variant="pill" onChange={(val) => setCurrentTab(val)}>
                <TabList>
                    <TabNav value="active">Active</TabNav>
                    <TabNav value="archived">Archive</TabNav>
                    <TabNav value="completed">Completed</TabNav>
                </TabList>
            </Tabs>
        )
    }

    return (
        <div>
            <ActionBar headerStart={<HeaderStart />} text='' />
            <ProjectListContent data={search ? filteredProjects : allProjects} loading={loading} query={{view:view, sort:sort, search:search}} activeTab={currentTab}/>
        </div>
    )
}

export default ProjectList

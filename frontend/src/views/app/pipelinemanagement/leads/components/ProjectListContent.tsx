import { useEffect } from 'react'
import classNames from 'classnames'
import GridItem from '@/views/app/project/ProjectList/components/GridItem'
import ListItem from '@/views/app/project/ProjectList/components/ListItem'
import Spinner from '@/components/ui/Spinner'
import {  getPipelineLeads, useAppDispatch, useAppSelector } from '../store'


const ProjectListContent = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector((state) => state.leadpipeline.data.loading)
    const projectList = useAppSelector(
        (state) => state.leadpipeline.data.pipelineLeads
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
        <div
            className={classNames(
                'mt-6 h-full flex flex-col',
                loading && 'justify-center'
            )}
        >
            {loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )}
            {view === 'grid' && projectList?.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {projectList.map((project) => (
                        <GridItem key={project.id} data={project} path={`/app/pipeline/${project.id}`}/>
                    ))}
                </div>
            )}
            {view === 'list' &&
                projectList?.length > 0 &&
                !loading &&
                projectList.map((project) => (
                    <ListItem key={project.id} data={project} path={`/app/pipeline/${project.id}`}/>
                ))}
        </div>
    )
}

export default ProjectListContent

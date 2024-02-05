import { useEffect } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import ListItem from './ListItem'
import Spinner from '@/components/ui/Spinner'
import { useAppDispatch, useAppSelector, getDraftProjects } from '../store'
import { ProjectState } from '../store'

const ProjectListContent = ({data, loading, query, activeTab} : {data:ProjectState[], loading:boolean, query:{view?:'grid' | 'list', sort?:string, search?:string}, activeTab?:string}) => {

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
            {
                query.view === 'grid' && data.length === 0 && !loading && (
                    <div className="flex justify-center">
                        No Projects Found
                    </div>
                )
            }
            {query.view === 'grid' && data.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data.map((project) => (
                        <GridItem key={project.id} data={project} path={`/app/project/${project?.id}`} activeTab={activeTab}/>
                    ))}
                </div>
            )}
            {query.view === 'list' &&
                data.length > 0 &&
                !loading &&
                data.map((project) => (
                    <ListItem key={project.id} data={project} path={`/app/project/${project?.id}`} activeTab={activeTab} />
                ))}
        </div>
    )
}

export default ProjectListContent

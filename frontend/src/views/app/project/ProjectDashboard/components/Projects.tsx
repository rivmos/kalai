import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import ListItem from './ListItem'
import { DashboardProject } from '../store'

type ProjectsProps = {
    data?: DashboardProject[]
}

const Projects = ({ data = [] }: ProjectsProps) => {
    const navigate = useNavigate()

    const onViewAllProjects = () => {
        navigate('/app/projects/allprojects')
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h4>Active Projects</h4>
                <Button size="sm" onClick={onViewAllProjects}>
                    View All
                </Button>
            </div>
            {data.map((project) => (
                <ListItem key={project.id} cardBorder data={project} />
            ))}
        </Card>
    )
}

export default Projects

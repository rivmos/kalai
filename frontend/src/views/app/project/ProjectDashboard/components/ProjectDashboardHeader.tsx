type ProjectDashboardHeaderProps = {
    userName?: string
    taskCount?: number
}

const ProjectDashboardHeader = ({
    userName,
    taskCount,
}: ProjectDashboardHeaderProps) => {
    return (
        <div>
            <h4 className="mb-1">Hello, <span className="capitalize">{userName}!</span></h4>
            <p>You have these active tasks and projects.</p>
        </div>
    )
}

export default ProjectDashboardHeader

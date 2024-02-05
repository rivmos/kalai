export type ProjectOverviewState = {
    id: number,
    title: string,
    description: string,
    serviceId: number,
    serviceName: string,
    specificServiceName: string,
    technologyName: string,
    totalAmount: string,
    estimatedTime: string,
    startDate: string | null,
    endDate: string | null,
    projectTaskList:
    {
        id: number,
        name: string
    }[],
    projectMilestones:
    {
        id: number,
        name: string,
        tasks:
        {
            id: number,
            task_name: string
        }[],
    }[],
    risks:RiskState[],
    projectTasks: TaskState[],
    podjinn: { id: number, name: string, image: string }[],
    jinns: JinnByServiceState[]
}

export type PodjinnByServiceState = {
    id: number,
    name: string,
    image: string
}

export type JinnByServiceState = {
    id: number,
    name: string,
    image: string
}

export type TaskState = {
    id?: number,
    title: string,
    description: string,
    estimatedTime: number,
    priority: number,
    totalSpentHour?: number,
    startDate?: string,
    endDate?: string,
    status?: number,
    isbilled?: number
    assignedUser?:number
}

export type RiskState = {
    id: number,
    name: string,
    description: string,
    riskProbability: number,
    riskImpact: number,
    status: number
}
export interface Comment {
    id: string
    name: string
    src: string
    message: string
    date: number | Date
}

export type Member = {
    id: string
    name: string
    email: string
    img: string
}

export type Ticket = {
    id: string
    name: string
    description: string
    cover: string
    members?: Member[]
    labels?: string[]
    attachments?: {
        id: string
        name: string
        src: string
        size: string
    }[]
    comments?: Comment[]
    dueDate: number | null | Date
}

export type Members = Member[]

export type Columns = Record<string, Ticket[]>

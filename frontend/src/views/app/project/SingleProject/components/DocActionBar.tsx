import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'

const DocActionBar = () => {
    return (
        <div className="lg:flex items-center justify-between mb-4">
            <h4 className="mb-4 lg:mb-0"></h4>
            <div className="flex flex-col md:flex-row md:items-center gap-1">
                <Link to='/app/projects/createproject'>
                    <Button
                        size="sm"
                        variant="plain"
                        className='!border-[1px]'
                    >
                        Add Document
                    </Button>
                </Link>
                <Link to='/app/projects/createproject'>
                    <Button
                        size="sm"
                        variant="plain"
                        className='!border-[1px]'
                    >
                        Add Comment
                    </Button>
                </Link>
                <Link to='/app/projects/createproject'>
                    <Button
                        size="sm"
                        variant="plain"
                        className='!border-[1px]'
                    >
                        View Contracts
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default DocActionBar

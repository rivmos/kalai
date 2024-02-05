import { TbMoodEmpty } from "react-icons/tb"

const EmptyState = ({text} : {text:string}) => {
    return (
        <div className='flex flex-col justify-center items-center h-40'>
            <p><TbMoodEmpty className='text-xl' /></p>
            <p>No {text} Found!</p>
        </div>
    )
}

export default EmptyState
import Dropdown from '@/components/ui/Dropdown'
import {
    HiOutlineSwitchHorizontal,
    HiOutlineFlag,
    HiOutlineCog,
} from 'react-icons/hi'
import { MdOutlineArchive, MdOutlineDelete, MdOutlineSettings  } from "react-icons/md";
import EllipsisButton from '@/components/shared/EllipsisButton'
import { apiArchiveProject, apiDeleteProject } from '@/services/ProjectService';
import { removeProject } from '../store';
import { useAppDispatch } from '../store';
import { Notification } from '@/components/ui';
import toast from '@/components/ui/toast';


const archiveProject = async (projectId:number) => {
    const response = await apiArchiveProject<{status:boolean, message:string}, {id:number}>({id:projectId})
    return response
}

const deleteProject = async (projectId:number) => {
    const response = await apiDeleteProject<{status:boolean, message:string}, {id:number}>({id:projectId})
    return response
}

const dropdownList = [
    { label: 'Archive', value: 'archive', icon: <MdOutlineArchive /> },
    { label: 'Delete', value: 'delete', icon: <MdOutlineDelete /> },
    { label: 'Setting', value: 'setting', icon: <MdOutlineSettings /> },
]

const ItemDropdown = ({projectId, activeTab} : {projectId:number, activeTab:string | undefined}) => {
    const dispatch = useAppDispatch()

    const onArchive = async () => {
        const res = await archiveProject(projectId)
        if(res.status === 200){
            dispatch(removeProject({projectId:projectId}))
            toast.push(
                <Notification
                    title={'Successfuly archived'}
                    type="success"
                    duration={2500}
                >
                    Project Archived Succesfully
                </Notification>,
                {
                    placement: 'bottom-end',
                }
            )
        }
    }

    const onDelete = async () => {
        const res = await deleteProject(projectId)
        if(res.status === 200){
            dispatch(removeProject({projectId:projectId}))
            toast.push(
                <Notification
                    title={'Successfuly deleted'}
                    type="success"
                    duration={2500}
                >
                    Project Deleted Succesfully
                </Notification>,
                {
                    placement: 'bottom-end',
                }
            )
        }
    }
    return (
        <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
            {dropdownList.map((item) => {
                return(
                    (!(activeTab === 'archived' && item.label === 'Archive') && <Dropdown.Item key={item.value} onClick={() => item.label === 'Archive' ? onArchive() : item.label ? onDelete() : {}} eventKey={item.value}>
                        <span className="text-lg">{item.icon}</span>
                        <span className="ml-2 rtl:mr-2">{item.label}</span>
                    </Dropdown.Item>)
                )
            }
            )}
        </Dropdown>
    )
}

export default ItemDropdown

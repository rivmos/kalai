import CategoryForm, {
    FormModel,
    SetSubmitting,
} from '@/views/app/Category/CategoryForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateSalesProduct } from '@/services/SalesService'
import { apiAddArtist, apiAddCategory } from '@/services/ArtistService'

const ArtistNew = () => {
    const navigate = useNavigate()

    const addCategory = async (data: FormModel) => {
        const response = await apiAddCategory<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        console.log(values)
        const success = await addCategory(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Category successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/categories/')
        }
    }

    const handleDiscard = () => {
        navigate('/app/categories/')
    }

    return (
        <>
            <CategoryForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ArtistNew

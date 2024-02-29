import BannerForm, {
    FormModel,
    SetSubmitting,
} from '@/views/app/Banner/BannerForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateSalesProduct } from '@/services/SalesService'
import { apiAddBannerImage } from '@/services/BannerService'

const BannerNew = () => {
    const navigate = useNavigate()

    const addBannerImage = async (data: FormModel) => {
        const response = await apiAddBannerImage<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        console.log(values)
        const success = await addBannerImage(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Banner image successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/banners/')
        }
    }

    const handleDiscard = () => {
        navigate('/app/banners/')
    }

    return (
        <>
            <BannerForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default BannerNew

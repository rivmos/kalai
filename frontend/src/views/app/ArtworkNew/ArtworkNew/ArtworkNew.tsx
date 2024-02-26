import ArtworkForm, {
    FormModel,
    SetSubmitting,
} from '@/views/app/ArtworkNew/ArtworkForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateSalesProduct } from '@/services/SalesService'
import { apiAddArtist } from '@/services/ArtistService'

const ArtworkNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data: FormModel) => {
        const response = await apiAddArtist<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        console.warn(values)
        // const success = await addProduct(values)
        // setSubmitting(false)
        // if (success) {
        //     toast.push(
        //         <Notification
        //             title={'Successfuly added'}
        //             type="success"
        //             duration={2500}
        //         >
        //             Artist successfuly added
        //         </Notification>,
        //         {
        //             placement: 'top-center',
        //         }
        //     )
        //     navigate('/app/artworks/')
        // }
    }

    const handleDiscard = () => {
        navigate('/app/artworks/')
    }

    return (
        <>
            <ArtworkForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ArtworkNew

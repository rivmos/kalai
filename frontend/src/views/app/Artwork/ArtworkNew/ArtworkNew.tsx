import ArtworkForm, {
    FormModel,
    SetSubmitting,
} from '@/views/app/Artwork/ArtworkForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiAddArtwork } from '@/services/ArtistService'

const ArtworkNew = () => {
    const navigate = useNavigate()

    const addNewArtwork = async (data: FormModel) => {
        const response = await apiAddArtwork<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        console.log(values)
        const success = await addNewArtwork(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Artwork successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/artworks/')
        }
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

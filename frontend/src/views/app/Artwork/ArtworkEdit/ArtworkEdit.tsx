import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getArtworkDetail,
    updateProduct,
    deleteProduct,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import ArtworkForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/app/Artwork/ArtworkForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('artworkEditSlice', reducer)

const ProductEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const artworkData = useAppSelector(
        (state) => state.artworkEditSlice.data.artworkData
    )
    const loading = useAppSelector(
        (state) => state.artworkEditSlice.data.loading
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getArtworkDetail(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await updateProduct(values)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/app/artworks')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteProduct({ id: artworkData.id })
        if (success) {
            popNotification('deleted')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Artwork successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/artworks')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(artworkData) && (
                    <>
                        <ArtworkForm
                            type="edit"
                            initialData={artworkData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(artworkData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No Artwork Found!</h3>
                </div>
            )}
        </>
    )
}

export default ProductEdit

import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteProduct,
    getProducts,
    useAppDispatch,
    useAppSelector,
    deleteArtwork,
    getArtworks,
} from '../store'

const ArtistDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.artworkListSlice.data.deleteConfirmation
    )
    const selectedProduct = useAppSelector(
        (state) => state.artworkListSlice.data.selectedArtwork
    )
    const tableData = useAppSelector(
        (state) => state.artworkListSlice.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        // const success = await deleteProduct({ id: selectedProduct })
        const success = await deleteArtwork({ id: selectedProduct })

        if (success) {
            dispatch(getArtworks(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Artwork successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Delete product"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Are you sure you want to delete this artwork? All record related
                to this artwork will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default ArtistDeleteConfirmation

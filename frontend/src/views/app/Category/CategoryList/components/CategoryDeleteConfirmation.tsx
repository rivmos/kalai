import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    deleteCategory,
    getCategories,
} from '../store'

const ArtistDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.categoryListSlice.data.deleteConfirmation
    )
    const selectedProduct = useAppSelector(
        (state) => state.categoryListSlice.data.selectedCategory
    )
    const tableData = useAppSelector(
        (state) => state.categoryListSlice.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        // const success = await deleteProduct({ id: selectedProduct })
        const success = await deleteCategory({ id: selectedProduct })

        if (success) {
            dispatch(getCategories(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Artist successfuly deleted
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
                Are you sure you want to delete this category? All record related
                to this category will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default ArtistDeleteConfirmation

import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import MiscInformationFields from './MiscInformationFields'
import PricingFields from './PricingFields'
import OrganizationFields from './OrganizationFields'
import ProductImages from './ProductImages'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { ArtworkState } from '@/@types/artist'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

// type InitialData = {
//     id?: string
//     name?: string
//     website?: string
//     bio?: string
//     img?: string
//     imgList?: {
//         id: string
//         name: string
//         img: string
//     }[]
//     category?: string
//     price?: number
//     stock?: number
//     status?: number
//     costPerItem?: number
//     bulkDiscountPrice?: number
//     taxRate?: number
//     tags?: string[]
//     brand?: string
//     vendor?: string
// }

type InitialData = {
    id?:string,
    title?:string,
    description?:string
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type ArtworkForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    // name: Yup.string().required('Artist Name Required'),
    // website: Yup.string().required('Website Required'),
    // bio: Yup.string().required('Bio Required'),
    // price: Yup.number().required('Price Required'),
    // stock: Yup.number().required('SKU Required'),
    // category: Yup.string().required('Category Required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string(), // Optional by default
    category: Yup.string().required('Please select one!'),
    width: Yup.number().required('Width is required').positive('Width must be positive'),
    height: Yup.number().required('Height is required').positive('Height must be positive'),
    sizeUnit: Yup.string().required('Size unit is required'), // You might want to define specific allowed values
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    medium: Yup.string().required('Medium is required'),
    deliveredAs: Yup.string().required('Delivered as is required'),
    images: Yup.array().min(4, 'At least one file uploaded!'),
    createdIn: Yup.string()
        .matches(
            /^[12][0-9]{3}$/,
            'Enter correct year!'
        )
        .required('Please enter a year'),
    isSold: Yup.boolean().required('Is sold is required'),
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete product"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Are you sure you want to delete this product? All record
                    related to this product will be deleted as well. This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ArtworkForm = forwardRef<FormikRef, ArtworkForm>((props, ref) => {
    const {
        type,
        initialData = {
            id: '',
            title: '',
            description: '',
            category: '',
            width: 0,
            height: 0,
            sizeUnit: '',
            price: 0,
            medium: '',
            deliveredAs: '',
            createdIn: '',
            isSold: false,
            // images: []

            // id: '',
            // name: '',
            // website: '',
            // bio: '',
            // img: '',
            // imgList: [],
            // category: '',
            // price: 0,
            // stock: 0,
            // status: 0,
            // costPerItem: 0,
            // bulkDiscountPrice: 0,
            // taxRate: 6,
            // tags: [],
            // brand: '',
            // vendor: '',
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    const newId = useUniqueId('product-')

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    // tags: initialData?.tags
                    //     ? initialData.tags.map((value) => ({
                    //           label: value,
                    //           value,
                    //       }))
                    //     : [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    // formData.tags = formData.tags.map((tag) => {
                    //     if (typeof tag !== 'string') {
                    //         return tag.value
                    //     }
                    //     return tag
                    // })
                    if (type === 'new') {
                        // formData.id = newId
                        // if (formData.imgList && formData.imgList.length > 0) {
                        //     formData.img = formData.imgList[0].img
                        // }
                    }
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                    />
                                    <PricingFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    /> 
                                    <OrganizationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    /> 
                                    <MiscInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                                {/* <div className="lg:col-span-1">
                                    <ProductImages values={values} />
                                </div> */}
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ArtworkForm.displayName = 'ArtworkForm'

export default ArtworkForm

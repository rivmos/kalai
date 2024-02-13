import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Switcher from '@/components/ui/Switcher'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'
import reducer, { addArtwork, useAppDispatch } from './store'
import { injectReducer } from '@/store'
import Dialog from '@/components/ui/Dialog'
import { Dispatch, SetStateAction } from 'react'
import { Artwork } from '@/@types/artist'
import { apiAddArtwork } from '@/services/ArtistService'
import { Upload } from '@/components/ui'

injectReducer('formSlice', reducer)

type Option = {
    value: string
    label: string
}

type FormModel = {
    title: string,
    description: string, // Optional by default
    width: number,
    height: number,
    sizeUnit: string, // You might want to define specific allowed values
    price: number,
    medium: string,
    deliveredAs: string,
    createdIn: number,
    isSold: boolean,
    images: File[];
}

const unitOptions: Option[] = [
    { value: 'inch', label: 'Inch' },
    { value: 'centimeter', label: 'Centimeter' },
    { value: 'millimeter', label: 'Millimeter' },
    { value: 'feet', label: 'Feet' },
]

const MIN_UPLOAD = 1
const MAX_UPLOAD = 2

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(), // Optional by default
    width: Yup.number().required('Width is required').positive('Width must be positive'),
    height: Yup.number().required('Height is required').positive('Height must be positive'),
    sizeUnit: Yup.string().required('Size unit is required'), // You might want to define specific allowed values
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    medium: Yup.string().required('Medium is required'),
    deliveredAs: Yup.string().required('Delivered as is required'),
    images: Yup.array().min(MIN_UPLOAD, 'At least one file uploaded!'),
    createdIn: Yup.string()
        .matches(
            /^[12][0-9]{3}$/,
            'Enter correct year!'
        )
        .required('Please enter a year'),
    isSold: Yup.boolean().required('Is sold is required'),
})

const addNewArtwork = async (data: FormModel) => {
    const res = await apiAddArtwork<Artwork, FormModel>(data)
    return { data: res.data, status: res.status }
}


const ArtworkForm = ({ dialogIsOpen, setIsOpen }: { dialogIsOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) => {

    const beforeUpload = (file: FileList | null, fileList: File[]) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const MAX_FILE_SIZE = 500000

        if (fileList.length >= MAX_UPLOAD) {
            return `You can only upload ${MAX_UPLOAD} file(s)`
        }

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= MAX_FILE_SIZE) {
                    valid = 'Upload image cannot more then 500kb!'
                }
            }
        }

        return valid
    }

    const handleNumberInput = (value: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = parseInt(value.target.value, 10);

        // Ensure that the value is between 0 and 59
        return isNaN(newValue) ? 0 : Math.min(Math.max(0, newValue));

    };

    const onDialogClose = () => {
        setIsOpen(false)
    }

    const dispatch = useAppDispatch()

    return (
        <Dialog
            isOpen={dialogIsOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <div className='container max-h-[600px] overflow-y-auto'>
                <Formik
                    enableReinitialize
                    initialValues={{
                        title: '',
                        description: '',
                        width: 0,
                        height: 0,
                        sizeUnit: '',
                        price: 0,
                        medium: '',
                        deliveredAs: '',
                        createdIn: 0,
                        isSold: false,
                        images: []
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(values)
                        const success = await addNewArtwork(values)
                        if (success.status === 200) {
                            dispatch(addArtwork(success.data))
                            onDialogClose()
                        }
                        // console.log('values', values)
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2))
                        //     setSubmitting(false)
                        // }, 400)
                    }}
                >
                    {({ values, touched, errors, resetForm }) => (
                        <Form>
                            <FormContainer>
                                <FormItem
                                    asterisk
                                    label="Title"
                                    invalid={errors.title && touched.title}
                                    errorMessage={errors.title}
                                >
                                    <Field
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Description"
                                    invalid={errors.description && touched.description}
                                    errorMessage={errors.description}
                                >
                                    <Field
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        component={Input}
                                        textArea
                                    />
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="Images"
                                    invalid={Boolean(
                                        errors.images && touched.images
                                    )}
                                    errorMessage={errors.images as string}
                                >
                                    <Field name="images">
                                        {({ field, form }: FieldProps<FormModel>) => (
                                            <Upload
                                                showList
                                                draggable
                                                beforeUpload={beforeUpload}
                                                fileList={values.images}
                                                onChange={(files) =>
                                                    form.setFieldValue(field.name, files)
                                                }
                                                onFileRemove={(files) =>
                                                    form.setFieldValue(field.name, files)
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>

                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    <FormItem
                                        asterisk
                                        label="Width"
                                        invalid={errors.width && touched.width}
                                        errorMessage={errors.width}
                                    >
                                        <Field name="width">
                                            {({ field, form }: FieldProps<FormModel>) => (
                                                <Input value={values.width} onChange={(value) => form.setFieldValue(field.name, handleNumberInput(value))} />
                                            )}
                                        </Field>
                                    </FormItem>

                                    <FormItem
                                        asterisk
                                        label="Height"
                                        invalid={errors.height && touched.height}
                                        errorMessage={errors.height}
                                    >
                                        <Field name="height">
                                            {({ field, form }: FieldProps<FormModel>) => (
                                                <Input value={values.height} onChange={(value) => form.setFieldValue(field.name, handleNumberInput(value))} />
                                            )}
                                        </Field>
                                    </FormItem>

                                    <FormItem
                                        asterisk
                                        label="Unit"
                                        invalid={errors.sizeUnit && touched.sizeUnit}
                                        errorMessage={errors.sizeUnit}
                                    >
                                        <Field name="sizeUnit">
                                            {({ field, form }: FieldProps<FormModel>) => (
                                                <Select
                                                    field={field}
                                                    form={form}
                                                    options={unitOptions}
                                                    value={unitOptions.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.sizeUnit
                                                    )}
                                                    onChange={(option) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            option?.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                </div>

                                <FormItem
                                    asterisk
                                    label="Price"
                                    invalid={errors.price && touched.price}
                                    errorMessage={errors.price}
                                >
                                    <Field name="price">
                                        {({ field, form }: FieldProps<FormModel>) => (
                                            <Input value={values.price} onChange={(value) => form.setFieldValue(field.name, handleNumberInput(value))} />
                                        )}
                                    </Field>
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="Medium"
                                    invalid={errors.medium && touched.medium}
                                    errorMessage={errors.medium}
                                >
                                    <Field
                                        type="text"
                                        name="medium"
                                        placeholder="Medium"
                                        component={Input}

                                    />
                                </FormItem>


                                <FormItem
                                    asterisk
                                    label="Delivered As"
                                    invalid={errors.deliveredAs && touched.deliveredAs}
                                    errorMessage={errors.deliveredAs}
                                >
                                    <Field
                                        type="text"
                                        name="deliveredAs"
                                        placeholder="Delivered As"
                                        component={Input}

                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Created In Year"
                                    invalid={errors.createdIn && touched.createdIn}
                                    errorMessage={errors.createdIn}
                                >
                                    <Field name="createdIn">
                                        {({ field, form }: FieldProps<FormModel>) => (
                                            <Input value={values.createdIn} onChange={(value) => form.setFieldValue(field.name, handleNumberInput(value))} />
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Is Sold"
                                    invalid={errors.isSold && touched.isSold}
                                    errorMessage={errors.isSold}
                                >
                                    <div>
                                        <Field
                                            name="isSold"
                                            component={Switcher}
                                        />
                                    </div>
                                </FormItem>

                                <FormItem>
                                    <Button
                                        type="reset"
                                        className="ltr:mr-2 rtl:ml-2"
                                        onClick={() => resetForm()}
                                    >
                                        Reset
                                    </Button>
                                    <Button variant="solid" type="submit">
                                        Submit
                                    </Button>
                                </FormItem>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </Dialog>
    )
}

export default ArtworkForm

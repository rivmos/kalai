import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'
import TimeInput from '@/components/ui/TimeInput'
import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'
import Switcher from '@/components/ui/Switcher'
import Segment from '@/components/ui/Segment'
import Upload from '@/components/ui/Upload'
import SegmentItemOption from '@/components/shared/SegmentItemOption'
import { HiCheckCircle } from 'react-icons/hi'
import { Field, Form, Formik } from 'formik'
import CreatableSelect from 'react-select/creatable'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'
import { useState } from 'react'
import ArtworkForm from './ArtworkForm'
import reducer, { addArtwork, resetArtworks, setSelectedArtwork, useAppDispatch, useAppSelector } from './store'
import { injectReducer } from '@/store'
import { apiAddArtist, apiAddCategory } from '@/services/ArtistService'
import { Artwork } from '@/@types/artist'
import { useNavigate } from 'react-router-dom'
import appConfig, { baseUrl } from '@/configs/app.config'
import { CiEdit } from 'react-icons/ci'

injectReducer('formSlice', reducer)

type FormModel = {
    name: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Please an category name!'),
})

const addNewCategory = async (data: FormModel ) => {
    const res = await apiAddCategory<{ status: boolean, message: string }, FormModel >(data)
    return { data: res.data, status: res.status }
}

const CategoryForm = () => {
    
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [openArtworkForm, setOpenArtworkForm] = useState<boolean>(false)

    return (
        <div className='container'>
            <ArtworkForm setIsOpen={setOpenArtworkForm} dialogIsOpen={openArtworkForm} />
            <Formik
                enableReinitialize
                initialValues={{
                    name: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    const success = await addNewCategory(values)
                    if (success.status === 200) {
                        navigate('/app/categories')
                        dispatch(resetArtworks())
                    }
                }}
            >
                {({ values, touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="Name"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    component={Input}
                                />
                            </FormItem>
 

       
                            <FormItem>
                                <Button
                                    type="reset"
                                    className="ltr:mr-2 rtl:ml-2"
                                    onClick={() => { resetForm(); dispatch(resetArtworks()) }}
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
    )
}

export default CategoryForm

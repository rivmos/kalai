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
import reducer, { addArtwork, resetArtworks, useAppDispatch, useAppSelector } from './store'
import { injectReducer } from '@/store'
import { apiAddArtist } from '@/services/ArtistService'
import { Artwork } from '@/@types/artist'
import { useNavigate } from 'react-router-dom'
import appConfig, { baseUrl } from '@/configs/app.config'

injectReducer('formSlice', reducer)


type FormModel = {
    name: string
    bio: string
    website: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Please an artist name!'),
    bio: Yup.string()
        .required('Please enter artist\'s bio!'),
    website: Yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Please enter website'),
})

const addNewArtist = async (data: FormModel & { artworks: string[] }) => {
    const res = await apiAddArtist<{ status: boolean, message: string }, FormModel & { artworks: string[] }>(data)
    return { data: res.data, status: res.status }
}

const ArtistForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [openArtworkForm, setOpenArtworkForm] = useState<boolean>(false)
    const artworks = useAppSelector(state => state.formSlice.data.artworks)

    return (
        <div className='container'>
            <ArtworkForm setIsOpen={setOpenArtworkForm} dialogIsOpen={openArtworkForm} />
            <Formik
                enableReinitialize
                initialValues={{

                    name: '',
                    bio: '',
                    website: '',

                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    const success = await addNewArtist({ ...values, artworks: artworks.map(artwork => String(artwork.id)) as string[] })
                    if (success.status === 200) {
                        navigate('/web/home')
                    }
                    // console.log('values', {...values, artworks})
                    // setTimeout(() => {
                    //     alert(JSON.stringify({...values, artworks}, null, 2))
                    //     setSubmitting(false)
                    // }, 400)
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
                            <FormItem
                                asterisk
                                label="Bio"
                                invalid={errors.bio && touched.bio}
                                errorMessage={errors.bio}
                            >
                                <Field
                                    type="text"
                                    name="bio"
                                    placeholder="Bio"
                                    component={Input}
                                    textArea
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                label="Website"
                                invalid={errors.website && touched.website}
                                errorMessage={errors.website}
                            >
                                <Field
                                    type="text"
                                    name="website"
                                    placeholder="Website"
                                    component={Input}
                                />
                            </FormItem>


                            {
                                artworks.length > 0 ?
                                    <div>
                                        {artworks.map(artwork => {
                                            return (
                                                <div className="text-gray-700">
                                                    <img src={baseUrl+ '/images/' + artwork?.imageUrl?.[0]} alt=" random imgee" className="w-full h-[250px] object-cover rounded-lg shadow-md" />

                                                    <div className="relative px-4 -mt-8  ">
                                                        <div className="bg-white p-4 rounded-lg shadow-lg">
                                                            <h4 className="mt-1 text-base capitalize text-center leading-tight text-gray-700 truncate">{artwork.title}</h4>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                    : <div></div>
                            }

                            <div className='!w-full !h-52 border-[1px] flex justify-center items-center cursor-pointer hover:bg-gray-100 rounded-xl border-dashed mb-6' onClick={() => setOpenArtworkForm(true)}>Add Artwork</div>

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

export default ArtistForm

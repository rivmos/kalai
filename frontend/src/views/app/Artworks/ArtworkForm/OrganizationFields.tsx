import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { useAppDispatch } from '../ArtworkEdit/store'
import { getAllArtists, getAllCategories, useAppSelector } from '@/store'
import { useEffect } from 'react'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    category: string
    artist: string
}

type OrganizationFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        category: string
        tags: Options
        [key: string]: unknown
    }
}

const OrganizationFields = (props: OrganizationFieldsProps) => {
    const { values = { category: '', tags: [] }, touched, errors } = props

    const dispatch = useAppDispatch()

    const categories = useAppSelector(state => state.base.common.categories)
    const allArtists = useAppSelector(state => state.base.common.allArtists)

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllArtists())
    }, [])


    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Organizations</h5>
            <p className="mb-6">Section to config the product attribute</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        asterisk
                        label="Category"
                        invalid={errors.category && touched.category}
                        errorMessage={errors.category}
                    >
                        <Field name="category">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={categories?.map(category => ({ label: category.name, value: category.id }))}
                                    value={categories?.map(category => ({ label: category.name, value: category.id })).find(
                                        (option) =>
                                            option.value ===
                                            values.category
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
                <div className="col-span-1">
                <FormItem
                        asterisk
                        label="Artist"
                        invalid={errors.artist && touched.artist}
                        errorMessage={errors.artist}
                    >
                        <Field name="artist">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={allArtists.map(artist => ({ label: artist.name, value: artist.id }))}
                                    value={allArtists.map(artist => ({ label: artist.name, value: artist.id })).find(
                                        (option) =>
                                            option.value ===
                                            values.artist
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div className="col-span-1">
                    <FormItem
                        label="Brand"
                        invalid={(errors.brand && touched.brand) as boolean}
                        errorMessage={errors.brand}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="brand"
                            placeholder="Brand"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Vendor"
                        invalid={(errors.vendor && touched.vendor) as boolean}
                        errorMessage={errors.vendor}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="vendor"
                            placeholder="Vendor"
                            component={Input}
                        />
                    </FormItem>
                </div> */}
            </div>
        </AdaptableCard>
    )
}

export default OrganizationFields

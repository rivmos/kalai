import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { getCategories, useAppDispatch, useAppSelector } from '@/store'
import { useEffect } from 'react'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    category: string
    tags: Options
    vendor: string
    brand: string
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

const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]

const tags = [
    { label: 'trend', value: 'trend' },
    { label: 'unisex', value: 'unisex' },
]

const OrganizationFields = (props: OrganizationFieldsProps) => {
    const { values = { category: '', tags: [] }, touched, errors } = props
    
    const dispatch = useAppDispatch()

    const categories = useAppSelector(state => state.base.common.categories)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Organizations</h5>
            <p className="mb-6">Section to config the artwork attribute</p>
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
                                    options={categories.map(category => ({ label: category.name, value: category.id }))}
                                    value={categories.map(category => ({ label: category.name, value: category.id })).find(
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
                        label="Tags"
                        invalid={
                            (errors.tags && touched.tags) as unknown as boolean
                        }
                        errorMessage={errors.tags as string}
                    >
                        <Field name="tags">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    isMulti
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={tags}
                                    value={values.tags}
                                    onChange={(option) =>
                                        form.setFieldValue(field.name, option)
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
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
                </div>
            </div> */}
        </AdaptableCard>
    )
}

export default OrganizationFields

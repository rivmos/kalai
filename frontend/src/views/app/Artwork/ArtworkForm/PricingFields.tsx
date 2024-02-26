import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import {
    Field,
    FormikErrors,
    FormikTouched,
    FieldProps,
    FieldInputProps,
    FormikValues,
} from 'formik'
import type { ComponentType } from 'react'
import type { InputProps } from '@/components/ui/Input'
import { Select } from '@/components/ui'
import { FormModel } from './ArtworkForm'

type FormFieldsName = {
    width: number
    height: number
    sizeUnit: string
    price: number
}

type PricingFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: FormModel
}

const unitOptions: {value:string, label:string}[] = [
    { value: 'inch', label: 'Inch' },
    { value: 'centimeter', label: 'Centimeter' },
    { value: 'millimeter', label: 'Millimeter' },
    { value: 'feet', label: 'Feet' },
]

const handleNumberInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(value.target.value, 10);

    // Ensure that the value is between 0 and 59
    return isNaN(newValue) ? 0 : Math.min(Math.max(0, newValue));

};


const PricingFields = (props: PricingFieldsProps) => {
    const { touched, errors, values} = props


    return (
        <AdaptableCard divider className="mb-4">
            <h5>Pricing</h5>
            <p className="mb-6">Section to config artwork sales and size information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="col-span-1">
                    <FormItem
                        asterisk
                        label="Width"
                        invalid={errors.width && touched.width}
                        errorMessage={errors.width}
                    >
                        <Field name="width">
                            {({ field, form }: FieldProps) => (
                                <Input value={values.width} onChange={(value) => form.setFieldValue(field.name, handleNumberInput(value))} />
                            )}
                        </Field>
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        asterisk
                        label="Height"
                        invalid={errors.height && touched.height}
                        errorMessage={errors.height}
                    >
                        <Field name="height">
                            {({ field, form }: FieldProps) => (
                                <Input value={values.height} onChange={(value) => form.setFieldValue(field.name, handleNumberInput(value))} />
                            )}
                        </Field>
                    </FormItem>

                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="col-span-1">
                    <FormItem
                        asterisk
                        label="Unit"
                        invalid={errors.sizeUnit && touched.sizeUnit}
                        errorMessage={errors.sizeUnit}
                    >
                        <Field name="sizeUnit">
                            {({ field, form }: FieldProps) => (
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

                <div className="col-span-1">
                    <FormItem
                        asterisk
                        label="Price"
                        invalid={errors.price && touched.price}
                        errorMessage={errors.price}
                    >
                        <Field name="price">
                            {({ field, form }: FieldProps) => (
                                <Input value={values.price} onChange={(value) => form.setFieldValue(field.name, handleNumberInput(value))} />
                            )}
                        </Field>
                    </FormItem>
                </div>

            </div>
        </AdaptableCard>
    )
}

export default PricingFields

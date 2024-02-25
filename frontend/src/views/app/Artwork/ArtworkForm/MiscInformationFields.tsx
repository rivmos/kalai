import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps, FormikValues } from 'formik'
import { Switcher } from '@/components/ui'

type FormFieldsName = {
    medium: string,
    deliveredAs: string,
    createdIn: number,
    isSold: boolean,
}

type MiscInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: FormikValues
}


const handleNumberInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(value.target.value, 10);

    // Ensure that the value is between 0 and 59
    return isNaN(newValue) ? 0 : Math.min(Math.max(0, newValue));

};


const MiscInformationFields = (props: MiscInformationFields) => {
    const { touched, errors, values } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Miscellaneous Information</h5>
            <p className="mb-6">Section for miscellaneous information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
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
                </div>
                <div className="col-span-1">
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
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        asterisk
                        label="Created In Year"
                        invalid={errors.createdIn && touched.createdIn}
                        errorMessage={errors.createdIn}
                    >
                        <Field name="createdIn">
                            {({ field, form }: FieldProps) => (
                                <Input value={values.createdIn} onChange={(value) => form.setFieldValue(field.name, handleNumberInput(value))} />
                            )}
                        </Field>
                    </FormItem>
                </div>
                <div className="col-span-1">
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
                </div>

            </div>


        </AdaptableCard>
    )
}

export default MiscInformationFields

import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'
import { Dispatch, SetStateAction } from 'react'
import { Dialog, Notification, toast } from '@/components/ui'
import { apiAddRisk } from '@/services/SingleProjectService'
import { useAppSelector } from '../../store'
import { RiskState } from '@/@types/project'

type Option = {
    value: string
    label: string
}

type FormModel = {
    name: string
    description: string
    riskInvolvement: string[]
    riskImpact: string
    riskProbability: string
    status: string
}

const options: Option[] = [
    { value: '0', label: 'Open' },
    { value: '1', label: 'Close' },
]


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Please enter risk source!'),
    description: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Please enter risk description!'),
    status: Yup.string().required('Please select one!'),
    riskProbability: Yup.string().required('Please select one!'),
    riskImpact: Yup.string().required('Please select one!'),
    riskInvolvement: Yup.array().min(1, 'At least one is selected!'),

})

const AddRisk = ({ openAddRisk, setOpenAddRisk, risk}: { openAddRisk: boolean, setOpenAddRisk: Dispatch<SetStateAction<boolean>>, risk?:RiskState }) => {

    const projectId = useAppSelector(state => state.project.data.projectOverview.id)

    return (
        <Dialog width={600} isOpen={openAddRisk} onClose={() => setOpenAddRisk(false)} onRequestClose={() => setOpenAddRisk(false)}>
            <Formik
                enableReinitialize
                initialValues={{
                    name: risk?.id ? risk?.name : '',
                    description: risk?.id ? risk?.description : '',
                    status: risk?.id ? risk?.status : '',
                    riskProbability: risk?.id ? risk?.riskProbability : '',
                    riskImpact: risk?.id ? risk?.riskImpact : '',
                    riskInvolvement: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('values', values)
                    setTimeout(async () => {
                        const res = risk?.id ? await apiAddRisk({...values, projectId, id:risk?.id}) : await apiAddRisk({...values, projectId}) 
                        if(res.status === 200){
                            toast.push(
                                <Notification
                                    title={"Success"}
                                    type={"success"}
                                    duration={2500}
                                >
                                    Risk {risk?.id ? 'Added' : 'Edited'} Successfully!
                                </Notification>,
                                {
                                    placement: 'bottom-end',
                                }
                            )
                        }
                        setSubmitting(false)
                        setOpenAddRisk(false)
                    }, 400)
                }}
            >
                {({ values, touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="Risk Source"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Enter Risk Source"
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
                                    placeholder="Enter Risk Description"
                                    component={Input}
                                    textArea
                                />
                            </FormItem>

                            <FormItem
                                asterisk
                                label="Risk Probability"
                                invalid={errors.riskProbability && touched.riskProbability}
                                errorMessage={errors.riskProbability}
                            >
                                <Field name="riskProbability">
                                    {({ field, form }: FieldProps<FormModel>) => (
                                        <Radio.Group
                                            value={values.riskProbability}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        >
                                            <Radio value={0}>Low</Radio>
                                            <Radio value={1}>Medium</Radio>
                                            <Radio value={2}>High</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="Risk Impact"
                                invalid={errors.riskImpact && touched.riskImpact}
                                errorMessage={errors.riskImpact}
                            >
                                <Field name="riskImpact">
                                    {({ field, form }: FieldProps<FormModel>) => (
                                        <Radio.Group
                                            value={values.riskImpact}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        >
                                            <Radio value={0}>Low</Radio>
                                            <Radio value={1}>Medium</Radio>
                                            <Radio value={2}>High</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
                            </FormItem>


                            <FormItem
                                asterisk
                                label="Status"
                                invalid={errors.status && touched.status}
                                errorMessage={errors.status}
                            >
                                <Field name="status">
                                    {({ field, form }: FieldProps<FormModel>) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={options}
                                            value={options.filter(
                                                (option) =>
                                                    option.value ===
                                                    values.status
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

                            <FormItem
                                asterisk
                                label="Risk Involvement"
                                invalid={Boolean(
                                    errors.riskInvolvement &&
                                    touched.riskInvolvement
                                )}
                                errorMessage={errors.riskInvolvement as string}
                            >
                                <Field name="riskInvolvement">
                                    {({ field, form }: FieldProps<FormModel>) => (
                                        <>
                                            <Checkbox.Group
                                                value={values.riskInvolvement}
                                                onChange={(options) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        options
                                                    )
                                                }
                                            >
                                                <Checkbox
                                                    name={field.name}
                                                    value="Cost"
                                                >
                                                    Cost{' '}
                                                </Checkbox>
                                                <Checkbox
                                                    name={field.name}
                                                    value="Schedule"
                                                >
                                                    Schedule{' '}
                                                </Checkbox>
                                                <Checkbox
                                                    name={field.name}
                                                    value="Performance"
                                                >
                                                    Performance{' '}
                                                </Checkbox>
                                            </Checkbox.Group>
                                        </>
                                    )}
                                </Field>
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
        </Dialog>
    )
}

export default AddRisk
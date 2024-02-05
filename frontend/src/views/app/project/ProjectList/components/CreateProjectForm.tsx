import { FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Dispatch, SetStateAction } from 'react'
import { CreateProjectState } from './CreateProject'

type FormModel = {
    title: string
    description: string
}

const onSubmit = (values: FormModel, setSubmitting: (isSubmitting: boolean) => void) => {
    console.log(values)
}

const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, 'Too Short!').required('Title Required'),
    description: Yup.string().required('Description Required')
})

const CreateProjectForm = ({ userSelection, setUserSelection }: { userSelection: CreateProjectState, setUserSelection: Dispatch<SetStateAction<CreateProjectState>> }) => {
    return (
        <Formik initialValues={{
            ...userSelection
        }}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values, setSubmitting)
            }}>

            <Form>
                <FormContainer>
                    <Field
                        className="rounded-md"
                        type="text"
                        autoComplete="off"
                        name="title"
                        placeholder="Enter Title"
                        component={Input}
                        value={userSelection.title}
                        onChange={(e: any) => { setUserSelection({ ...userSelection, title: e.target.value }) }}
                    />
                    <Field
                        className="rounded-md"
                        textArea
                        type="text"
                        autoComplete="off"
                        name="description"
                        placeholder="Enter Description"
                        component={Input}
                        value={userSelection.description}
                        onChange={(e: any) => { setUserSelection({ ...userSelection, description: e.target.value }) }}
                    />
                </FormContainer>
            </Form>

        </Formik>
    )
}

export default CreateProjectForm
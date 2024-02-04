import React, { SyntheticEvent, useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    mobile: Yup.number().required('Required'),
    message: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required'),
})

const ContactForm = ({ className }: { className: string }) => {

    return (
        <div className={className}>
            <Formik
                initialValues={{ name: '', email: '', mobile: '', message: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        setSubmitting(false)
                    }, 400)
                }}
            >
                {({ touched, errors }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
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
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Mobile"
                                invalid={errors.mobile && touched.mobile}
                                errorMessage={errors.mobile}
                            >
                                <Field
                                    type="number"
                                    name="mobile"
                                    placeholder="Mobile"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Message"
                                invalid={errors.message && touched.message}
                                errorMessage={errors.message}
                            >
                                <Field
                                    textArea
                                    type="text"
                                    name="message"
                                    placeholder="Message"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem>
                                <Button type="submit">Submit</Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default ContactForm
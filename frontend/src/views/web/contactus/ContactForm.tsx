import React, { SyntheticEvent, useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { apiNewEnquiry } from '@/services/Enquiry'
import { Notification, toast } from '@/components/ui'
import { MdMessage} from 'react-icons/md'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    mobile: Yup.number().required('Required'),
    message: Yup.string()
        .min(3, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
})

const ContactForm = ({ className }: { className: string }) => {

    return (
        <div className={classNames('bg-gradient-to-r from-white to-transparent', className)}>
            <Formik
                initialValues={{ name: '', email: '', mobile: '', message: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, setValues }) => {
                    const res = await apiNewEnquiry(values)
                    if (res.status === 200) {
                        toast.push(
                            <Notification
                                title="Your Query Was Sent!"
                                customIcon={<MdMessage className="text-xl text-indigo-400" />}
                            >
                                We'll Get Back To You Within 24hrs.
                            </Notification>, {placement:'bottom-start'}
                        )
                    }
                    // setValues({ name: '', email: '', mobile: '', message: '' })
                    setSubmitting(false)
                }}
            >
                {({ touched, errors, isSubmitting}) => (
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
                                <Button loading={isSubmitting} type="submit">Submit</Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default ContactForm
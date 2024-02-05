import { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import type { Dispatch, MouseEvent, SetStateAction } from 'react'
import { Field, Formik, Form, useField, FieldProps } from 'formik'
import { FormContainer, FormItem } from '@/components/ui'
import { CreateProjectState, StepSixResponse } from './CreateProject'
import * as Yup from 'yup'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { addFormMilestone, useAppDispatch, useAppSelector } from '../store'

type FormModel = {
    title: string,
    description: string,
    tasks: number[]
}

const NewMilestoneForm = ({ dialogIsOpen, setIsOpen, userSelection, setUserSelection }: { dialogIsOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, userSelection: CreateProjectState, setUserSelection: Dispatch<SetStateAction<CreateProjectState>> }) => {

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3).required('Title Required'),
        description: Yup.string().min(10).required('Description Required'),
        tasks: Yup.array().min(1, 'Select at least one option!'),
    })

    // const dummyMilestones = [
    //     {
    //         title: 'm1',
    //         description: 'desc1',
    //         tasks: [12124, 12125]
    //     },
    //     {
    //         title: 'm1',
    //         description: 'desc1',
    //         tasks: [12126]
    //     }
    // ]

    // const dummyData = [
    //     {
    //         "id": 12124,
    //         "title": "Task Title ONe",
    //         "description": "Task Desc ONe",
    //         "estimatedTime": "34"
    //     },
    //     {
    //         "id": 12125,
    //         "title": "Task Title Two",
    //         "description": "Task DescTwo",
    //         "estimatedTime": "22"
    //     },
    //     {
    //         "id": 12126,
    //         "title": "way beleive",
    //         "description": "Task DescTwo",
    //         "estimatedTime": "555"
    //     },
    //     {
    //         "id": 12127,
    //         "title": "do it my way",
    //         "description": "Task DescTwo",
    //         "estimatedTime": "66"
    //     },
    //     {
    //         "id": 12128,
    //         "title": "You are my hight",
    //         "description": "Task DescTwo",
    //         "estimatedTime": "77"
    //     },
    // ]

    let totalMilestoneTime = 0

    const dispatch = useAppDispatch()
    const addedTasks = useAppSelector(state => state.projectList.data.paymentTermsForm.milestones)
    const submittedProject = useAppSelector(state => state.projectList.data.submittedProject)

    const allSelectedTasks = addedTasks.map(milestone => milestone.tasks).flat().map(id => id)
    const tasksToShow = submittedProject.tasks.filter(task => !allSelectedTasks.includes(task.id))

    const initialValues: FormModel = {
        title: '',
        description: '',
        tasks: []
    };

    return (
        <Dialog
            isOpen={dialogIsOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            bodyOpenClassName="overflow-hidden"
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    dispatch(addFormMilestone({ ...values, time: totalMilestoneTime }))
                    resetForm()
                    setSubmitting(false)
                    setIsOpen(false)
                }}
            >
                {({ values, touched, errors, resetForm }) => (
                    <Form className='p-4'>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="Title"
                                invalid={errors.title && touched.title}
                                errorMessage={errors.title}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="title"
                                    placeholder="Enter Title"
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
                                    autoComplete="off"
                                    name="description"
                                    placeholder="Enter Description"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                label="Select Tasks"
                                invalid={Boolean(
                                    errors.tasks &&
                                    touched.tasks
                                )}
                                errorMessage={errors.tasks as string}
                            >
                                <Field name="tasks">
                                    {({ field, form }: FieldProps<FormModel>) => (
                                        <>
                                            <Checkbox.Group
                                                vertical
                                                value={values.tasks}
                                                onChange={(options) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        options
                                                    )
                                                }
                                                }
                                            >
                                                {
                                                    tasksToShow.map(task => {
                                                        return (
                                                            <Checkbox
                                                                name={field.name}
                                                                value={task.id}
                                                                onChange={() => {
                                                                    if (values.tasks.includes(task.id)) {
                                                                        totalMilestoneTime -= Number(task.estimatedTime);
                                                                    }
                                                                    else {
                                                                        totalMilestoneTime += Number(task.estimatedTime);
                                                                    }
                                                                }}
                                                            >
                                                                {task.title}
                                                            </Checkbox>
                                                        )
                                                    })
                                                }
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

export default NewMilestoneForm
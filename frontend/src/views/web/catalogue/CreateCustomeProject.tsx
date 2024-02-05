import React,{useState} from "react";
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import { Field, Form, Formik } from 'formik'
import CreatableSelect from 'react-select/creatable'
import PathComponent from '../components/PathComponent'
import type { FieldProps } from 'formik'

type Option = {
    value: string
    label: string
}

type FormModel = {
    input: string
    select: string
    multipleSelect: string[]
}

const options: Option[] = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]

const CreateCustomeProject = () => {

    const [toggle, setToggle] = useState(false)
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const horizontalLineStyle = {
        borderTop: '1px solid #D3D3D3',
        margin: '10px 0',
      };

    return (

        <div className="what-we-sec">
            <PathComponent title='Create Project' />
            <div className="container">
                <Formik
                    enableReinitialize
                    initialValues={{
                        input: '',
                        select: '',
                        multipleSelect: [],

                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('values', values)
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2))
                            setSubmitting(false)
                        }, 400)

                    }}
                >
                    {({ values, touched, errors, }) => (
                        <Form>
                            <FormContainer>
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormItem
                                            asterisk
                                            label="Project Name"
                                            invalid={errors.input && touched.input}
                                            errorMessage={errors.input}
                                        >
                                            <Field
                                                type="text"
                                                name="input"
                                            component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <FormItem
                                            asterisk
                                            label="Industry"
                                        >
                                            <Field name="select">
                                                {({ field, form }: FieldProps<FormModel>) => (
                                                    <Select
                                                        field={field}
                                                        form={form}
                                                        options={options}
                                                        value={options.filter(
                                                            (option) =>
                                                                option.value ===
                                                                values.select
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
                                    <div className="col-md-4">
                                        <FormItem
                                            asterisk
                                            label="Services"
                                        >
                                             <Field name="select">
                                                {({ field, form }: FieldProps<FormModel>) => (
                                                    <Select
                                                        field={field}
                                                        form={form}
                                                        options={options}
                                                        value={options.filter(
                                                            (option) =>
                                                                option.value ===
                                                                values.select
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
                                    <div className="col-md-4">
                                        <FormItem
                                            asterisk
                                            label="Specific"
                                        >
                                            <Field name="multipleSelect">
                                                {({ field, form }: FieldProps<FormModel>) => (
                                                    <Select<Option, true>
                                                        isMulti
                                                        componentAs={CreatableSelect}
                                                        field={field}
                                                        form={form}
                                                        options={options}
                                                        value={values.multipleSelect}
                                                        onChange={(option) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                option
                                                            )
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <FormItem
                                            asterisk
                                            label="Description"
                                            invalid={errors.select && touched.select}
                                            errorMessage={errors.select}
                                        >
                                            <Input textArea />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <FormItem
                                            label="Features"
                                        >
                                            <Input textArea />
                                        </FormItem>
                                    </div>
                                </div>
                                <FormItem>
                                    <Button
                                        type="reset"
                                        className="ltr:mr-2 rtl:ml-2"
                                        // onClick={() => resetForm()}
                                        style={{ backgroundColor: "#26282A", color: "white", marginTop: "15px" }}
                                    >
                                        Add Task
                                    </Button>{" "}
                                    <span style={{ margin: "0 15px" }} />
                                    <Field name="rememberMe" component={Checkbox} style={{ height: "20px", width: "20px", border: "2px solid black", }} onClick={() => setToggle(!toggle)} >
                                        Recommend tasks with Estimations
                                    </Field>
                                </FormItem>
                            </FormContainer>
                            <div style={horizontalLineStyle}></div>
                            {toggle && (
                            <div className="container">
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <span>Task List</span>
                                    </div>
                                </div>
                                <div className='row' style={{marginTop:"30px"}}>
                                    <div className='col-md-6'>
                                        <Checkbox value="Selection A" style={{ height: "20px", width: "20px", border: "2px solid black"}} onChange={handleCheckboxChange} >Check All </Checkbox>
                                    </div>
                                </div>
                                <div style={horizontalLineStyle}></div>
                            </div>
                             )}
                            <FormItem>
                                <Button variant="solid" type="submit"  style={{ backgroundColor:  isChecked ?"#641496":"#e6b3ff" ,color: "white", marginTop: "15px", marginLeft: "87%" }}>
                                    Add to Project
                                </Button>
                            </FormItem>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )

}

export default CreateCustomeProject








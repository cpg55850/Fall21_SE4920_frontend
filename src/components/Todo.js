import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import { useParams } from 'react-router'
import moment from 'moment'
import styled from 'styled-components'
import * as yup from 'yup'
import { getTodo, updateTodo, createTodo } from '../actions/todos'
import Spinner from './Spinner'
import { useHistory } from 'react-router'
import { useAuth } from '../context/AuthContext'

const Todo = () => {
  const history = useHistory()
  const { id } = useParams()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    targetDate: '',
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id === '-1') {
      console.log('id is -1')
      setIsLoading(false)
      return
    }

    const fetchData = async () => {
      const data = await getTodo(user, id)

      setFormData({
        id: data.id,
        description: data.description,
        targetDate: moment(data.targetDate).format('YYYY-MM-DD'),
      })
      setIsLoading(false)
    }

    fetchData()
  }, [id, user])

  const initialValues = formData

  const schema = yup.object({
    description: yup.string().required('Description is a required field'),
    targetDate: yup.date().required('Date is a required field'),
  })

  const onSubmit = async (values) => {
    console.log({
      username: user,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    })

    if (id === '-1') {
      await createTodo(user, {
        username: user,
        description: values.description,
        targetDate: values.targetDate,
        done: false,
      })
    } else {
      await updateTodo(user, values.id, {
        id: values.id,
        username: user,
        description: values.description,
        targetDate: values.targetDate,
        done: false,
      })
    }

    history.push(`/todos`)
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <Wrapper>
      <h1>Todo</h1>
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={initialValues}
        enableReinitialize={true}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.description && !errors.description}
                isInvalid={touched.description && errors.description}
              />
              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>targetDate</Form.Label>
              <Form.Control
                type="text"
                name="targetDate"
                placeholder="targetDate"
                value={values.targetDate}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.targetDate && !errors.targetDate}
                isInvalid={touched.targetDate && errors.targetDate}
              />
              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                {errors.targetDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 530px;
  padding: 15px;
`

export default Todo

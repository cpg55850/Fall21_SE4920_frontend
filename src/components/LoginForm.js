import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useAlert } from '../context/AlertContext'
import { SetupAxiosInterceptors } from '../utils/SetupAxiosInterceptors'
import { jwtAuthenticate } from '../actions/auth'
import axios from 'axios'

const LoginForm = () => {
  const history = useHistory()
  const { login } = useAuth()
  const { setAlertTimeout } = useAlert()

  const initialValues = { username: '', password: '' }

  const schema = yup.object({
    username: yup.string().required('Username is a required field'),
    password: yup.string().required('Password is a required field'),
  })

  const onSubmit = (values) => {
    const basicAuthHeader =
      'Basic ' + window.btoa(values.username + ':' + values.password)

    axios
      .get('http://localhost:8080/basicauth', {
        headers: { authorization: basicAuthHeader },
      })
      .then((res) => {
        console.log(res)
        // SetupAxiosInterceptors(basicAuthHeader)
        setAlertTimeout({ message: 'Login Success!' })
        login(values.username)
        history.push(`/dashboard`)
      })
      .catch((err) => {
        console.log(err)
        setAlertTimeout({ message: `${err}` })
        return
      })
  }

  return (
    <Wrapper>
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={initialValues}
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
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.username && !errors.username}
                isInvalid={touched.username && errors.username}
              />
              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
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
  max-width: 330px;
  padding: 15px;
`

export default LoginForm

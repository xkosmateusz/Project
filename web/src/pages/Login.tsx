import React from 'react'
import {gql, useMutation} from '@apollo/client'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {Link, useHistory} from 'react-router-dom'
import TwitterLogo from "../styles/assets/twitter-logo.png"

const LOGIN_MUTATION = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
}
`

interface LoginValues {
    email: string
    password: string
}

function Login() {
    const history = useHistory()
    const [login, { data }] = useMutation(LOGIN_MUTATION)

    const initialValues: LoginValues = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Niewłaściwy adres email")
            .required("Wymagany adres email"),
        password: Yup.string()
            .max(20, "Maksymalnie 20 znaków")
            .required("Wymagane hasło"),
    })

    return(
        <div>
            <img src={TwitterLogo}
            alt="logo"
            style={{width: "50px"}}
            className="logo"
            />

            <h3>Zaloguj się do Twittera</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    const response = await login({
                        variables: values
                    })
                    localStorage.setItem("token", response.data.login.token)
                    setSubmitting(false)
                    history.push('/users')
                }}
            >

                <Form>
                    <Field name="email" type="text" placeholder="Email"></Field>
                    <ErrorMessage name="email" component={'div'} />

                    <Field name="password" type="password" placeholder=" Password "></Field>
                    <ErrorMessage name="password" component={'div'} />

                    <button type="submit" className="login-button" ><span>Zaloguj się</span></button>
                </Form>

            </Formik>
            <div className="register">
                <h4>Nie masz konta?</h4>
                <Link to="/signup">Zarejestruj się</Link>
            </div>
        </div>
    )
}

export default Login
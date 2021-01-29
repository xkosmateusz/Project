import React from 'react'
import {gql, useMutation} from '@apollo/client'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {Link, useHistory} from 'react-router-dom'
import TwitterLogo from "../styles/assets/twitter-logo.png"

const SIGNUP_MUTATION = gql`
mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
        token
    }
}
`

interface SignupValues {
    email: string
    password: string
    confirmPassword: string
    name: string
}

function Signup() {
    const history = useHistory()
    const [signup, {data}] = useMutation(SIGNUP_MUTATION)

    const initialValues: SignupValues = {
        email: "",
        password: "",
        confirmPassword: "",
        name: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Niewłaściwy adres email")
            .required("Wymagany adres email"),
        password: Yup.string()
            .max(20, "Maksymalnie 20 znaków")
            .required("Wymagane hasło"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Hasła muszą się zgadzać"
        ),
        name: Yup.string()
        .max(15, "Maksymalnie 15 znaków")
        .required("Wymagane imię"),
    })

    return(
        <div>

            <img src={TwitterLogo}
            alt="logo"
            style={{width: "50px"}}
            className="logo"
            />

            <h3>Zarejestruj się</h3>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async(values, {setSubmitting}) => {
                setSubmitting(true)
                const response = await signup({
                    variables: values
                })
                localStorage.setItem("token", response.data.signup.token)
                setSubmitting(false)
                history.push('/users')
            }}
            >

                <Form>
                    <Field name="email" type="text" placeholder="Email"></Field>
                    <ErrorMessage name="email" component={'div'} />

                    <Field name="name" type="text" placeholder="Name"></Field>
                    <ErrorMessage name="name" component={'div'} />

                    <Field name="password" type="password" placeholder=" Password "></Field>
                    <ErrorMessage name="password" component={'div'} />

                    <Field name="confirmpassword" type="password" placeholder="Confirm Password"></Field>
                    <ErrorMessage name="confirmpassword" component={'div'} />

                    <button type="submit" className="login-button"><span>Zaloguj się</span></button>
                </Form>
            </Formik>
                <div className="register">
                    <h4>Masz już konto?</h4>
                    <Link to="/login">Zaloguj się</Link>
                </div>
        </div>
    )
}

export default Signup
import * as Yup from 'yup'

export interface AuthFormValues {
    username: string
    password: string
}

export const schema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .required('Product Title Required'),
    password: Yup.string().trim()
        .required('Product Title Required'),
})
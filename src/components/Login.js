/**
 * Created by 5820k on 2017/1/14.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'

const validate = values => {
	const errors = {}
	if (!values.username) {
		errors.username = 'Required'
	}
	return errors
}
const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
	<div>
		<input {...input} placeholder={label} type={type}/>
		{touched && ((error && <span>{error}</span>))}
	</div>
)

const Login = (props) => {
	const {handleSubmit, submitting, pristine}=props
	return (
		<form onSubmit={handleSubmit}>
			<Field name="username" label="username" type="text" component={renderField}/>
			<div>
				<button type="submit" disabled={pristine || submitting}>登录</button>
			</div>
		</form>
	)
}

export default reduxForm({
	form: 'login',
	validate
})(Login)
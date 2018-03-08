import React from 'react';
import './App.css';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {numberCheck, required,  lengthCheck} from '../src/validators';
import Input from './input';


export class Complaint extends React.Component {
  onSubmit(values) {
    return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) {
                if (
                    res.headers.has('content-type') &&
                    res.headers
                        .get('content-type')
                        .startsWith('application/json')
                ) {
                    // It's a nice JSON error returned by us, so decode it
                    return res.json().then(err => Promise.reject(err));
                }
                // It's a less informative error returned by express
                return Promise.reject({
                    code: res.status,
                    message: res.statusText
                });
            }
            return;
        })
        .then(() => console.log('Submitted with values', values))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            return Promise.reject(
                new SubmissionError({
                    _error: message
                })
            );
        });
}

  
render() {
  let successMessage;
  if (this.props.submitSucceeded) {
      successMessage = (
          <div className="message message-success">
              Report submitted successfully
          </div>
      );
  }

  let errorMessage;
  if (this.props.submitFail) {
      errorMessage = (
          <div className="message message-error">{this.props.error}</div>
      );
  }


    return (
  <form className="App complaint-form" onSubmit={this.props.handleSubmit(values => {this.onSubmit(values)})}>
                {successMessage}
                {errorMessage}
          <h1>Report a problem with your delivery:</h1>
          <br/>
            <h2>Tracking number:</h2>
            <Field validate={[numberCheck,lengthCheck]} component={Input} name='trackingNumber' />
            <br />

            <h2> What is your issue? </h2>
            <Field  validate={required} component='select' required name='issue'>
              <option defaultValue='' disabled></option>
              <option value="not-delivered">My Delivery Hasn't Arrived</option>
              <option value="wrong-item">The Wrong Item was Delivered</option>
              <option value="missing-part">Part of my Order Was Missing</option>
              <option value="damaged">Some of my order arrived Damaged</option>
              <option value="other"> ther (Give Details Below)</option>
            </Field>
            <br/>

            <h2> Give more details (optional): </h2>
            <Field component='input' name='details'/>
            <br/>
            <br/>
            <button className='submit-button' type='submit'>Submit</button>
            {/* {successMessage}
            {errMessage} */}
      </form>
    )
  }
}

export default reduxForm({
  form: 'delivery',
  initialValues: {
      issue: 'not-delivered'
  }
})(Complaint);

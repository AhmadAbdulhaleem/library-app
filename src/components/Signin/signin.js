import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FormField from '../widgets/FormFields';

class SignIn extends Component {
  state = {
    signInError: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Write your email',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Write your password',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
      },
    },
  };

  validate = input => {
    let error = [true, ''];

    if (input.validation.required) {
      const valid = input.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    return error;
  };

  handleChange = element => {
    const newState = { ...this.state.formData };
    const newElement = newState[element.id];

    newElement.value = element.e.target.value;

    const validData = this.validate(newElement);

    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    this.setState({ newState: newElement });
  };

  handleSubmit = e => {
    e.preventDefault();

    let formIsValid = true;
    let dataToSubmit = {};

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      this.setState({ signInError: '' });

      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push('/dashboard');
          this.setState({ signInError: '' });
        })
        .catch(err => {
          this.setState({ signInError: err.message });
        });
    } else {
      this.setState({ signInError: 'Please fill all fields' });
    }
  };

  showError = () => {
    return this.state.signInError !== '' ? (
      <div className="col-lg-4 alert alert-danger">{this.state.signInError}</div>
    ) : (
      ''
    );
  };

  render() {
    return (
      <div style={{ marginTop: '100px' }}>
        <form
          onSubmit={this.handleSubmit}
          style={{
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          {this.showError()}
          <h3 className="text-center">Sign In</h3>
          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={state => this.handleChange(state)}
          />

          <FormField
            id={'password'}
            formData={this.state.formData.password}
            change={state => this.handleChange(state)}
          />

          <button type="submit" className="btn btn-primary">
            SignIn
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;

import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FormField from '../widgets/FormFields';

class SignUp extends Component {
  state = {
    registerError: '',
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
      confirm_password: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Rewrite your password',
        },
        validation: {
          required: true,
          mustSame: true,
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
      const message = `${!valid ? 'This field is required ' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    const { password, confirm_password } = this.state.formData;
    if (input.validation.mustSame) {
      const valid = password.value === confirm_password.value;
      const message = `${!valid ? "Passwords don't match" : ''}`;
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

  handelSubmit = e => {
    e.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      this.setState({ registerError: '' });
      firebase
        .auth()
        .createUserWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push('/');
        })
        .catch(err => this.setState({ registerError: err.message }));
    } else {
      this.setState({ registerError: 'Please fill all fields' });
    }
  };

  showError = () => {
    return this.state.registerError !== '' ? (
      <div className="col-lg-4 alert alert-danger">{this.state.registerError}</div>
    ) : (
      ''
    );
  };

  render() {
    return (
      <div style={{ marginTop: '100px' }}>
        <form
          onSubmit={this.handelSubmit}
          style={{
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          {this.showError()}

          <h3 className="text-center">Sign up</h3>
          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={data => this.handleChange(data)}
          />
          <FormField
            id={'password'}
            formData={this.state.formData.password}
            change={data => this.handleChange(data)}
          />
          <FormField
            id={'confirm_password'}
            formData={this.state.formData.confirm_password}
            change={data => this.handleChange(data)}
          />

          <button type="submit" className="btn btn-primary">
            SignUp
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;

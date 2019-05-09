import React, { Component } from 'react';
import FormField from '../widgets/FormFields';
import FileUploader from '../widgets/FileUploader/file';
import { firebaseBooks } from '../../firebase';

class Dashboard extends Component {
  state = {
    formIsValid: true,
    formData: {
      title: {
        element: 'input',
        value: '',
        config: {
          name: 'title_input',
          type: 'text',
          placeholder: 'Enter title of the book',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          name: 'description_input',
          rows: 5,
          columns: 36,
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
      },
      pageCount: {
        element: 'input',
        value: '',
        config: {
          name: 'count_input',
          type: 'number',
          placeholder: 'Enter count of the page',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
      },
      date: {
        element: 'input',
        value: '',
        config: {
          name: 'date_input',
          type: 'date',
          placeholder: 'Enter date of the book',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
      },
      status: {
        element: 'select',
        value: '',
        config: {
          name: 'status_input',
          options: [
            { key: 'Published', val: 'Published' },
            { key: 'Private', val: 'Private' },
            { key: 'Public', val: 'Public' },
          ],
        },
        validation: {
          required: false,
        },
        valid: true,
        validationMessage: '',
      },
      image: {
        element: 'input',
        value: '',
        valid: true,
        validation: {
          required: false,
        },
      },
    },
  };

  validate = input => {
    let error = ['', true];
    if (input.validation.required === true) {
      const valid = input.value.trim() !== '';
      error = !valid ? ['This field is required', false] : error;
    }
    return error;
  };

  handleChange = (data, content = '') => {
    const newState = { ...this.state.formData };
    const newElement = { ...newState[data.id] };

    if (content === '') {
      newElement.value = data.e.target.value;
    } else {
      newElement.value = content;
    }
    const valiData = this.validate(newElement);
    newElement.validationMessage = valiData[0];

    newElement.valid = valiData[1];
    newState[data.id] = newElement;
    this.setState({ formData: newState });
  };

  getFileName = filename => {
    this.handleChange({ id: 'image' }, filename);
  };

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }
    if (formIsValid) {
      console.log(dataToSubmit);
      firebaseBooks
        .push(dataToSubmit)
        .then(book => {
          this.props.history.push(`/books/${book.key}`);
        })
        .catch(err => {
          console.log(err.message);
        });
      this.setState({ formIsValid: true });
    } else {
      this.setState({ formIsValid: false });
    }
  };

  showError = () => {
    return this.state.formIsValid ? (
      ''
    ) : (
      <div className="alert alert-danger">There's something wrong</div>
    );
  };

  render() {
    const { formData } = this.state;
    return (
      <div className=" " style={{ marginTop: '100px' }}>
        <h3 className=" text-center text-secondary">Add new books</h3>
        <form
          onSubmit={this.submitForm}
          style={{
            display: 'flex',
            flexFlow: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px auto',
          }}
        >
          {this.showError()}

          <FileUploader filename={file => this.getFileName(file)} />

          <FormField
            id={'title'}
            formData={formData.title}
            change={newData => this.handleChange(newData)}
          />

          <FormField
            id={'description'}
            formData={formData.description}
            change={newData => this.handleChange(newData)}
          />

          <FormField
            id={'pageCount'}
            formData={formData.pageCount}
            change={newData => this.handleChange(newData)}
          />

          <FormField
            id={'date'}
            formData={formData.date}
            change={newData => this.handleChange(newData)}
          />

          <FormField
            id={'status'}
            formData={formData.status}
            change={newData => this.handleChange(newData)}
          />

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Dashboard;

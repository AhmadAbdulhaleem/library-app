import React from 'react';

const FormField = ({ id, formData, change }) => {
  const showError = () => {
    let errMessage = null;

    if (formData.validationMessage !== '' && !formData.valid) {
      return <div className="alert alert-danger mt-2">{formData.validationMessage}</div>;
    }

    return errMessage;
  };

  const handleInputs = () => {
    let template = null;
    switch (formData.element) {
      case 'input':
        template = (
          <div className="form-group">
            <input
              className="form-control"
              {...formData.config}
              value={formData.value}
              onChange={e => change({ e, id })}
            />
            {showError()}
          </div>
        );
        break;
      case 'textarea':
        template = (
          <div className="form-group">
            <textarea
              className="form-control"
              {...formData.config}
              value={formData.value}
              onChange={e => change({ e, id })}
            />
            {showError()}
          </div>
        );
        break;
      case 'select':
        template = (
          <div className="form-group">
            <select
              className="form-control"
              value={formData.value}
              onChange={e => change({ e, id })}
            >
              {formData.config.options.map((item, i) => (
                <option key={i} value={item.value}>
                  {item.key}
                </option>
              ))}
            </select>
          </div>
        );
        break;

      default:
        template = null;
    }
    return template;
  };

  return <div className="col-md-6 col-lg-4 col-sm-12">{handleInputs()}</div>;
};

export default FormField;

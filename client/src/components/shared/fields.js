import React from 'react';
import TextField from '@material-ui/core/TextField';

const CustomInputComponent = ({ field, form: { touched, errors, values }, ...props }) => (
  <div>
    <TextField
      {...field}
      {...props}
      value={values[field.name]}
      id={`outlined-basic-${field.name}`}
      label={field.name}
      variant="outlined"
      fullWidth
    />
    {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);


const CustomFileInputComponent = ({ field, form: { touched, errors, values }, ...props }) => (
  <div>
    <TextField
      {...props}
      id={`outlined-basic-${field.name}`}
      label={field.name}
      variant="outlined"
      fullWidth
      InputLabelProps={{ shrink: true }}
    />
    {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

export { CustomFileInputComponent, CustomInputComponent };

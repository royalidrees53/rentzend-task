import mime from 'mime-types';
import { includes } from 'lodash';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.name) errors.name = 'Required';
  if (!values.address) errors.address = 'Required';

  if (!values.number) errors.number = 'Required';
  else if (!/^[0-9]*$/i.test(values.number)) errors.number = 'Invalid phone number';

  if (!values.zipcode) errors.zipcode = 'Required';
  else if (!/^[0-9]*$/i.test(values.zipcode)) errors.zipcode = 'Invalid zipcode';

  if (!values.document) errors.document = 'Required';
  else if (!includes(['image/png', 'image/jpeg'], values.document.type)) {
    debugger
    errors.document = 'Please upload a valid document';
  }

  return errors;
};

export default validate;

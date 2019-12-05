import React, { useState, useRef } from 'react';
import { Formik, Field, Form } from 'formik';
import { map } from 'lodash';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import { useMutation } from '@apollo/react-hooks';

import { ADD_AGENT } from '../../graphql/mutations';
import { GET_AGENTS } from '../../graphql/queries';
import validate from '../shared/validations';
import { CustomInputComponent, CustomFileInputComponent } from '../shared/fields';
import Header from '../shared/Header';

const fields = ['name', 'email', 'number', 'address', 'zipcode'];

const initialValues = { name: '', email: '', number: '', address: '', zipcode: '', document: '' };

const NewAgent = () => {
  const fileField = useRef(null);
  const [serverError, setServerError] = useState('');
  const [addAgent, { data }] = useMutation(ADD_AGENT, {
    update(cache, { data: { createAgent } }) {
      if (createAgent.success) {
        const { agents } = cache.readQuery({ query: GET_AGENTS });
        cache.writeQuery({
          query: GET_AGENTS,
          data: { agents: agents.concat([createAgent.agent]) },
        });
        return;
      }
      setServerError(createAgent.message);
    }
  });

  const handleFormSubmit = (values) =>
    addAgent({ variables: values })
      .then((res) => res.data.createAgent.success)
      .catch((err) => false);

  return (
    <div className="page">
      <Header />
      <Container>
        <Typography className="sub-heading" variant="h4" component="h4">
          Agent Application Form
        </Typography>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
            setTimeout(() => {
              handleFormSubmit(values)
                .then((success) => {
                  if (success) {
                    document.getElementById('outlined-basic-document').value = '';
                    resetForm();
                  };
                })
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {
                    map(fields, (field, i) => (
                      <Grid key={i} item xs={6}>
                        <div className="form-group">
                          <Field
                            name={field}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            component={CustomInputComponent}
                          />
                        </div>
                      </Grid>
                    ))
                  }
                  <Grid item xs={6}>
                    <div className="form-group">
                      <Field
                        name='document'
                        onChange={(event) => {
                          setFieldValue('document', event.currentTarget.files[0]);
                        }}
                        onBlur={handleBlur}
                        component={CustomFileInputComponent}
                        type="file"
                        innerRef={fileField}
                      />
                    </div>
                  </Grid>
                </Grid>
                {
                  serverError && (
                    <div className="error">{serverError}</div>
                  )
                }
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Form>
            )}
        </Formik>
      </Container>
    </div>
  )
};

export default NewAgent;

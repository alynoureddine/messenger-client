import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  LinearProgress,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { Field, Form, Formik, FormikProps } from 'formik'
import { TextField } from 'formik-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/auth/actions';
import { getAuthState } from '../store/selectors';
import { AuthState, RegisterAction, RegisterUserPayload } from '../store/auth/types';
import { Dispatch } from 'redux';
import { FormikHelpers } from 'formik/dist/types';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const dispatch: Dispatch<RegisterAction> = useDispatch();
  const authState: AuthState = useSelector(getAuthState);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
          }}
          validate={(values: RegisterUserPayload) => {
            const errors: Partial<RegisterUserPayload> = {};
            if (!values.firstName) {
              errors.firstName = 'Required';
            }
            if (!values.lastName) {
              errors.lastName = 'Required';
            }
            if (!values.username) {
              errors.username = 'Required';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values: RegisterUserPayload, {setSubmitting}: FormikHelpers<RegisterUserPayload>) => {
            setSubmitting(true);
            const d = dispatch(register(values));
            console.log(d);
          }}
        >
          {({submitForm, setSubmitting, isSubmitting}: FormikProps<RegisterUserPayload>) => {
            if (isSubmitting && !authState.pending) {
              setSubmitting(false)
            }

            return (
              <Form>
                {/*<Grid container spacing={2}>*/}
                {/*  <Grid item xs={12}>*/}
                {Object.entries(authState.error.errors ?? {}).map(([field, error]: [string, string]) =>
                  <Alert severity="error" key={field}>{error}</Alert>)}
                <Field component={TextField} name="firstName" type="text" label="First name" margin="normal" autoFocu
                       required fullWidth/>
                <Field component={TextField} name="lastName" type="text" label="Last name" margin="normal" fullWidth
                       required/>
                <Field component={TextField} name="username" type="text" label="Username" margin="normal" required
                       fullWidth/>
                <Field component={TextField} name="email" type="email" label="Email" margin="normal" fullWidth
                       required/>
                <Field component={TextField} type="password" label="Password" name="password" margin="normal" fullWidth
                       required/>
                {authState.pending && <LinearProgress/>}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={authState.pending}
                  onClick={submitForm}
                  type="submit"
                  className={classes.submit}
                  fullWidth
                >
                  Sign Up
                </Button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Container>
  );
}

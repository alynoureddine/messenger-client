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
import {Alert} from '@material-ui/lab';

import {Field, Form, Formik, FormikProps} from 'formik'
import {TextField} from 'formik-material-ui';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../store/auth/actions';
import {getAuthState} from '../../store/selectors';
import {AuthState, LoginAction, LoginUserPayload} from '../../store/auth/types';
import {Dispatch} from 'redux';
import {FormikHelpers} from 'formik/dist/types';
import {useHistory} from "react-router-dom";

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

export default function Login() {
  const classes = useStyles();
  const dispatch: Dispatch<LoginAction> = useDispatch();
  const authState: AuthState = useSelector(getAuthState);
  const history = useHistory();

  if (authState.loggedIn) history.push('/');

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validate={(values: LoginUserPayload) => {
            const errors: Partial<LoginUserPayload> = {};
            if (!values.username) {
              errors.username = 'Required';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}
          onSubmit={(values: LoginUserPayload, {setSubmitting}: FormikHelpers<LoginUserPayload>) => {
            setSubmitting(true);
            dispatch(login(values));
          }}
        >
          {({submitForm, setSubmitting, isSubmitting}: FormikProps<LoginUserPayload>) => {
            if (isSubmitting && !authState.pending) {
              setSubmitting(false)
            }

            return (
              <Form>
                {Object.entries(authState.error.message ?? {}).map(([field, error]: [string, string]) =>
                  <Alert severity="error" key={field}>{error}</Alert>)}
                <Field component={TextField} name="username" type="text" label="Username" margin="normal" required
                       fullWidth/>
                <Field component={TextField} type="password" label="Password" name="password" margin="normal" fullWidth
                       required/>
                {authState.pending && <LinearProgress/>}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={authState.pending}
                  onClick={submitForm}
                  className={classes.submit}
                  fullWidth
                >
                  Sign in
                </Button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Container>
  );
}

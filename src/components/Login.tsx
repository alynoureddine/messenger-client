import React from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { AuthState, LoginAction, LoginUserPayload } from '../store/auth/types';
import { login } from '../store/auth/actions';
import { Formik, FormikProps } from 'formik';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState } from '../store/selectors';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch: Dispatch<LoginAction> = useDispatch();
  const authState: AuthState = useSelector(getAuthState);

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
              <form className={classes.form} noValidate>
                <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"
                           autoComplete="email" autoFocus
                />
                <TextField margin="normal" required fullWidth name="password" label="Password" type="password"
                           id="password" autoComplete="current-password"
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary"/>} label="Remember me"/>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                        onClick={submitForm}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )
          }}
        </Formik>
      </div>
    </Container>
  );
}

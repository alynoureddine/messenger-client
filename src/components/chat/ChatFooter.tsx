import React from 'react';
import {Button} from '@material-ui/core'
import {Field, Form, Formik, FormikValues} from 'formik';
import {TextField} from 'formik-material-ui';
import {useDispatch} from 'react-redux';
import {createDraftMessage, emitMessage} from '../../store/chats/actions';
import {store} from '../../index';
import {Message} from "../../store/chats/types";

const initialValues = {message: ''};

export default function ChatFooter(props: { chatId: number, isDraft: boolean }) {
  const dispatch = useDispatch();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={((values: FormikValues) => {
          const errors = {};
          return errors;
        })}
        onSubmit={(values: FormikValues, {setSubmitting, setValues}) => {
          setSubmitting(false);
          setValues(initialValues);

          const message: Message = {
            text: values.message,
            id: new Date().getTime(),
            date: new Date().toString(),
            user: store.getState().auth.user,
            pending: true,
          }

          if (props.isDraft) {
            dispatch(createDraftMessage({...message, isDraft: true }, props.chatId))
          } else {
            dispatch(emitMessage(message, props.chatId));
          }

        }}
      >
        {({submitForm}) => {
          return (
            <Form>
              <Field component={TextField} name="message" type="text" id="message" margin="normal" fullWidth autoFocus/>
              <Button variant="contained" color="primary" onClick={submitForm}> Send </Button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

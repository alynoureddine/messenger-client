import React, {useRef} from 'react';
import {Button} from '@material-ui/core'
import {Field, Form, Formik, FormikValues} from 'formik';
import {fieldToTextField, TextFieldProps} from 'formik-material-ui';
import {store} from '../../index';
import {Message} from "../../store/chats/types";
import MuiTextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

const initialValues = {message: ''};


export default function ChatFooter(props: { sendMessageAction: (message: Message) => void }) {
  const textInput = useRef<HTMLInputElement>(null);

  const TextField = (props: TextFieldProps) => {
    return <MuiTextField ref={textInput} {...fieldToTextField(props)} />
  }

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

          props.sendMessageAction(message);

          if (textInput.current) {
            textInput.current.focus();
          }
        }}
      >
        {({submitForm}) => {
          return (
            <Form autoComplete="off" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Field component={TextField} name="message" type="text" id="message" margin="normal" fullWidth autoFocus/>
              <SendIcon onClick={submitForm} style={{cursor: "pointer"}}/>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

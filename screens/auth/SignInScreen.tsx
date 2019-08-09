import React, { useRef, useEffect, forwardRef } from 'react';
import { Text, TextInput, Button, Headline } from 'react-native-paper';
import { Image, GestureResponderEvent, ToastAndroid } from 'react-native';
import { Formik, FormikActions } from 'formik';
import { PaperField } from '../../components/PaperField';
import * as Yup from 'yup';
import {
  OmbiSettingsSettingsModelsCustomizationSettings,
  OmbiSettingsSettingsModelsAuthenticationSettings
} from '../../ombi-api/model';
import { Wrapper } from './Wrapper';
import { DividerWithText } from '../../components/DividerWithText';
import { useStores } from '../../store/StoreContext';
import { reaction } from 'mobx';
import { AxiosError } from 'axios';
import { useDisposable } from 'mobx-react-lite';

export interface SignInScreenParams {
  customization: OmbiSettingsSettingsModelsCustomizationSettings;
  authentication: OmbiSettingsSettingsModelsAuthenticationSettings;
}

export const SignInScreen = ({ navigation }) => {
  const {
    customization,
    authentication
  }: SignInScreenParams = navigation.state.params;

  const { auth } = useStores();

  useDisposable(
    () =>
      reaction(
        () => auth.isAuthenticated,
        isAuthenticated => {
          if (isAuthenticated) navigation.navigate('App');
        }
      ),
    [auth]
  );

  const localLoginRef = useRef<Formik>();

  return (
    <Wrapper>
      {customization.logo ? (
        <Image
          source={{ uri: customization.logo }}
          resizeMode="contain"
          style={{
            alignSelf: 'center',
            width: '100%',
            flex: 1,
            maxHeight: 150,
            marginBottom: 20
          }}
        />
      ) : null}

      <Headline style={{ alignSelf: 'center' }}>
        Signing into {customization.applicationName || 'Ombi'}
      </Headline>
      <Button onPress={() => navigation.goBack()}>Wrong server?</Button>

      <LocalLoginForm
        ref={localLoginRef}
        onSubmit={async (values, actions) => {
          try {
            await auth.signIn(values.username, values.password);
          } catch (e) {
            const error = e as AxiosError;
            actions.setStatus(JSON.stringify(error.message));
          }

          actions.setSubmitting(false);
        }}
        onForgotPassword={() => console.log('Forgot mah password!')}
      />

      {authentication.enableOAuth && (
        <>
          <DividerWithText style={{ marginVertical: 15 }}>OR</DividerWithText>

          <Button
            dark
            mode="contained"
            disabled={
              localLoginRef.current && localLoginRef.current.state.isSubmitting
            }
            onPress={async () => {
              try {
                await auth.signInWithPlex();
              } catch (e) {
                ToastAndroid.show(e.message, ToastAndroid.LONG);
              }
            }}>
            Sign in with Plex
          </Button>
        </>
      )}
    </Wrapper>
  );
};

interface LocalLoginFormState {
  username: string;
  password: string;
}

interface LocalLoginFormProps {
  onSubmit: (
    values: LocalLoginFormState,
    formikActions: FormikActions<LocalLoginFormState>
  ) => void;
  onForgotPassword: (event?: GestureResponderEvent) => void;
}

const LocalLoginForm = forwardRef<Formik, LocalLoginFormProps>(
  ({ onSubmit, onForgotPassword }, ref) => {
    const passwordRef = useRef<TextInput>();

    return (
      <Formik
        ref={ref}
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Required'),
          password: Yup.string().notRequired()
        })}
        onSubmit={onSubmit}>
        {({ handleSubmit, isSubmitting, isValid, status }) => (
          <>
            <PaperField
              name="username"
              label="Username"
              placeholder="JohnDoe"
              textContentType="username"
              returnKeyType="next"
              blurOnSubmit={false}
              mode="outlined"
              onSubmitEditing={() => passwordRef.current.focus()}
            />

            <PaperField
              ref={passwordRef}
              name="password"
              label="Password"
              placeholder="********"
              textContentType="password"
              secureTextEntry
              returnKeyType="go"
              mode="outlined"
              onSubmitEditing={() => !isSubmitting && handleSubmit()}
            />

            {status && <Text>{JSON.stringify(status)}</Text>}

            <Button
              dark
              mode="contained"
              onPress={() => handleSubmit()}
              disabled={isSubmitting || !isValid}>
              Sign in
            </Button>

            <Button onPress={onForgotPassword}>Forgot password?</Button>
          </>
        )}
      </Formik>
    );
  }
);

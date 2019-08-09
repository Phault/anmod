import React from 'react';
import { Button, Paragraph } from 'react-native-paper';
import { Image } from 'react-native';
import { SettingsApi } from '../../ombi-api';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PaperField } from '../../components/PaperField';
import Axios from 'axios';
import {
  OmbiSettingsSettingsModelsAuthenticationSettings,
  OmbiSettingsSettingsModelsCustomizationSettings
} from '../../ombi-api/model';
import { Wrapper } from './Wrapper';
import { useStores } from '../../store/StoreContext';

async function fetchSettings(serverUrl: string) {
  const settingsApi = new SettingsApi({ basePath: serverUrl });

  return await Promise.all([
    settingsApi.settingsCustomizationGet(),
    settingsApi.settingsAuthenticationGet()
  ]).then(
    Axios.spread((customization, authentication) => ({
      customization: customization.data as OmbiSettingsSettingsModelsCustomizationSettings,
      authentication: authentication.data as OmbiSettingsSettingsModelsAuthenticationSettings
    }))
  );
}

export const SelectServerScreen = ({ navigation }) => {
  const { auth } = useStores();

  return (
    <Wrapper>
      <Image
        source={require('../../assets/logo.png')}
        resizeMode="contain"
        style={{
          alignSelf: 'center',
          maxWidth: '100%',
          height: 125,
          marginBottom: 20
        }}
      />

      <Paragraph style={{ marginBottom: 20 }}>
        Magna occaecat consectetur aliquip est dolore anim. Officia ut laboris
        cupidatat qui. Ipsum non ullamco non amet incididunt occaecat cupidatat.
        Anim laborum proident tempor qui esse do amet Lorem incididunt nostrud
        qui sit proident velit. Qui ex sit magna minim nisi culpa enim ad qui
        consequat mollit Lorem. Aliqua aute irure ea non.
      </Paragraph>

      <Formik
        initialValues={{
          serverUrl: auth.serverUrl || ''
        }}
        isInitialValid={!!auth.serverUrl}
        validationSchema={Yup.object().shape({
          serverUrl: Yup.string()
            .url('Please enter a valid URL, including scheme (http / https)')
            .required('Required')
        })}
        onSubmit={async ({ serverUrl }, { setSubmitting, setFieldError }) => {
          try {
            const serverSettings = await fetchSettings(serverUrl);
            auth.setServerUrl(serverUrl);
            navigation.navigate('SignIn', serverSettings);
          } catch (e) {
            setFieldError('serverUrl', JSON.stringify(e));
          }

          setSubmitting(false);
        }}>
        {({ handleSubmit, isSubmitting, isValid }) => (
          <>
            <PaperField
              name="serverUrl"
              label="Server Url"
              placeholder="https://ombi.server:3579"
              returnKeyType="go"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              onSubmitEditing={() => !isSubmitting && handleSubmit()}
              mode="outlined"
            />

            <Button
              dark
              mode="contained"
              disabled={isSubmitting || !isValid}
              onPress={() => handleSubmit()}>
              Connect
            </Button>
          </>
        )}
      </Formik>
    </Wrapper>
  );
};

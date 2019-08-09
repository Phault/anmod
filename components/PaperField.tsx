import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import { Field, FieldProps } from 'formik';
import { View, ViewStyle } from 'react-native';

export interface PaperFieldProps
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: string;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  helperStyle?: ViewStyle;
}

export const PaperField = forwardRef<TextInput, PaperFieldProps>(
  ({ name, style, inputStyle, helperStyle, ...rest }, ref) => (
    <Field name={name}>
      {({ field, form: { touched, errors } }: FieldProps) => (
        <View style={style}>
          <TextInput
            {...rest}
            style={inputStyle}
            ref={ref}
            value={field.value}
            onChangeText={field.onChange(field.name)}
            onBlur={field.onBlur(field.name)}
            error={!!(touched[field.name] && errors[field.name])}
          />
          <HelperText
            style={helperStyle}
            type="error"
            visible={!!(touched[field.name] && errors[field.name])}>
            {errors[field.name]}
          </HelperText>
        </View>
      )}
    </Field>
  )
);

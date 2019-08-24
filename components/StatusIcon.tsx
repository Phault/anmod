import React, { FC, useMemo } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  View,
  Text,
  TextStyle,
  StyleProp,
  ViewStyle
} from 'react-native';
import { RequestStatus } from '../store/requests/RequestStatus';
import { observer } from 'mobx-react-lite';
import { Theme, useTheme } from '../Theme';

interface StatusStyle {
  icon: string;
  color: string;
}

const statusIcons: { [key: string]: (theme: Theme) => StatusStyle } = {
  [RequestStatus.Pending]: theme => ({
    icon: 'clock-outline',
    color: theme.colors.primary
  }),
  [RequestStatus.Approved]: theme => ({
    icon: 'check-circle-outline',
    color: theme.colors.success
  }),
  [RequestStatus.Denied]: theme => ({
    icon: 'cancel',
    color: theme.colors.error
  }),
  available: theme => ({ icon: 'check-circle', color: theme.colors.success })
};

export interface StatusIconProps {
  status: RequestStatus | 'available';
  label?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const StatusIcon: FC<StatusIconProps> = observer(
  ({ status, label, size = 26, style = undefined }) => {
    if (status === RequestStatus.None) return null;

    const theme = useTheme();

    const statusStyle = useMemo(() => statusIcons[status](theme), [
      status,
      theme
    ]);

    const textStyle = useMemo(
      () => [
        styles.label,
        {
          color: statusStyle.color
        } as TextStyle
      ],
      [statusStyle]
    );

    return (
      <View style={[styles.container, style]}>
        <MaterialIcons
          name={statusStyle.icon}
          size={size}
          color={statusStyle.color}
        />
        {label ? <Text style={textStyle}>{label}</Text> : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  label: {
    marginLeft: 2
  }
});

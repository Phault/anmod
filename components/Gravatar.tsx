import React from 'react';
import { Avatar } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { User } from '../store/users/User';
import { ImageProps } from 'react-native-paper/typings/components/Avatar';

export interface GravatarProps extends Omit<ImageProps, 'source'> {
  user: Instance<typeof User>;
}

export const Gravatar = observer<GravatarProps>(({ user, size, ...rest }) => (
  <Avatar.Image
    size={size}
    source={{
      uri: `https://gravatar.com/avatar/${user.emailHash}?s=${size}&d=mp`
    }}
    {...rest}
  />
));

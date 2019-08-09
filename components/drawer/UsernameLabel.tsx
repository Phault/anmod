import React, { useEffect } from 'react';
import { Drawer } from 'react-native-paper';
import { useStores } from '../../store/StoreContext';
import { observer } from 'mobx-react-lite';
import { tryReference } from 'mobx-state-tree';
import { View } from 'react-native';
import { Gravatar } from '../Gravatar';

export const UsernameLabel = observer(() => {
  const { users } = useStores();
  const user = tryReference(() => users.currentUser);

  return (
    <Drawer.Section>
      {user && (
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Gravatar user={user} size={40} />
          <Drawer.Item label={user.username} />
        </View>
      )}
    </Drawer.Section>
  );
  // return <Drawer.Item label={user && user.username} />;
});

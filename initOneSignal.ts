import { autorun } from 'mobx';
import OneSignal from 'react-native-onesignal';
import { api } from './api';
import { Instance } from 'mobx-state-tree';
import { RootStore } from './store/RootStore';

const ONESIGNAL_API_KEY = '4f0260c4-9c3d-41ab-8d68-27cb5a593f0e';

interface OneSignalDevice {
  pushToken: string;
  userId: string;
}

enum DisplayOption {
  None,
  InAppAlert,
  Notification
}

export default function initOneSignal(store: Instance<typeof RootStore>) {
  OneSignal.init(ONESIGNAL_API_KEY);
  OneSignal.inFocusDisplaying(DisplayOption.Notification);
  OneSignal.addEventListener('ids', onIds);

  function onIds(device: OneSignalDevice) {
    autorun(() => {
      if (store.auth.isAuthenticated)
        api.mobile
          .addNotificationId(device.userId)
          .catch(e =>
            console.warn(
              `Failed to register device for push notifications: ${e.message}`
            )
          );
    });
  }
}

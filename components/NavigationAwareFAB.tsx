import React, { useState, useCallback, FC } from 'react';
import { Portal, FABProps, FAB } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';

export const NavigationAwareFAB: FC<FABProps> = ({
  visible,
  onPress,
  ...rest
}) => {
  const [active, setActive] = useState(false);

  const wrappedOnPress = useCallback(() => {
    if (active) onPress();
  }, [active, onPress]);

  return (
    <>
      <NavigationEvents
        onDidFocus={() => setActive(true)}
        onWillBlur={() => setActive(false)}
      />
      <Portal>
        <FAB
          visible={active && visible}
          onPress={onPress ? wrappedOnPress : undefined}
          {...rest}
        />
      </Portal>
    </>
  );
};

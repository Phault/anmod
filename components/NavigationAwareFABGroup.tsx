import React, { useState, useCallback, FC, useMemo } from 'react';
import { Portal, FAB, FABGroupProps } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';

export const NavigationAwareFABGroup: FC<FABGroupProps> = ({
  visible,
  onPress,
  onStateChange,
  open,
  actions,
  ...rest
}) => {
  const [active, setActive] = useState(false);

  const wrappedActions = useMemo(
    () => (active ? actions : actions.map(a => ({ ...a, onPress: () => {} }))),
    [actions, active]
  );

  const wrappedStateChange = useCallback(
    state => {
      if (state.open && !active) return;

      onStateChange(state);
    },
    [onStateChange, active]
  );

  const wrappedOnPress = useCallback(() => {
    if (active) onPress();
  }, [onPress, active]);

  return (
    <>
      <NavigationEvents
        onDidFocus={() => setActive(true)}
        onWillBlur={() => {
          setActive(false);

          if (open) onStateChange({ open: false });
        }}
      />
      <Portal>
        <FAB.Group
          actions={wrappedActions}
          visible={active && visible}
          open={active && open}
          onPress={onPress ? wrappedOnPress : undefined}
          onStateChange={onStateChange ? wrappedStateChange : undefined}
          {...rest}
        />
      </Portal>
    </>
  );
};

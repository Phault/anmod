import React, { useState, useCallback, FC, useMemo } from 'react';
import { Portal, FAB } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import styled from 'styled-components/native';

export const StyledFabGroup = styled(FAB.Group).attrs(props => ({
  color: props.theme.colors.text,
  fabStyle: {
    backgroundColor: props.theme.colors.primary
  }
}))`
  padding: 50px 0;
`;

export interface ManageRequestsFabProps {
  onApproveAll: () => void;
  onRejectAll: () => void;
}

export const ManageRequestsFab: FC<ManageRequestsFabProps> = ({
  onApproveAll,
  onRejectAll
}) => {
  const [active, setActive] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  const actions = useMemo(
    () => [
      {
        icon: 'playlist-add-check',
        label: 'Approve all',
        onPress: onApproveAll
      },
      {
        icon: 'clear-all',
        label: 'Reject all',
        onPress: onRejectAll
      }
    ],
    [onApproveAll, onRejectAll]
  );

  const onStateChange = useCallback(({ open }) => setFabOpen(open), [
    setFabOpen
  ]);

  return (
    <>
      <NavigationEvents
        onDidFocus={() => setActive(true)}
        onWillBlur={() => {
          setActive(false);
          setFabOpen(false);
        }}
      />
      <Portal>
        <StyledFabGroup
          open={active && fabOpen}
          icon={fabOpen ? 'close' : 'menu'}
          actions={actions}
          onStateChange={onStateChange}
          accessibilityLabel="Manage all"
          visible={active}
        />
      </Portal>
    </>
  );
};

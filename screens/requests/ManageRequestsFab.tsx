import React, { useState, useCallback, FC, useMemo } from 'react';
import styled from 'styled-components/native';
import { NavigationAwareFABGroup } from '../../components/NavigationAwareFABGroup';

export const StyledFabGroup = styled(NavigationAwareFABGroup).attrs(props => ({
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
    <StyledFabGroup
      open={fabOpen}
      icon={fabOpen ? 'close' : 'menu'}
      actions={actions}
      onStateChange={onStateChange}
      accessibilityLabel="Manage all"
    />
  );
};

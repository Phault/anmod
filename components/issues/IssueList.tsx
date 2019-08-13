import React, { useCallback, FC } from 'react';
import styled from 'styled-components/native';
import { useStores } from '../../store/StoreContext';
import { IssueListItem } from './IssueListItem';
import { EndlessList } from '../EndlessList';
import { StyleSheet } from 'react-native';
import { IssueStatus } from '../../types/IssueStatus';

const StyledEndlessList = styled(EndlessList).attrs({
  contentContainerStyle: { padding: 10, flexGrow: 1 }
})`
  background: ${props => props.theme.colors.background};
  flex-grow: 1;
`;

export interface IssueListProps {
  status: IssueStatus;
}

const itemRenderer = ({ item }) => (
  <IssueListItem issue={item} style={styles.item} />
);

const keyExtractor = item => item.id.toString();

export const IssueList: FC<IssueListProps> = ({ status }) => {
  const { issues } = useStores();
  const fetchItems = useCallback(
    (count, position) =>
      issues.fetchIssues({
        count,
        position,
        status
      }),
    [issues, status]
  );

  return (
    <StyledEndlessList
      keyExtractor={keyExtractor}
      renderItem={itemRenderer}
      fetchItems={fetchItems}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    borderRadius: 3,
    overflow: 'hidden'
  }
});

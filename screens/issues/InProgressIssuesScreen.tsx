import React from 'react';
import { IssueList } from '../../components/issues/IssueList';
import { IssueStatus } from '../../types/IssueStatus';

export const InProgressIssuesScreen = () => (
  <IssueList status={IssueStatus.InProgress} />
);

InProgressIssuesScreen.navigationOptions = {
  title: 'In progress'
};

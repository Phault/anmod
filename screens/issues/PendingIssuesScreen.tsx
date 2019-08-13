import React from 'react';
import { IssueList } from '../../components/issues/IssueList';
import { IssueStatus } from '../../types/IssueStatus';

export const PendingIssuesScreen = () => (
  <IssueList status={IssueStatus.Pending} />
);

PendingIssuesScreen.navigationOptions = {
  title: 'Pending'
};

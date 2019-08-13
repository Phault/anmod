import React from 'react';
import { IssueList } from '../../components/issues/IssueList';
import { IssueStatus } from '../../types/IssueStatus';

export const ResolvedIssuesScreen = () => (
  <IssueList status={IssueStatus.Resolved} />
);

ResolvedIssuesScreen.navigationOptions = {
  title: 'Resolved'
};

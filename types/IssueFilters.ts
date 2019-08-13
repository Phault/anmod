import { IssueStatus } from './IssueStatus';

export interface IssueFilters {
  count: number;
  position: number;
  status: IssueStatus;
}

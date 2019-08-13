import { types } from 'mobx-state-tree';
import { IssueStatus as IssueStatusEnum } from '../../types/IssueStatus';
import { $enum } from 'ts-enum-util';

export const IssueStatus = types.enumeration<keyof typeof IssueStatusEnum>(
  'IssueStatus',
  $enum(IssueStatusEnum).getKeys()
);

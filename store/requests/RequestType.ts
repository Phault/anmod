import { types } from 'mobx-state-tree';
import { RequestType as RequestTypeEnum } from '../../types/RequestType';
import { $enum } from 'ts-enum-util';

export const RequestType = types.enumeration<keyof typeof RequestTypeEnum>(
  'RequestType',
  $enum(RequestTypeEnum).getKeys()
);

import { RequestSortOrder } from './OrderType';
import { AvailabilityFilter } from './AvailabilityFilter';
import { RequestStatusFilter } from './RequestStatusFilter';

export interface RequestFilters {
  count: number;
  position: number;
  order: RequestSortOrder;
  status: RequestStatusFilter;
  availability: AvailabilityFilter;
}

import { RequestSortOrder } from './OrderType';
import { AvailabilityFilter } from './AvailabilityFilter';
import { StatusFilter } from './StatusFilter';

export interface RequestFilters {
  count: number;
  position: number;
  order: RequestSortOrder;
  status: StatusFilter;
  availability: AvailabilityFilter;
}

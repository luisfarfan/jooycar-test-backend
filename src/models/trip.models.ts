export interface Trip {
  id: string;
  start: any;
  end: any;
  distance: number;
  duration: number;
  overspeedsCount: number;
  boundingBox: any[];
}
export interface TripQuery {
  start_gte?: number;
  start_lte?: number;
  distance_gte?: number;
  limit?: number;
  offset?: number;
}

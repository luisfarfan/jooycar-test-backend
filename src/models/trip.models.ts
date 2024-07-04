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

export interface TripResponse {
  trips: Trip[];
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface TripDocument {
  id: string;
  start_time: number;
  start_lat: number;
  start_lon: number;
  start_address: string;
  end_time: number;
  end_lat: number;
  end_lon: number;
  end_address: string;
  distance: number;
  duration: number;
  overspeedsCount: number;
  boundingBox: Coordinates[];
}

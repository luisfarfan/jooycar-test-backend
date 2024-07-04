import axios from 'axios';
import { getDistance } from 'geolib';

import { CreateTripDto, ReadingDto } from '@/dto/create-trip.dto';
import { Coordinates } from '@/models/trip.models';

export const getAddressFromLatLng = async (lat: number, lon: number): Promise<string> => {
  const uri = `https://maps.googleapis.com/maps/api/geocode/json`;
  const config = {
    params: {
      latlng: `${lat},${lon}`,
      key: 'REMOVED_API_KEY',
    },
  };
  const response = await axios.get(uri, config);
  if (response.data.status === 'OK' && response.data.results.length > 0) {
    return response.data.results[0].formatted_address;
  } else {
    throw new Error('Unable to fetch address');
  }
};

export const getStartAndEndFromReadings = async (readings: ReadingDto[]) => {
  const startReading = readings.reduce((prev, curr) => (prev.time < curr.time ? prev : curr));
  const endReading = readings.reduce((prev, curr) => (prev.time > curr.time ? prev : curr));

  const [startAddress, endAddress] = await Promise.all([
    getAddressFromLatLng(startReading.location.lat, startReading.location.lon),
    getAddressFromLatLng(endReading.location.lat, endReading.location.lon),
  ]);

  const start = {
    time: startReading.time,
    lat: startReading.location.lat,
    lon: startReading.location.lon,
    address: startAddress,
  };

  const end = {
    time: endReading.time,
    lat: endReading.location.lat,
    lon: endReading.location.lon,
    address: endAddress,
  };

  const duration = endReading.time - startReading.time;

  return { start, end, duration };
};

export const calculateDistanceByReadings = (readings: ReadingDto[]): number => {
  let distance = 0;
  for (let i = 1; i < readings.length; i++) {
    const prev = readings[i - 1];
    const curr = readings[i];
    const distanceInKm = getDistance(prev.location, curr.location);
    distance = distance + distanceInKm;
  }
  return distance;
};

export const calculateOverSpeedsCount = (readings: ReadingDto[]): number => {
  return 1;
};

export const mapToBoundingBox = (readings: ReadingDto[]): Coordinates[] => {
  return readings.map((reading) => ({
    lat: reading.location.lat,
    lon: reading.location.lon,
  }));
};

const getRandomOffset = (range: number) => (Math.random() - 0.5) * range;
export const moveCoordinateSlightly = (lat: number, lon: number, range: number = 0.0001) => {
  const latOffset = getRandomOffset(range);
  const lonOffset = getRandomOffset(range);

  return {
    lat: lat + latOffset,
    lon: lon + lonOffset,
  };
};

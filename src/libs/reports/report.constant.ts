export const REPORT_SERVICE = 'REPORT_SERVICE';
export const REPORT_IMAGE_STORAGE_SERVICE = 'REPORT_IMAGE_STORAGE_SERVICE';
export const PAGINATION_TOKEN_SERVICE = 'PAGINATION_TOKEN_SERVICE';

export enum REPORT_CONDITION {
  GOOD = 'GOOD',
  BAD = 'BAD',
}

export enum REPORT_CATEGORY {
  ZEBRA_CROSS = 'ZEBRA_CROSS',
  SIDEWALK = 'SIDEWALK',
  PELICAN_CROSSING = 'PELICAN_CROSSING',
  PEDESTRIAN_BRIDGE = 'PEDESTRIAN_BRIDGE',
  OTHER = 'OTHER',
}

export const NEARBY_REPORT_LIMIT = 5;
export const LATEST_REPORT_LIMIT = 5;
export const GEOHASH_PRECISSION = 9;

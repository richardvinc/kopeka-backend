export const REPORT_SERVICE = 'REPORT_SERVICE';

export enum REPORT_CONDITION {
  GOOD = 'GOOD',
  BAD = 'BAD',
}

export enum REPORT_CATEGORY {
  ZEBRA_CROSS = 'ZEBRA_CROSS',
  SIDEWALK = 'SIDEWALK',
  PELICAN_CROSSING = 'PELICAN_CROSSING',
  OTHER = 'OTHER',
}

export const NEARBY_REPORT_LIMIT = 5;
export const LATEST_REPORT_LIMIT = 5;
export const GEOHASH_PRECISSION = 7;

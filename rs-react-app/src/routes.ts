export const ROUTE_PATHS = {
  HOME: '/',
  NOTFOUND: '*',
  DETAILS: 'details/:id',
} as const;

export type ROUTE_PATHS = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

export const ROUTE_PATHS = {
  MAIN: '/',
  NOTFOUND: '*',
  DETAILS: 'details/:id',
} as const;

export type ROUTE_PATHS = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

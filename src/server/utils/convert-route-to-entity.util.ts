const mapping: Record<string, string> = {
  conversations: 'conversation',
  organizations: 'organization',
  recordings: 'recording',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

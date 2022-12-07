export interface Session {
  id: string;
  startDate: Date;
  expireDate: Date;
  invalidated: boolean;
}

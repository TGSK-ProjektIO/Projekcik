export interface Session {
  _id: string;
  startDate: Date;
  expireDate: Date;
  invalidated: boolean;
  userId: string;
}

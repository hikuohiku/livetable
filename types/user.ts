export default interface User {
  uuid: string;
  email: string;
  name?: string;
}

export interface GoogleUser extends User {
  token: string;
}

export interface Subscription {
  userId: string;
  channelId: string;
}
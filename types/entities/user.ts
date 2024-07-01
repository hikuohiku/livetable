export default interface User {
  uuid: string;
  email: string;
  name?: string | null;
}

export interface GoogleUser extends User {
  refreshToken?: string | null;
  accessToken?: string | null;
  thumbnail?: string | null;
}

export interface Subscription {
  userId: string;
  channelId: string;
}

/**
 * repositories
 */

export interface UserRepository {
  findByUuid(uuid: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
  save(user: User): Promise<User>;
  upsert(user: User): Promise<User>;
  upsertByEmail(email: string, name?: string): Promise<User>;
}

export interface GoogleUserRepository extends UserRepository {
  update(user: GoogleUser): Promise<GoogleUser>;
  save(user: GoogleUser): Promise<GoogleUser>;
  upsert(user: GoogleUser): Promise<GoogleUser>;
}

export interface SubscriptionRepository {
  findByUser(user: User): Promise<Subscription[]>;
  save(subscription: Subscription): Promise<Subscription>;
  upsert(subscription: Subscription): Promise<Subscription>;
  delete(subscription: Subscription): Promise<void>;
}

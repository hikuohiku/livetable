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

/**
 * repositories
 */

export interface UserRepository {
  findByUuid(uuid: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<void>;
  save(user: User): Promise<void>;
  upsert(user: User): Promise<void>;
  upsertByEmail(email: string, name?: string): Promise<User>;
}

export interface GoogleUserRepository extends UserRepository {
  update(user: GoogleUser): Promise<void>;
  save(user: GoogleUser): Promise<void>;
  upsert(user: GoogleUser): Promise<void>;
}

export interface SubscriptionRepository {
  findByUser(user: User): Promise<Subscription[]>;
  save(subscription: Subscription): Promise<void>;
  upsert(subscription: Subscription): Promise<void>;
  delete(subscription: Subscription): Promise<void>;
}
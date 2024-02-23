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
  findByUuid(uuid: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(user: User): Promise<void>;
  save(user: User): Promise<void>;
}

export interface GoogleUserRepository extends UserRepository {
  update(user: GoogleUser): Promise<void>;
  save(user: GoogleUser): Promise<void>;
}

export interface SubscriptionRepository {
  findByUser(user: User): Promise<Subscription[]>;
  save(subscription: Subscription): Promise<void>;
  delete(subscription: Subscription): Promise<void>;
}
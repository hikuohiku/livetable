import { UserRepository, GoogleUserRepository, SubscriptionRepository } from "@/types/entities/user";
import User, { GoogleUser } from "@/types/entities/user";
import { Subscription } from "@prisma/client";

import prisma from "@/lib/prismaClient";

export class PrismaUserRepository implements UserRepository {
  async findByUuid(uuid: string) {
    const user = await prisma.user.findUnique({ where: { uuid } });
    return user ? {
      ...user,
      name: user.name ?? undefined,
    } : null;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? {
      ...user,
      name: user.name ?? undefined,
    } : null;
  }

  async update(user: User) {
    await prisma.user.update({ where: { uuid: user.uuid }, data: user });
  }

  async save(user: User) {
    await prisma.user.create({ data: user });
  }
}

export class PrismaGoogleUserRepository extends PrismaUserRepository implements GoogleUserRepository {
  async update(user: GoogleUser) {
    await prisma.user.update({ where: { uuid: user.uuid }, data: user });
  }

  async save(user: GoogleUser) {
    await prisma.user.create({ data: user });
  }
}

export class PrismaSubscriptionRepository implements SubscriptionRepository {
  async findByUser(user: User) {
    const subscriptions = await prisma.subscription.findMany({ where: { userId: user.uuid } });
    return subscriptions;
  }

  async save(subscription: Subscription) {
    await prisma.subscription.create({ data: subscription });
  }

  async delete(subscription: Subscription) {
    await prisma.subscription.delete({ where: { userId_channelId: { userId: subscription.userId, channelId: subscription.channelId } } });
  }
}

const userRepository = new PrismaUserRepository();
const googleUserRepository = new PrismaGoogleUserRepository();
const subscriptionRepository = new PrismaSubscriptionRepository();

export default userRepository;
export { googleUserRepository, subscriptionRepository };
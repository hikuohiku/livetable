import User, {
  GoogleUser,
  GoogleUserRepository,
  Subscription,
  SubscriptionRepository,
  UserRepository,
} from '@/types/entities/user';

import prisma from '@/lib/prismaClient';

export class PrismaUserRepository implements UserRepository {
  async findByUuid(uuid: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { uuid } });
    return user
      ? {
          ...user,
          name: user.name ?? undefined,
        }
      : null;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user
      ? {
          ...user,
          name: user.name ?? undefined,
        }
      : null;
  }

  async update(user: User) {
    await prisma.user.update({ where: { uuid: user.uuid }, data: user });
  }

  async save(user: User) {
    await prisma.user.create({ data: user });
  }

  async upsert(user: User) {
    await prisma.user.upsert({ where: { uuid: user.uuid }, update: user, create: user });
  }

  async upsertByEmail(email: string, name?: string): Promise<User> {
    const user = await prisma.user.upsert({ where: { email }, update: { name }, create: { email, name } });
    const result: User = {
      ...user,
      name: user.name ?? undefined,
    };
    return result;
  }
}

export class PrismaGoogleUserRepository extends PrismaUserRepository implements GoogleUserRepository {
  async update(user: GoogleUser) {
    await prisma.googleUser.update({
      where: { userId: user.uuid },
      data: {
        refreshToken: user.refreshToken,
        accessToken: user.accessToken,
        thumbnail: user.thumbnail,
      },
    });
  }

  async save(user: GoogleUser) {
    await prisma.googleUser.create({
      data: {
        userId: user.uuid,
        refreshToken: user.refreshToken,
        accessToken: user.accessToken,
        thumbnail: user.thumbnail,
      },
    });
  }

  async upsert(user: GoogleUser) {
    await prisma.googleUser.upsert({
      where: { userId: user.uuid },
      update: { accessToken: user.accessToken, refreshToken: user.refreshToken, thumbnail: user.thumbnail },
      create: {
        userId: user.uuid,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        thumbnail: user.thumbnail,
      },
    });
  }
}

export class PrismaSubscriptionRepository implements SubscriptionRepository {
  async findByUser(user: User): Promise<Subscription[]> {
    const subscriptions = await prisma.subscription.findMany({ where: { userId: user.uuid } });
    return subscriptions;
  }

  async save(subscription: Subscription) {
    await prisma.subscription.create({ data: subscription });
  }

  async delete(subscription: Subscription) {
    await prisma.subscription.delete({
      where: { userId_channelId: { userId: subscription.userId, channelId: subscription.channelId } },
    });
  }

  async upsert(subscription: Subscription) {
    await prisma.subscription.upsert({
      where: { userId_channelId: { userId: subscription.userId, channelId: subscription.channelId } },
      update: subscription,
      create: subscription,
    });
  }
}

const userRepository = new PrismaUserRepository();
const googleUserRepository = new PrismaGoogleUserRepository();
const subscriptionRepository = new PrismaSubscriptionRepository();

export default userRepository;
export { googleUserRepository, subscriptionRepository };

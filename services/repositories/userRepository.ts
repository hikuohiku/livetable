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
    return prisma.user.findUnique({ where: { uuid } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async update(user: User): Promise<User> {
    return prisma.user.update({ where: { uuid: user.uuid }, data: user });
  }

  async save(user: User): Promise<User> {
    return prisma.user.create({ data: user });
  }

  async upsert(user: User): Promise<User> {
    return prisma.user.upsert({ where: { uuid: user.uuid }, update: user, create: user });
  }

  async upsertByEmail(email: string, name?: string): Promise<User> {
    return prisma.user.upsert({ where: { email }, update: { name }, create: { email, name } });
  }
}

export class PrismaGoogleUserRepository extends PrismaUserRepository implements GoogleUserRepository {
  async update(user: GoogleUser): Promise<GoogleUser> {
    const googleUser = await prisma.googleUser.update({
      where: { userId: user.uuid },
      data: {
        refreshToken: user.refreshToken,
        accessToken: user.accessToken,
        thumbnail: user.thumbnail,
      },
    });
    return { ...user, ...googleUser };
  }

  async save(user: GoogleUser): Promise<GoogleUser> {
    const googleUser = await prisma.googleUser.create({
      data: {
        userId: user.uuid,
        refreshToken: user.refreshToken,
        accessToken: user.accessToken,
        thumbnail: user.thumbnail,
      },
    });

    return { ...user, ...googleUser };
  }

  async upsert(user: GoogleUser): Promise<GoogleUser> {
    const googleUser = await prisma.googleUser.upsert({
      where: { userId: user.uuid },
      update: { accessToken: user.accessToken, refreshToken: user.refreshToken, thumbnail: user.thumbnail },
      create: {
        userId: user.uuid,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        thumbnail: user.thumbnail,
      },
    });

    return { ...user, ...googleUser };
  }
}

export class PrismaSubscriptionRepository implements SubscriptionRepository {
  async findByUser(user: User): Promise<Subscription[]> {
    return prisma.subscription.findMany({ where: { userId: user.uuid } });
  }

  async save(subscription: Subscription): Promise<Subscription> {
    return prisma.subscription.create({ data: subscription });
  }

  async delete(subscription: Subscription): Promise<void> {
    prisma.subscription.delete({
      where: { userId_channelId: { userId: subscription.userId, channelId: subscription.channelId } },
    });
  }

  async upsert(subscription: Subscription): Promise<Subscription> {
    return prisma.subscription.upsert({
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

import apiClient from "@/lib/apiClient";
import { GoogleUserResponse, SubscriptionsResponse, UserWithDataResponse } from "@/lib/types/api";
import User, { GoogleUser, Subscription } from "@/types/entities/user";

export class UserApiService {
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const response = await apiClient.get<{ user: User | null }>(`/users/email/${email}`);
      return response.user;
    } catch (error) {
      console.error("Failed to find user by email:", error);
      return null;
    }
  }

  async findGoogleUser(user: User): Promise<GoogleUser | null> {
    try {
      const response = await apiClient.get<GoogleUserResponse>(`/users/${user.uuid}/google`);
      return response.data;
    } catch (error) {
      console.error("Failed to find Google user:", error);
      return null;
    }
  }

  async getUserSubscriptions(user: User): Promise<Subscription[]> {
    try {
      const response = await apiClient.get<SubscriptionsResponse>(`/users/${user.uuid}/subscriptions`);
      return response.data;
    } catch (error) {
      console.error("Failed to get user subscriptions:", error);
      return [];
    }
  }

  async getUserWithData(email: string): Promise<{
    user: GoogleUser | null;
    subscriptions: Subscription[];
    channels: any[];
    videos: any[];
  }> {
    try {
      const response = await apiClient.get<UserWithDataResponse>(`/users/email/${email}/with-data`);
      return response.data;
    } catch (error) {
      console.error("Failed to get user with data:", error);
      return {
        user: null,
        subscriptions: [],
        channels: [],
        videos: [],
      };
    }
  }
}

const userApiService = new UserApiService();
export default userApiService;
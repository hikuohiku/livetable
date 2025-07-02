import Channel from "@/types/entities/channel";
import User, { GoogleUser, Subscription } from "@/types/entities/user";
import Video from "@/types/entities/video";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface UserResponse extends ApiResponse<User> {}
export interface GoogleUserResponse extends ApiResponse<GoogleUser> {}
export interface ChannelsResponse extends ApiResponse<Channel[]> {}
export interface VideosResponse extends ApiResponse<Video[]> {}
export interface SubscriptionsResponse extends ApiResponse<Subscription[]> {}

export interface AuthenticatedUser extends GoogleUser {
  subscriptions: Subscription[];
}

export interface UserWithDataResponse extends ApiResponse<{
  user: GoogleUser;
  subscriptions: Subscription[];
  channels: Channel[];
  videos: Video[];
}> {}
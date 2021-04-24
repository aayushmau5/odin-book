import { Profile } from "@prisma/client";

export interface userSelectionsInterface {
  profile?: boolean;
  posts?: boolean;
  comments?: boolean;
  friends?: boolean;
  friends_posts?: boolean;
  friendrequests_to?: boolean;
}

export type RequestFunctionType = (
  _: any,
  { toUserId }: { toUserId: string },
  { userId }: { userId: string }
) => Promise<{
  id: string;
  friendrequest_by: Profile[];
  friendrequest_to: Profile[];
} | null>;

export type FriendFunctionType = (
  _: any,
  { toUserId }: { toUserId: string },
  { userId }: { userId: string }
) => Promise<{
  friends: Profile[];
} | null>;

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput extends LoginInput {
  username: string;
}

export interface ProfileInput {
  firstname: string;
  lastname: string;
  display: string;
}

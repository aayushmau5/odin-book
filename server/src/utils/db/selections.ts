import { Prisma } from "@prisma/client";
import {
  userSelectionsInterface,
  profileSelectionsInterface,
} from "../../types/userInterface";

export const userSelection = ({
  profile,
  posts,
  comments,
  friends,
  friends_posts,
  friendrequests_to,
}: userSelectionsInterface) => {
  return Prisma.validator<Prisma.UserSelect>()({
    profile: profile
      ? {
          include: {
            posts: posts
              ? {
                  include: {
                    comments: comments
                      ? {
                          orderBy: { createdAt: "desc" },
                        }
                      : false,
                  },
                  orderBy: { createdAt: "desc" },
                }
              : false,
            friends: friends
              ? {
                  include: {
                    posts: friends_posts,
                  },
                }
              : false,
            friendrequest_to: friendrequests_to,
            friendrequest_by: friendrequests_to,
          },
        }
      : false,
  });
};

export const profileSelection = ({
  user,
  posts,
  comments,
  friends,
  friends_posts,
  friendrequests_to,
}: profileSelectionsInterface) => {
  return Prisma.validator<Prisma.ProfileSelect>()({
    user: user,
    posts: posts
      ? {
          include: {
            comments: comments
              ? {
                  orderBy: { createdAt: "desc" },
                }
              : false,
          },
          orderBy: {
            createdAt: "desc",
          },
        }
      : false,
    friends: friends
      ? {
          include: {
            user: true,
            posts: friends_posts,
          },
        }
      : false,
    friendrequest_to: friendrequests_to
      ? {
          include: {
            user: true,
          },
        }
      : false,
    friendrequest_by: friendrequests_to
      ? {
          include: {
            user: true,
          },
        }
      : false,
  });
};

export const postSelection = ({
  author,
  user,
}: {
  author?: boolean;
  user?: boolean;
}) => {
  return Prisma.validator<Prisma.PostSelect>()({
    _count: { select: { comments: true } },
    author: author
      ? {
          include: {
            user: user,
          },
        }
      : false,
  });
};

import { Prisma } from "@prisma/client";
import { SelectionsOnPost } from "../../types/PostTypes";
import { userSelectionsInterface } from "../../types/UserProfileTypes";

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

export const postSelection = ({ author, user }: SelectionsOnPost) => {
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

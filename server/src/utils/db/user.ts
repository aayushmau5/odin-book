import { prisma } from "./db";

interface userSelections {
  profile?: boolean;
  posts?: boolean;
  comments?: boolean;
  friends?: boolean;
  friends_posts?: boolean;
  friendrequests_to?: boolean;
}

interface profileSelections {
  user?: boolean;
  posts?: boolean;
  comments?: boolean;
  friends?: boolean;
  friends_posts?: boolean;
  friendrequests_to?: boolean;
}

export async function getUserByEmail(
  email: string,
  {
    profile,
    posts,
    comments,
    friends,
    friends_posts,
    friendrequests_to,
  }: userSelections
) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
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
    },
  });
  return user;
}

export async function getUser(
  id: string,
  {
    profile,
    posts,
    comments,
    friends,
    friends_posts,
    friendrequests_to,
  }: userSelections
) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
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
    },
  });
}

export async function getAllUser({
  profile,
  posts,
  comments,
  friends,
  friends_posts,
  friendrequests_to,
}: userSelections) {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
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
    },
  });
  return users;
}

export async function getAllProfiles({
  user,
  posts,
  comments,
  friends,
  friends_posts,
  friendrequests_to,
}: profileSelections) {
  const profiles = await prisma.profile.findMany({
    include: {
      user: user,
      posts: posts
        ? {
            include: {
              comments: comments,
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
    },
  });
  return profiles;
}

export async function getProfile(
  profileId: string,
  {
    user,
    posts,
    comments,
    friends,
    friends_posts,
    friendrequests_to,
  }: profileSelections
) {
  return await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
    include: {
      user: user,
      posts: posts
        ? {
            include: {
              comments: comments,
            },
            orderBy: {
              createdAt: "desc",
            },
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
  });
}

export async function getAllUserExcept(id: string) {
  const users = await prisma.user.findMany({
    where: { NOT: { id } },
    include: { profile: true },
    orderBy: { createdAt: "desc" },
  });
  return users;
}

export async function addUser(
  username: string,
  email: string,
  password: string
) {
  const savedUser = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
  return savedUser;
}

export async function setProfile(
  userId: string,
  data: {
    display: string;
    firstname: string;
    lastname: string;
  }
) {
  const { display, firstname, lastname } = data;
  const profile = await prisma.profile.create({
    data: {
      display,
      firstname,
      lastname,
      userId,
    },
  });
  return profile;
}

export async function updateCommonProfile(
  id: string,
  data: {
    display?: string;
    firstname?: string;
    lastname?: string;
  }
) {
  const {
    display: newDisplay,
    firstname: newFirstname,
    lastname: newLastname,
  } = data;
  const profile = await prisma.profile.findFirst({ where: { id } });
  const updateProfile = await prisma.profile.update({
    where: { id },
    data: {
      display: newDisplay || profile?.display,
      firstname: newFirstname || profile?.firstname,
      lastname: newLastname || profile?.lastname,
    },
  });

  return updateProfile;
}

export async function deleteProfile(profileId: string) {
  const deletedProfile = await prisma.profile.delete({
    where: { id: profileId },
  });
  return deletedProfile;
}

export async function deleteUser(userId: string) {
  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });
  return deletedUser;
}

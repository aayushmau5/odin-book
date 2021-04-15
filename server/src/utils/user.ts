import { prisma } from "./db";

export async function getUserWithProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: {
        include: {
          posts: true,
        },
      },
    },
  });
  return user;
}

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}

export async function getAllUser() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  return users;
}

export async function getAllProfiles() {
  const profiles = await prisma.profile.findMany({});
  return profiles;
}

export async function getAllUserExcept(id: string) {
  const users = await prisma.user.findMany({
    where: { NOT: { id } },
    orderBy: { createdAt: "asc" },
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

export async function getUserWithField(
  userId: string,
  data: {
    profile?: boolean;
    posts?: boolean;
    commentsOnPost?: boolean;
    friends?: boolean;
    comments?: boolean;
  }
) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: data.profile
        ? {
            include: {
              friends: data.friends ? true : false,
              posts: data.posts
                ? {
                    include: {
                      comments: data.commentsOnPost ? true : false,
                    },
                  }
                : {},
              comments: data.comments
                ? {
                    include: {
                      inReplyTo: true,
                      post: true,
                    },
                  }
                : false,
            },
          }
        : false,
    },
  });
}
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

export async function sendFriendRequest(idFrom: string, idTo: string) {
  const user1 = await prisma.profile.findUnique({
    where: { id: idFrom },
    select: { id: true, friendrequest_by: true, friendrequest_to: true },
  });
  const user2 = await prisma.profile.findUnique({
    where: { id: idTo },
    select: { id: true, friendrequest_by: true, friendrequest_to: true },
  });
  await prisma.profile.update({
    where: {
      id: idFrom,
    },
    data: {
      friendrequest_to: user2?.id
        ? {
            connect: {
              id: user2.id,
            },
          }
        : {},
    },
  });
  await prisma.profile.update({
    where: {
      id: idTo,
    },
    data: {
      friendrequest_by: user1?.id
        ? {
            connect: {
              id: user1.id,
            },
          }
        : {},
    },
  });
  return true;
}

export async function deleteFriendRequest(idFrom: string, idTo: string) {
  const user1 = await prisma.profile.findUnique({ where: { id: idFrom } });
  const user2 = await prisma.profile.findUnique({ where: { id: idTo } });
  await prisma.profile.update({
    where: {
      id: user1?.id ? user1.id : undefined,
    },
    data: {
      friendrequest_to: {
        disconnect: {
          id: user2?.id,
        },
      },
    },
  });
  await prisma.profile.update({
    where: {
      id: user2?.id ? user2.id : undefined,
    },
    data: {
      friendrequest_by: {
        disconnect: {
          id: user1?.id,
        },
      },
    },
  });
  return true;
}

export async function listFriendRequests(id: string) {
  return await prisma.profile.findUnique({
    where: {
      id,
    },
    select: {
      friendrequest_by: true,
      friendrequest_to: true,
    },
  });
}

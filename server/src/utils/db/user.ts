import { prisma } from "./db";
import { userSelectionsInterface } from "../../types/selectionTypes";
import { userSelection } from "./selections";

export async function getUserByEmail(
  email: string,
  selections: userSelectionsInterface
) {
  return await prisma.user.findUnique({
    where: { email },
    include: userSelection(selections),
  });
}

export async function db_getUser(
  id: string,
  selections: userSelectionsInterface
) {
  return await prisma.user.findUnique({
    where: { id },
    include: userSelection(selections),
  });
}

export async function db_getAllUsers(selections: userSelectionsInterface) {
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: userSelection(selections),
  });
}

export async function getAllUserExcept(id: string) {
  return await prisma.user.findMany({
    where: { NOT: { id } },
    include: { profile: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function searchUser(searchString: string) {
  return await prisma.user.findMany({
    where: {
      email: {
        contains: searchString,
        mode: "insensitive",
      },
      profile: {
        OR: [
          { firstname: { contains: searchString, mode: "insensitive" } },
          { lastname: { contains: searchString, mode: "insensitive" } },
        ],
      },
    },
    include: {
      profile: true,
    },
  });
}

export async function addUser(email: string, password: string) {
  return await prisma.user.create({
    data: {
      email,
      password,
    },
  });
}

export async function addOAuthUser(email: string, idToken: string) {
  return await prisma.user.create({
    data: {
      email,
      idToken,
      type: "GMAIL",
    },
  });
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
  return await prisma.profile.create({
    data: {
      display,
      firstname,
      lastname,
      userId,
    },
  });
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
  return await prisma.profile.update({
    where: { id },
    data: {
      display: newDisplay || profile?.display,
      firstname: newFirstname || profile?.firstname,
      lastname: newLastname || profile?.lastname,
    },
  });
}

export async function deleteProfile(profileId: string) {
  return await prisma.profile.delete({
    where: { id: profileId },
  });
}

export async function deleteUser(userId: string) {
  return await prisma.user.delete({
    where: { id: userId },
  });
}

export async function getProfileId(userId: string) {
  const profile: any = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      profile: true,
    },
  });
  if (!profile) {
    throw new Error("Profile doesn't exist");
  }
  return profile.profile.id;
}

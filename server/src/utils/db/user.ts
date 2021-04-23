import { prisma } from "./db";
import {
  userSelectionsInterface,
  profileSelectionsInterface,
} from "../../types/userInterface";
import { userSelection, profileSelection } from "./selections";

export async function getUserByEmail(
  email: string,
  selections: userSelectionsInterface
) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: userSelection(selections),
  });
  return user;
}

export async function getUser(id: string, selections: userSelectionsInterface) {
  return await prisma.user.findUnique({
    where: { id },
    include: userSelection(selections),
  });
}

export async function getAllUser(selections: userSelectionsInterface) {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: userSelection(selections),
  });
  return users;
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

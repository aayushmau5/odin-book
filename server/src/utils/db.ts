import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// to be implemented:
//
// setFriend(user, friend)
// sendFriendRequest(user, friend)
// removeFriendRequest(user, friend)
// getSinglePost(postId)
// deleteUser()

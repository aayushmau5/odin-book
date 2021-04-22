import { prisma } from "./db";

// senderProfileId => The friend request send by the profile
// receiverProfileId => The friend request received by the profile

export async function sendFriendRequest(
  senderProfileId: string,
  receiverProfileId: string
) {
  const sender = await prisma.profile.findUnique({
    where: { id: senderProfileId },
    select: { id: true, friendrequest_by: true, friendrequest_to: true },
  });
  const receiver = await prisma.profile.findUnique({
    where: { id: receiverProfileId },
    select: { id: true, friendrequest_by: true, friendrequest_to: true },
  });
  if (!sender && !receiver) {
    return false;
  }
  await prisma.profile.update({
    where: {
      id: senderProfileId,
    },
    data: {
      friendrequest_to: {
        connect: {
          id: receiverProfileId,
        },
      },
    },
  });
  await prisma.profile.update({
    where: {
      id: receiverProfileId,
    },
    data: {
      friendrequest_by: {
        connect: {
          id: senderProfileId,
        },
      },
    },
  });
  return true;
}

export async function deleteFriendRequest(
  senderProfileId: string,
  receiverProfileId: string
) {
  const sender = await prisma.profile.findUnique({
    where: { id: senderProfileId },
  });
  const receiver = await prisma.profile.findUnique({
    where: { id: receiverProfileId },
  });
  if (!sender && !receiver) {
    return false;
  }
  await prisma.profile.update({
    where: {
      id: senderProfileId,
    },
    data: {
      friendrequest_to: {
        disconnect: [
          {
            id: receiverProfileId,
          },
        ],
      },
    },
  });
  await prisma.profile.update({
    where: {
      id: receiverProfileId,
    },
    data: {
      friendrequest_by: {
        disconnect: [
          {
            id: senderProfileId,
          },
        ],
      },
    },
  });
  return true;
}

export async function listFriendRequests(
  id: string,
  { user }: { user?: boolean }
) {
  return await prisma.profile.findUnique({
    where: {
      id,
    },
    select: {
      friendrequest_by: {
        include: {
          user: user,
        },
      },
      friendrequest_to: {
        include: {
          user: user,
        },
      },
    },
  });
}

export async function acceptRequest(
  senderProfileId: string,
  receiverProfileId: string
) {
  const sender = await prisma.profile.findUnique({
    where: { id: senderProfileId },
  });
  const receiver = await prisma.profile.findUnique({
    where: { id: receiverProfileId },
  });

  if (!receiver && !sender) {
    // A good error
    return false;
  }
  await prisma.profile.update({
    where: {
      id: receiverProfileId,
    },
    data: {
      friends: {
        connect: {
          id: senderProfileId,
        },
      },
    },
  });
  await prisma.profile.update({
    where: {
      id: senderProfileId,
    },
    data: {
      friends: {
        connect: {
          id: receiverProfileId,
        },
      },
    },
  });
  await deleteFriendRequest(senderProfileId, receiverProfileId);
  return true;
}

export async function unfriend(profile1Id: string, profile2Id: string) {
  const user1 = await prisma.profile.findUnique({
    where: { id: profile1Id },
  });
  const user2 = await prisma.profile.findUnique({
    where: { id: profile2Id },
  });

  if (!user1 && !user2) {
    // A good error
    return false;
  }
  await prisma.profile.update({
    where: {
      id: profile1Id,
    },
    data: {
      friends: {
        disconnect: [
          {
            id: profile2Id,
          },
        ],
      },
    },
  });
  await prisma.profile.update({
    where: {
      id: profile2Id,
    },
    data: {
      friends: {
        disconnect: [
          {
            id: profile1Id,
          },
        ],
      },
    },
  });
  return true;
}

export async function listFriends(
  profileId: string,
  { user }: { user?: boolean }
) {
  return await prisma.profile.findUnique({
    where: { id: profileId },
    select: {
      friends: {
        include: {
          user: user,
        },
      },
    },
  });
}
